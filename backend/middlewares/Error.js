const ErrorMiddware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error Encountered!";
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorMiddware;