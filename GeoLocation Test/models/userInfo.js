module.exports = function(sequelize, DataTypes) {
  var userInfo = sequelize.define("userInfo", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
  });
  return userInfo;
};