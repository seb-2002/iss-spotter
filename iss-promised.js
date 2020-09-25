const request = require("request-promise-native");

const fetchMyIp = () => request("https://api.ipify.org?format=json");

const fetchCoordsByIp = (ipString) => {
  let ip = JSON.parse(ipString).ip;
  return request(`https://ipvigilante.com/json/${ip}`);
};

const fetchIssData = (coordsString) => {
  let lat = JSON.parse(coordsString).data.latitude;
  let long = JSON.parse(coordsString).data.longitude;
  return request(
    `http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${long}`
  );
};

const printPassTimes = (issDataString) => {
  const passTimes = JSON.parse(issDataString).response;
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

const fetchIssTimesForMyLocation = () => {
  return fetchMyIp()
    .then(fetchCoordsByIp)
    .then(fetchIssData)
    .then(printPassTimes)
    .catch((error) => {
      console.log(`It didn't work: ${error.message}`);
    });
};

module.exports = {
  fetchIssTimesForMyLocation,
};
