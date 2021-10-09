module.exports = (err, req, res, next) => {
  res.status(err.statusCode).send({ error: err.message });
};