/**
 * buildFailureResponse - Build Failure response
 * 
 * @param {String} message - Message
 * @param {String} statusCode - Status Code
 * @param {String} data - Data
 * @returns - Failure Response
 */
const buildFailureResponse = (message, statusCode, data) => {
  if (data) {
    return {
      message,
      statusCode,
      status: "failure",
      data,
    };
  }

  return {
    message,
    statusCode,
    status: "failure",
  };
};

/**
 * buildSuccessResponse - Build Success response
 * 
 * @param {String} message - Message
 * @param {String} statusCode - Status Code
 * @param {String} data - Data
 * @returns - Success Response
 */
const buildSuccessResponse = (message, statusCode, data) => {
  if (data) {
    return {
      message,
      statusCode,
      status: "success",
      data,
    };
  }
  return {
    message,
    statusCode,
    status: "success",
  };
};

/**
 * Export all functions
 */
export default {
  buildFailureResponse,
  buildSuccessResponse,
};
