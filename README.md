# Programmable Power Zones
![Home screen](https://raw.githubusercontent.com/eric-do/ProgrammablePZ/master/.github/images/image1.png) ![Select ride](https://raw.githubusercontent.com/eric-do/ProgrammablePZ/master/.github/images/image3.png) ![Timer](https://raw.githubusercontent.com/eric-do/ProgrammablePZ/master/.github/images/image2.png) ![leftnav](https://raw.githubusercontent.com/eric-do/ProgrammablePZ/master/.github/images/leftnav.png) ![rides](https://raw.githubusercontent.com/eric-do/ProgrammablePZ/master/.github/images/rides.png) ![members](https://raw.githubusercontent.com/eric-do/ProgrammablePZ/master/.github/images/members.png)

## 🚴‍♂️ About
Made for cycling enthusiasts, this app allows users to create, browse, and take programmed indoor rides, including ones made by other users.

This web app uses authentication, and user logins are made secure with salted and encrypted passwords using pgcrypto.

Primary functionality of the application, i.e. taking rides, is open to all users. Login is only required for creating, saving, and rating rides.
</br></br>

## 🚀  Deployment

The front-end of the application is deployed to Netlify for its fast CDN. The back-end (Node, Express, Redis, Postgres) is deployed to Heroku.

[![Netlify Status](https://api.netlify.com/api/v1/badges/057160b9-be9b-4559-9341-ce3bc74b77ab/deploy-status)](https://app.netlify.com/sites/ppz/deploys)

Live deployment: https://ppz.netlify.app/
</br></br>

## 💻 Tech stack
### Application
- Frontend: React, React Hooks, Chakra UI
- Backend: Node/Express
- Database: Postgres
- Cache: Redis

### Testing
- Frontend: React Testing Library
- Backend: Mocha / Chai

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
3. Import `/backend/db/migrations/00_init.sql`, e.g. `psql ppz < 00_init.sql`

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
### Query optimizations
Certain queries require excessive joins and are not productive to run on every request:
- Search usernames
- Find rides created by user
- Find all follows and followers

These results are cached using redis and apicache. The GET requests will add results to the cache, and subsequent POST requests will clear the cache based on identifier, e.g. userId.
<br/><br/>
