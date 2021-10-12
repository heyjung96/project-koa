const mysql = require("mysql");

async function insertUser(obj) {
  let sql = `INSERT INTO user (email, pwd, nickname, birthday) VALUES (?, ?, ?, ?)`;

  let aParameter = [obj.email, obj.pwd, obj.nickname, obj.birthday];

  let query = mysql.format(sql, aParameter);
  try {
    let result = await pool.query(query);
    return result;
  } catch (e) {
    console.error("getLike Query ERR", e);
    return {};
  }
}

module.exports = {
  insertUser,
};
