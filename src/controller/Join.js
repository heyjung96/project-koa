const { selectUser, insertUser } = require("../model/User");
const { Passport } = require("passport");
const moment = require("moment");
const validator = require("validator");

exports.JoinUser = async function (data) {
  let { email, pwd, nickname, birthday } = data;
  let result = {};

  /* null check */
  if (!email || !pwd || !nickname || !birthday) {
    result.statusCode = 400;
    result.message = "필수값이 누락되어있습니다.";
    return result;
  }

  /* 비밀번호 보안성 체크 - 8자이상, 대문자, 특수문자 1개 이상 포함  */
  let strongPassword = validator.isStrongPassword(pwd, {
    minLength: 8,
    pointsForContainingSymbol: 80,
    pointsForContainingUpper: 15,
  });
  if (strongPassword == false) {
    result.statusCode = 400;
    result.message =
      "비밀번호에 8자이상, 대문자, 특수문자 1개 이상 포함시켜주세요 ";
    return result;
  }

  /* 이메일 형식 검사 */
  if (validator.isEmail(email) == false) {
    result.statusCode = 400;
    result.message = "이메일 형식 아님";
    return result;
  }

  /* 닉네임 string인지 검사 */
  if (typeof nickname != "string") {
    result.statusCode = 400;
    result.message = "올바른 닉네임 형식이 아님";
    return result;
  }

  /* 날짜 형식 검사 */
  birthday = moment(birthday).format("YYYY-MM-DD");
  if (validator.isDate(birthday) == false) {
    result.statusCode = 400;
    result.message = "날짜 형식 아님";
    return result;
  }

  /* 이메일 중복 검사 */
  const userDuplicateResult = await selectUser(email);
  if (userDuplicateResult > 0) {
    result.statusCode = 400;
    result.message = "이미 가입되어있는 이메일입니다";
    return result;
  }
  
  
  /* DB에 유저 넣기 */
  const statusCode = await insertUser(data);
  result.statusCode = statusCode;


  if (statusCode == 200) {
    result.message = "회원가입 완료되었습니다.";
  } else {
    result.message = "쿼리에러입니다.";
  }

  return result;
};
