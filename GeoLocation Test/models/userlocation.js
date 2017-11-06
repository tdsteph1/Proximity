module.exports = function(sequelize, DataTypes) {
  var userLocation = sequelize.define("userLocation", {
    userID: DataTypes.STRING,
    date: DataTypes.STRING,
    time: DataTypes.STRING,
    coordinates: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    accuracy: DataTypes.STRING
  });
  return userLocation;
};