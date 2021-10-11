const sendResponse = (req, res) => {
  res.send(res.locals.data);
}

module.exports = sendResponse;