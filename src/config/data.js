
/*
  This file holds constants for generating bikes
  1. Latitude and longitude variations for singapore
  2. Possible values for provider & bike sizes
*/

const latitudeVariation = [12785693, 14043445];
const longitudeVariation = [1038018144, 1038318591];
const bikeSizeList = ['x-small', 'small', 'medium', 'large', 'x-large'];
const providerList = ['internal', 'external'];

module.exports = {
  latitudeVariation,
  longitudeVariation,
  bikeSizeList,
  providerList
};
