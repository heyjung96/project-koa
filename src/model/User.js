const mysql = require("mysql");
const pool = require("../config/mysqlConfig");

const bcrypt = require("bcrypt"); //암호화
const saltRounds = 10;

async function insertUser(obj) {
	const { email, pwd, nickname, birthday } = obj;
	if (!email || !pwd || !nickname || !birthday) {
		result.statusCode = 400;
		result.message = "필수값이 누락되어있습니다.";
		return result;
	}

	/* 비밀번호 암호화 */
	let secretPwd = bcrypt.hash(pwd, saltRounds).then(function(hash) {
		return hash
	});

	let sql = `
		INSERT INTO 
			user 
			(
				email, 
				pwd, 
				nickname, 
				birthday
			) 
		VALUES 
			(?, ?, ?, ?)`;

	var aParameter = [email, secretPwd, nickname, birthday];
	let query = mysql.format(sql, aParameter);
	console.log(query);
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
	console.log("중복 유저 검사");
	/* 이메일 중복 검사 */
	let sql = `SELECT email,withdrawel FROM user WHERE email = ? AND withdrawel = 0`;
	var aParameter = [obj];

	let query = mysql.format(sql, aParameter);
	try {
		let result = await pool.query(query);
		var cnt = result.length;
		return cnt;
	} catch (e) {
		console.error("getLike Query ERR", e);
		return {};
	}
}

async function loginUser(username, password){
	console.log('여기는 model loginUser ==>  ',username, password)

	let sql = `
		SELECT
			email,
			pwd
		FROM
			user
		WHERE
			email = ?
			AND
			withdrawel = 0 
		LIMIT
			1`;

	var aParameter = [username ];
	let query = mysql.format(sql, aParameter);
	//console.log(query);

	try {
		let result = await pool.query(query);

		let secretPwd = await bcrypt.compare(password, result[0].pwd).then(function(result) {
			return result //true or false
		});
		
		return secretPwd

	} catch (e) {
		console.error("getLike Query ERR", e);
		return {};
	}

}
module.exports = {
	insertUser,
	selectUser,
	loginUser
};
