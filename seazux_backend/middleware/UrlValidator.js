// const yup = require('yup');
const Joi = require('joi');


const linkSchema = Joi.object({
        full: Joi.string()
              .regex(/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i)
              .required(),
});

const validationMiddleware = (schema) => async (req, res, next) => {

  const bookPayLoad = req.body
    try {
      await schema.validate(bookPayLoad)
      next();
    } catch (error) {
      next({
        message: error.details[0].message,
        status: 400
    })
    }
  };

  module.exports = {
    linkSchema,
    validationMiddleware
  }