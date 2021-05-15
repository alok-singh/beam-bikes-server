const Joi = require('@hapi/joi');

module.exports = {
  name: 'bikes',
  description: 'all apis for bikes',
  path: '/v1/bikes',
  type: 'post',
  joiSchema: {
    query: Joi.object({
      lat: Joi.number(),
      lng: Joi.number(),
      distance: Joi.number(),
      limit: Joi.number()
    }),
    response: {
      200: {
        description: 'OK',
        body: {
          responseCode: 200,
          responseMessage: Joi.string().required(),
          response: {}
        }
      },
      400: {
        description: 'Error Response',
        body: {
          responseCode: 400,
          responseMessage: Joi.string().required(),
          response: {
            errors: Joi.array().items(
              Joi.object().keys({
                errorCode: Joi.string().required(),
                errorTitle: Joi.string().required(),
                errorDescription: Joi.string().required(),
                errorDebugDescription: Joi.string()
              })
            )
          }
        }
      }
    }
  }
};
