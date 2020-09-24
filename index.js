const { fetchMyIP, fetchCoordsByIp } = require("./iss");

const log = (error, data) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(data);
};

fetchMyIP(log);
fetchCoordsByIp("24.228.147.188", log);
