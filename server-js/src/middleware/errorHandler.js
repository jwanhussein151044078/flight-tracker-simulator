const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode != 200 ? res.statusCode : err.statusCode ? err.statusCode : 500;
  switch (statusCode) {
    case 500:
      res.json({
        status:false,
        title: "ERROR",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case 400:
        res.json({
          status:false,
          title: "BAD REQUEST",
          message: err.message,
          stackTrace: err.stack,
        });
        break; 
    case 404:
        res.json({
          status:false,
          title: "NOT FOUND",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
    default:
      res.json({
        status:false,
        title: "ERROR",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
  }
};

module.exports = errorHandler;