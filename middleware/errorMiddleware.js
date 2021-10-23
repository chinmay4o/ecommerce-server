//404 not found error
const notFound = (req, res, next) => {
  const err = new Error(`404 Not Found ${req.originalUrl}`);
  res.status(404);
  next(err);
};

// error handling middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: err.stack,
  });

  next();
};

export {errorHandler , notFound}