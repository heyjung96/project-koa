const { insertUser } = require("../model/User");
const { Passport } = require("passport");

exports.JoinUser = async function (data) {
  const statusCode = await insertUser(data);

  return statusCode;
};
