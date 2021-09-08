const app = require('./app');

const server = app.listen(process.env.PORT || 3001);

module.exports = server;