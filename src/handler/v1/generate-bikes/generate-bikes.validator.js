const Joi = require('@hapi/joi');

module.exports = {
  name: 'generateBikes',
  description: 'generate bikes',
  path: '/v1/generateBikes',
  type: 'get',
  joiSchema: {
    query: Joi.object({
      limit: Joi.number(),
      minLatitude: Joi.number(),
      maxLatitude: Joi.number(),
      minLongitude: Joi.number(),
      maxLongitude: Joi.number(),
      newTable: Joi.bool()
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
            errors: Joi.array().items(Joi.object().keys({
              errorCode: Joi.string().required(),
              errorTitle: Joi.string().required(),
              errorDescription: Joi.string().required(),
              errorDebugDescription: Joi.string()
            }))
          }
        }
      }
    }
  }
};
