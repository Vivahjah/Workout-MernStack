// const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "something went wrong, try agan later",
    };
    // if (err instanceof CustomAPIError) {
    //     return res.status(err.statusCode).json({ msg: err.message });
    // }
    if (err.name === "castError") {
        customError.msg = `No workout found with id ${err.value}`
        customError.statusCode = 404;
    }

    if (err.name === "validationError") {
        customError.msg = Object.values(err.errors).map((item) =>
            item.message.join(",")
        );
        customError.statusCode = 400;
    }
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please enter a different value`;
        customError.statusCode = 400;
    }
    return res.status(customError.statusCode).json({ msg: customError.msg });

}
module.exports = errorHandlerMiddleware;