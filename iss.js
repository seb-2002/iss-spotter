/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require("request");

// callback takes (err, IP)
const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API
  request("https://api64.ipify.org?format=json", (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIp = function (ip, callback) {
  let url = `https://ipvigilante.com/json/${ip}`;
  request(url, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const bodyObject = JSON.parse(body).data;
    const coordinatesObject = {};
    coordinatesObject.latitude = bodyObject.latitude;
    coordinatesObject.longitude = bodyObject.longitude;
    callback(null, coordinatesObject);
  });
};

const fetchIssData = function (coordinates, callback) {
  // coordinates is an object
  let lat = coordinates.latitude;
  let long = coordinates.longitude;
  let url = `http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${long}`;

  request(url, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const responseObject = JSON.parse(body).response;
    callback(null, responseObject);
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) return error;
    fetchCoordsByIp(ip, (error, coor) => {
      if (error) return error;
      fetchIssData(coor, (error, data) => {
        if (error) return error;
        callback(data);
      });
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIp,
  fetchIssData,
  nextISSTimesForMyLocation,
};
