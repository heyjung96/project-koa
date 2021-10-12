var mysql = require("mysql");
var util = require("util");

let auth = {};
if (process.env.DATABASE_AUTHINFO) {
  auth = JSON.parse(process.env.DATABASE_AUTHINFO);
}

let pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: "3306",
  user: auth.username,
  password: auth.password,
  database: process.env.DB_PREFIX,
  timezone: process.env.DB_TIMEZONE,
  connectionLimit: 100, //연결갯수 제한 (기본 10인데 10000으로 늘림.)
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  }
  if (connection) connection.release();
  return;
});
pool.query = util.promisify(pool.query);
module.exports = pool;
