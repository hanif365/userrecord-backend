const error = (msg, status = 500) => {
  const error = new Error(msg);
  error.status = status;
  return error;
};

module.exports = error;
