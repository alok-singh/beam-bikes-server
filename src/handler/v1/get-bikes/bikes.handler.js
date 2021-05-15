const runQuery = require('@utils/db-connection');
const { OK } = require('@utils/helper');

const { DEFAULT_LIMIT, BIKE_LIST_TABLE_NAME, SRID } = require('@config/vars');

/**
 * bikes
 * @public
 * @param event of type lambda event
 * @returns response object
 */
exports.bikes = async (event) => {
  // query params from the api call url
  const {
    lat, lng, distance, limit = DEFAULT_LIMIT
  } = event.queryStringParameters;

  // Apply filter only when all the params are present
  if (lat && lng && distance) {
    // query to set a variable to compare in retrive query
    // using mysql in built function ST_GeomFromText to create point
    // using srid for sphere spatial point
    const querySetStart = `
      SET @startPosition := ST_GeomFromText( 'POINT(${lat} ${lng})', ${SRID});
    `;

    await runQuery(querySetStart);

    // query to set a variable to compare in retrive query
    // using mysql in built function ST_Distance_Sphere to calculate distance
    // from the point decalred earlier
    const queryRetrieve = `
      SELECT *, ST_Distance_Sphere( @startPosition, position ) AS distance
      FROM ${BIKE_LIST_TABLE_NAME}
      WHERE ST_Distance_Sphere( @startPosition, position ) <= ${distance * 1000}
      ORDER BY distance
      LIMIT ${limit}
    `;

    const result = await runQuery(queryRetrieve);
    return OK(`response`, result);
  }
  const queryRetrieve = `SELECT * FROM ${BIKE_LIST_TABLE_NAME} LIMIT ${limit};`;
  const result = await runQuery(queryRetrieve);
  return OK(`response`, result);
};
