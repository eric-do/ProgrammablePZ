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