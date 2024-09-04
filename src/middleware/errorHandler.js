const errorHandler = (err, req, res, next) => {
  console.error(err);
  res
    .status(500)
    .json({
      message:
        "Something went wrong! An error occurred on the server, please double-check your request.",
    });
};

export default errorHandler;
