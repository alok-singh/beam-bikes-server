require('module-alias/register');

const bikesRoute = require('@handler/v1/get-bikes');
const generateBikesRoute = require('@handler/v1/generate-bikes');

module.exports.generateBikes = generateBikesRoute;
module.exports.bikes = bikesRoute;
