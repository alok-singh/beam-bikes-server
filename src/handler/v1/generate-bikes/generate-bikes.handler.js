/*
  Puspose of this file is to handle
  bike generation request
*/

const { OK } = require('@utils/helper');
const runQuery = require('@services/db-connection');

const {
  latitudeVariation, longitudeVariation, bikeSizeList, providerList
} = require('@config/data');
const { BIKE_LIST_TABLE_NAME, SRID } = require('@config/vars');

const { generateRandomNumber } = require('@utils/common');

/**
 * Function to generate random bikes query
 * @param numberOfBikes {Number}
 * @param minLatitude {Number}
 * @param maxLatitude {Number}
 * @param minLongitude {Number}
 * @param maxLongitude {Number}
 *
 * @return {String}
 *
 * @private
 */

const generateRandomBikesQuery = (numberOfBikes, minLatitude, maxLatitude, minLongitude, maxLongitude) => {
  const latitudeInterval = (maxLatitude - minLatitude) / Math.sqrt(numberOfBikes);
  const longitudeInterval = (maxLongitude - minLongitude) / Math.sqrt(numberOfBikes);
  const latLongList = [];

  // nodejs random number generator is highly skewed towards normal distribution
  // and not providing a uniform distribution hence the following custom logic is required

  // generating uniform distributed latitude and longitude
  for (let lat = minLatitude; lat < maxLatitude; lat += latitudeInterval) {
    for (let lng = minLongitude; lng < maxLongitude; lng += longitudeInterval) {
      latLongList.push([lat, lng]);
    }
  }

  const values = new Array(numberOfBikes).fill(0).reduce((acc, item, index) => {
    // in case if generated list of latitude and longitude is smaller than required number it is
    // pulled from a random nomber generator
    const lat = latLongList[index] ? latLongList[index][0] : generateRandomNumber(minLatitude, maxLatitude);
    const lng = latLongList[index] ? latLongList[index][1] : generateRandomNumber(minLongitude, maxLongitude);
    const type = bikeSizeList[generateRandomNumber(0, bikeSizeList.length - 1)];
    const provider = providerList[generateRandomNumber(0, providerList.length - 1)];
    const hourlyTarrif = generateRandomNumber(5, 10);
    const distanceTarrif = generateRandomNumber(5, 10);

    // Bulk insertion query on databse
    return `${acc}${
      acc ? `,` : ``
    } ('${type}', '${provider}', ${distanceTarrif}, ${hourlyTarrif}, ST_GeomFromText('POINT(${lat} ${lng})', ${SRID}))`;
  }, ``);
  return `INSERT INTO ${BIKE_LIST_TABLE_NAME} (type, provider, distance_tarrif, hourly_tarrif, position) VALUES ${values}`;
};

/**
 * bikes
 * @public
 *
 * @param event {Object}
 * @returns response {Object}
 */
exports.generateBikes = async (event) => {
  try {
    // query params from the api call
    const {
      limit = 100,
      newTable = true,
      minLatitude = latitudeVariation[0] / 1e7,
      maxLatitude = latitudeVariation[1] / 1e7,
      minLongitude = longitudeVariation[0] / 1e7,
      maxLongitude = longitudeVariation[1] / 1e7
    } = event.queryStringParameters;

    if (newTable) {
      // query to drop table
      const dropQuery = `DROP TABLE IF EXISTS ${BIKE_LIST_TABLE_NAME} `;
      await runQuery(dropQuery);

      // query to create new table
      const createTableQuery = `
        CREATE TABLE ${BIKE_LIST_TABLE_NAME} (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        type ENUM('x-small', 'small', 'medium', 'large', 'x-large'),
        provider ENUM('internal', 'external'),
        distance_tarrif float NOT NULL,
        hourly_tarrif float NOT NULL,
        position POINT NOT NULL SRID ${SRID},
        SPATIAL INDEX(position)
      )`;
      await runQuery(createTableQuery);
    }

    const insertQuery = generateRandomBikesQuery(limit, minLatitude, maxLatitude, minLongitude, maxLongitude);
    const insertResponse = await runQuery(insertQuery);

    return OK('response', {
      data: insertResponse
    });
  } catch (error) {
    return OK('response', error);
  }
};
