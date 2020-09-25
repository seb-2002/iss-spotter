const {
  fetchMyIP,
  fetchCoordsByIp,
  fetchIssData,
  nextISSTimesForMyLocation,
} = require("./iss");

const log = (error, data) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(data);
};

nextISSTimesForMyLocation(log);
