# Programmable Power Zones
![Home screen](https://raw.githubusercontent.com/eric-do/ProgrammablePZ/master/.github/images/image1.png) ![Select ride](https://raw.githubusercontent.com/eric-do/ProgrammablePZ/master/.github/images/image3.png) ![Timer](https://raw.githubusercontent.com/eric-do/ProgrammablePZ/master/.github/images/image2.png) ![leftnav](https://raw.githubusercontent.com/eric-do/ProgrammablePZ/master/.github/images/leftnav.png) ![rides](https://raw.githubusercontent.com/eric-do/ProgrammablePZ/master/.github/images/rides.png) ![members](https://raw.githubusercontent.com/eric-do/ProgrammablePZ/master/.github/images/members.png)

## 🚴‍♂️ About
Made for cycling enthusiasts, this app allows users to create, browse, and take programmed indoor rides, including ones made by other users.

Social interactions are also available. Users can:
- Follow/un-follow other users
- Take each other's programmed rides
- Like and rate each other rides

Primary functionality of the application (programming and taking rides), is open to all users. Login is only required for social interactions and saving rides. Passwords are secured with one way encryption and are not stored in the database.
</br></br>

## 🚀  Deployment

The front-end of the application is deployed to Netlify for its fast CDN. The back-end (Node, Express, Redis, Postgres) is deployed to Heroku.

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
<br/><br/>
## 🕵🏻 Challenges
### Optimizations
#### Caching
Certain queries require excessive joins and are not productive to run on every request:
- Search by username
- Find rides created by user
- Find all follows and followers

##### Backend
Results are cached using redis and apicache. GET requests will add results to the cache, and subsequent POST requests will clear the cache.

##### Frontend
The frontend uses React Query for its robust query management, which includes local caching.

Cache expiration is relatively short (5 minutes) and traffic is low, so an intelligent eviction policy is not high priority. However if traffic does grow, we can just evict using LRU policy.


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
### Timeline optimization
As more users use the application, the cost of generating a timeline is going to becomes increasingly expensive in terms of performance.

Timelines are currently generated on request, but we can generate timelines on the server on a given interval, independent of user action. Each new timeline can be stored as a row or document, depending on whether selecting a DB specifically for generating and inserting timelines is needed. The timeline content itself can be stored as a JSON object.

When generating a new timeline, we only add rides created after the creation date of the most recent timeline.

With indexing, retrieval of a timeline should be logarithmic, as there will be no expensive joins required. As users continue to view more rides (e.g. infinite scroll), we keep serving progressively older timelines.

This would be costly if we're doing it for all users, as we'd be generating timelines for inactive users. We can address this by doing so only for "active" users. The definition of "active" can be defined later, e.g. based on last login, login frequency, frequency of requests, etc.
<br/>
### Storing friendships
At some point, a graph DB such as Neo4J might be interesting. If the application starts to become more social (likes, comments, posts, etc.), every entity can potentially point to another entity. This can still be maintained using Postgres, but maintenance could be potentially more intuitive and performance might be faster with a graph database.
<br/>
### Schema optimizations
If tables get to be large, we can partition them. We can start by partitioning users and rides based on creation date range. For the user's table we can consider hash partitioning, if queries of users ordered by join date are infrequent.
<br/>