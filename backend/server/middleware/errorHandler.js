module.exports = (err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode).send();
};