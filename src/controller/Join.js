const { insertUser } = require("../model/User");
const { Passport } = require("passport");

exports.JoinUser = function (ctx) {
  console.log("***************************");
  console.log("test");
  //   console.log("ctx", ctx);
  var str = ctx.req;
  console.log("str => ", str);

  return str;
};
