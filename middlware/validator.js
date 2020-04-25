const { body, validationResult } = require('express-validator')
const quoteValidationRules = (req, res, next) => {
  body("pickupaddress").isLength({ min: 10 });
  body("pickupCity").isLength({ min: 3 });
  body("pickupState").isLength({ min: 3 });
  body("pickupZip").isNumeric().isLength({ min: 5 });
  body("destinationAddress").isLength({ min: 10 });
  body("destinationCity").isLength({ min: 3 });
  body("destinationState").isLength({ min: 3 });
  body("destinationZip").isLength({ min: 5 });
  body("packageInfo").isLength({ min: 10 });
  body("weight").isNumeric();
  body("dimension").isNumeric();
  body("specialInstruction").isLength({ min: 20 });
  body("numOfPieces").isLength({ min: 1 });
  body("companyName").isLength({ min: 5 });
  body("contactLName").isLength({ min: 3 });
  body("contactFName").isLength({ min: 3});

  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
  
}

exports.userValidationRules = (req, res, next) => {
  req.check("fullname", "Full name must not be empty").isLength({ min: 5 });
  req.check("email", "Email must be a valid email").isEmail();
  req.check("password", "Password must be at least 5 characters long").isLength({ min: 5 });
  req.check("phone", "Phone number is required").isEmpty({ min: 5 });
  
  const errors = req.validationErrors();
  
  // We first check for errors. If there is return status code of 400 and the error messages
    if (errors) {
      return res.status(400).json({ error: errors });
    }
  
    next();
}

const loginValidationRules = (req, res, nexxt) => {
  body("email").isEmail();
  body("password").isString().isLength({ min: 5 });

  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next()
  }
  // const extractedErrors = []
  // errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: errors,
  })
}

module.exports = {
  // userValidationRules,
  quoteValidationRules,
  loginValidationRules,
  validate,
}
