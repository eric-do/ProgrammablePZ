# Programmable Power Zones

Made for cycling performance enthusiasts, this app allows users to create and take Power Zone rides including ones curated from other users.

![Home screen](/images/image1.png) ![Select ride](/images/image3.png) ![Timer](/images/image2.png)

Deployment is automated when code is merged to master.

### Tech stack
- Frontend: React, Chakra UI
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

## Scripts
### Frontend

From the `client` directory:

#### `npm start`

Runs the app in the development mode.<br /> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.


#### `npm test`

Launches the test runner in the interactive watch mode.<br />

#### `npm run build`

Builds the app for production to the `build` folder.<br /> <br />

### Backend

From the `backend` directory:

#### `npm start`

Runs the Express app on port 3001 using Nodemon.


#### `npm test`

Runs the test suite.

## Local development
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