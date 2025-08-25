export const errorHandler = (err, req, res, next) => {
  console.error(err.stack || err);
  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || 'Internal Server Error',
    // only include stack in dev
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};
