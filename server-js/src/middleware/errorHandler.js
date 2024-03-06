const errorHandler = (err, req, res, next) => {
  console.log(err);
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case 500:
      res.json({
        status:false,
        title: "ERROR",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log("No Error, All good !");
      break;
  }
};

module.exports = errorHandler;