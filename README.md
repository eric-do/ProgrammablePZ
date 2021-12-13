# Programmable Power Zones
![leftnav](https://raw.githubusercontent.com/eric-do/ProgrammablePZ/master/.github/images/leftnav.png)  ![rides](https://raw.githubusercontent.com/eric-do/ProgrammablePZ/master/.github/images/rides.png)  ![members](https://raw.githubusercontent.com/eric-do/ProgrammablePZ/master/.github/images/members.png)
<br />
![Home screen](https://raw.githubusercontent.com/eric-do/ProgrammablePZ/master/.github/images/image1.png)  ![Select ride](https://raw.githubusercontent.com/eric-do/ProgrammablePZ/master/.github/images/image3.png)  ![Timer](https://raw.githubusercontent.com/eric-do/ProgrammablePZ/master/.github/images/image2.png)


## 🚴‍♂️ About
Made for cycling enthusiasts, this app allows users to create, browse, and take programmed indoor rides, including ones made by other users.

Social interactions are also available. Users can:
- Follow/un-follow other users
- Take each other's programmed rides
- Like and rate each other rides

Primary functionality of the application (programming and taking rides), is open to all users. Login is only required for social interactions and saving rides. Passwords are secured with one way encryption and are not stored in the database.
</br></br>

## 🚀  Deployment

The front-end of the application is deployed to Netlify for its fast CDN. The back-end (Node, Express, Redis, Postgres) is deployed to Heroku, using CircleCI for CI/CD
.
[![CircleCI](https://circleci.com/gh/eric-do/ProgrammablePZ/tree/master.svg?style=svg)](https://circleci.com/gh/eric-do/ProgrammablePZ/tree/master)
[![Netlify Status](https://api.netlify.com/api/v1/badges/057160b9-be9b-4559-9341-ce3bc74b77ab/deploy-status)](https://app.netlify.com/sites/ppz/deploys)

Live deployment: https://ppz.netlify.app/
</br></br>

## 💻 Tech stack
### Application
- Frontend: React, React Hooks, React Query, Chakra UI
- Backend: Node/Express
- Database: Postgres
- Cache: Redis
- Authentication: Postgres / pgcrypto
### Testing
- Frontend: React Testing Library
- Backend: Mocha / Chai / Supertest

### Deployment
- Frontend: Netlify
- Backend: Heroku

<br/>

## 👨🏻‍💻 Local development
### Backend
#### Package installation
From `/backend` run `npm install`
#### Database initialization
1. Create a `ppz` and `ppz_test` database in Postgres (one for local testing, one for automated tests in isolation)
2. Grant privileges to user `postgres` with `GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO postgres`
3. Import schema files in `/backend/db/migrations/`, e.g. from CLI `psql ppz < 00_init.sql`

#### Automated testing
From `/backend` run `npm test`

#### Local testing
From `/backend` run `npm start`

### Frontend
#### Package installation
From `/client` run `npm install`
#### Automated testing
From `/client` run `npm test`

#### Local testing
From `/client` run `npm start`

## 🐳 Docker and CI/CD

### Docker compose
Containers can be composed and ran in isolation using the docker-compose file found in root directory.
```
docker-compose up  -d
docker-compose down
```

Local development can be done with
```
docker compose up -d
```

Tests can be ran in isolation using Docker containers
```
docker compose -f docker-compose.yml -f docker-compose.test.yml up -d
```

Published images can be pulled and tested with
```
docker compose -f docker-compose.build.yml -f docker-compose.test.yml up -d
docker compose -f docker-compose.build.yml -f docker-compose.test.yml down
```

For the Dockerized PSQL DB, these scripts will dump to, and restore from, a dump.sql file:
```
docker exec -i ppz_db /bin/bash -c "pg_dump --username postgres ppz" > dump.sql
docker exec -i pg_container_name /bin/bash -c "psql --username postgres ppz" < dump.sql
```
### CI/CD
Backend code is tested on CircleCI.

Deployment is automated when code is pulled to master:
- Docker images are built and pushed to Dockerhub
- Code is deployed to Heroku

### Containerization next steps
- Deploy and scale on EC2

<br/><br/>
## 🕵🏻 Challenges
### Timeline optimization
#### Problem
As more users use the application, the cost of generating a timeline is going to becomes increasingly expensive in terms of performance.

Timelines were originally generated on request and cached with redis. As user follows increased, response times were hitting extremes of 5+ seconds.

#### Solution
On the fly timeline generation as well as backend caching were unnecessary:
- Queries were already being cached in the frontend
- Users don't view each other's timelines, so caching them with redis was a waste of space

I created a cron job that executes twice a day. It:
1. Finds all users who have logged in within 48 hours
2. Generates timeline for each user, making sure to not overlap with previous timelines
3. Inserts timelines into DB

This way timeline retrieval is independent from timeline generation. The script only runs for recently logged in users, as the process is still slow and intensive on the DB, and it's wasteful to fill the DB with data for inactive users.

Timeline retrieval becomes a simple index search, as there are no expensive joins required. As users continue to view more rides (e.g. infinite scroll), we keep serving progressively older timelines.

#### Result
For users with thousands of follows, API response time dropped from 5-8 seconds to 40-50 ms average.

### Caching
#### Problem
Certain queries require excessive joins and are not productive to run on every request:
- Search by username
- Find rides created by user
- Find all follows and followers

#### Solution
In the backend, results are cached using redis and apicache. GET requests will add results to the cache, and subsequent POST requests will clear the cache.

The frontend uses React Query for its robust query management, which includes local caching.

Cache expiration is relatively short (5 minutes) and traffic is low, so an intelligent eviction policy is not high priority. However if traffic does grow, we can just evict using LRU policy.

#### Result
GET response times, un-cached: 50 ms
GET response times, cached: 5 ms

## Next steps
### Horizontal scaling
Since the backend and frontend are hosted on different services (Heroku and Netlify, respectively), horizontally scaling the backend separately from the frontend wouldn't be a problem.

We can migrate to microservice architecture based on performance bottlenecks, and put each service on its own server(s). We can use AWS EC2 if we're looking to do configurations manually.

We can do separate services for:
- Authentication
- Timeline
- Rides

Depending on traffic, some servers may be dedicated to reads and others to writes.

We can use a load balancer such as nginx to point to the respective services and further scale and create copies of each service based on observed throughput.

If our database becomes a bottleneck, we can create DB copies, i.e. one write DB and multiple read DBs.
<br/>

### Storing friendships
At some point, a graph DB such as Neo4J might be interesting. If the application starts to become more social (likes, comments, posts, etc.), every entity can potentially point to another entity. This can still be maintained using Postgres, but maintenance could be potentially more intuitive and performance might be faster with a graph database.
<br/>
### Schema optimizations
If tables get to be large, we can partition them. We can start by partitioning users and rides based on creation date range. For the user's table we can consider hash partitioning, if queries of users ordered by join date are infrequent.
<br/>
