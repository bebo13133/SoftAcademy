function createErrorMessage(error) {
  if (error.message.includes('Path')) {
    const missingPropertiesMessage = getMissingPropertiesErrorMessage(error?.errors || {});
    return missingPropertiesMessage;
  } else {
    const validationErrors = Object.values(error.errors)
      .filter((err) => err.properties && err.properties.message)
      .map((err) => err.properties.message);
    console.log(validationErrors)
    return validationErrors.join(', ');
  }
}
function errorHandler(error, res, req) {
  let message = 'Something went wrong!';
  let statusCode = 400;
  if (error.name === 'CustomValidationError') {
    message = error.message;
    statusCode = error.code;
  } else if (error instanceof TypeError || error.name == 'MongoError' || error.name == 'ObjectParameterError') {
    message = error?.message;
    statusCode = 500;
  } else if (error.name === 'CastError') {
    message = error.message;
    statusCode = 500;
  } else {
    message = createErrorMessage(error);
  }

  console.error(`Error: ${req.method} >> ${req.baseUrl}: ${message}`);

  res.status(statusCode).json({ error: message });
}

function getMissingPropertiesErrorMessage(errors) {
  const missingProperties = Object.keys(errors).reduce((a, b) => {
    if (b.includes('.')) {
      const [mainProp, nestedProp] = b.split('.');
      return { ...a, ...{ [mainProp]: (a[mainProp] || []).concat([nestedProp]) } };
    }
    return { ...a, ...{ [b]: null } };
  }, {});
  const result = Object.keys(missingProperties).map((x) => {
    if (Array.isArray(missingProperties[x])) {
      return { [x]: missingProperties[x] };
    }
    return x;
  });

  return result;
}

module.exports = {
  errorHandler,
};
