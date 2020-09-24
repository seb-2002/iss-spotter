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
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    body = JSON.parse(body);
    callback(null, body);
  });
};

const fetchCoordsByIp = function (IP, callback) {
  let url = `https://ipvigilante.com/json/${IP}`;
  console.log(url);
  request(url, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
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

module.exports = { fetchMyIP, fetchCoordsByIp };
