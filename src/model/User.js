const mysql = require("mysql");
const pool = require("../config/mysqlConfig");
const validator = require("email-validator");

async function insertUser(obj) {
  let sql = `INSERT INTO user (email, pwd, nickname, birthday) VALUES (?, ?, ?, ?)`;

  /* 이메일 형식 검사 */
  if (validator.validate(obj.email) == true) {
    var aParameter = [obj.email, obj.pwd, obj.nickname, obj.birthday];

    /* 이메일 중복 검사 */
    const userDuplicateResult = await selectUser(obj.email);
    if (userDuplicateResult != 202) {
      return 403;
    }
  } else {
    return 403;
  }

  /* 비밀번호 암호화 */

  let query = mysql.format(sql, aParameter);
  try {
    let result = pool.query(query);
    console.log("등록 완료");
    return 200;
  } catch (e) {
    console.error("getLike Query ERR", e);
    return {};
  }
}

async function selectUser(obj) {
  /* 이메일 중복 검사 */
  let sql = `SELECT email,withdrawel FROM user WHERE email = ? AND withdrawel = 0`;
  var aParameter = [obj];

  let query = mysql.format(sql, aParameter);
  try {
    let result = await pool.query(query);
    var cnt = result.length;
    if (cnt < 1) {
      return 202;
    } else {
      //중복데이터 있음
      return 403;
    }
  } catch (e) {
    console.error("getLike Query ERR", e);
    return {};
  }
}

module.exports = {
  insertUser,
};
