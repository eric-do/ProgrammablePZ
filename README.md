# Programmable Power Zones

Made for cycling performance enthusiasts, this app allows users to create and take Power Zone rides including ones curated from other users.

Deployment is automated when code is merged to master.

### Tech stack
- Frontend: React, Chakra UI
- Backend: Node/Express
- Database: Postgres

### Testing
- Frontend: React Testing Library
- Backend: Mocha / Chai

### Deployment
- Frontend: Netlify
- Backend: Heroku

<br/>

## Scripts
### Frontend

From the `client` directory, you can run:

#### `npm start`

Runs the app in the development mode.<br /> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.


#### `npm test`

Launches the test runner in the interactive watch mode.<br />

#### `npm run build`

Builds the app for production to the `build` folder.<br /> <br />

### Backend

From the `backend` directory, you can run:

#### `npm start`

Runs the Express app on port 3001 using Nodemon.


#### `npm test`

Runs the test suite.
<br /><br />
## API

### GET `/api/rides`
Parameters
| Name  | Type | Description |
| ------------- | ------------- | ------------- |
| limit  | integer | The number of rides to return. |
| timeInSeconds | integer | Filter for length of ride in seconds.  |
| type  | string | Filters by ride type (pz, pze, pzm, ftp) |

### POST `/api/rides/:rideId/ride-count`
Increments ride count for the rideId

### POST `/api/rides/:rideId/likes`
Increments likes for the rideId