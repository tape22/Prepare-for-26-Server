const { au, sc, rm } = require('..//modules/utils');

//const encrypt = require('../modules/auth/encryption');
const jwt = require('../modules/auth/jwt');
const pool = require('../modules/pool');
const crypto = require('crypto');

const table = 'USER';

module.exports = {
  // 회원가입
  signup: async ({ userId, key, email, salt }) => {
    const fields = 'userId,password,email,salt';
    const questions = `'${userId}','${key}','${email}','${salt}'`; //salt값 꼭 저장.
    const query = `INSERT INTO ${table} (${fields}) VALUES(${questions})`;
    const result = await pool.queryParam_None(query);

    // ID 중복체크
    const checkId = pool.queryParam_None(`SELECT * FROM ${table} WHERE userId = '${userId}'`);

    console.log(checkId);
    if (checkId.length > 0) {
      return {
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.ALREADY_ID)
      };
    } else {
      // 회원가입
      if (result.length == 0) {
        return {
          code: sc.INTERNAL_SERVER_ERROR,
          json: au.successFalse(rm.INTERNAL_SERVER_ERROR)
        };
      } else {
        return {
          code: sc.OK,
          json: au.successTrue(rm.SIGN_UP_SUCCESS)
        };
      }
    }
  },

  login: async ({ userId, password }) => {
    const query = `SELECT * FROM ${table} WHERE userId = '${userId}' `;
    const result = await pool.queryParam_None(query);

    //userId가 DB에 없으면 에러 처리
    if (result.length == 0) {
      return {
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.NO_USER)
      };
    }

    //받은 password값이랑 DB에 있는 값이랑 비교
    const salt = JSON.stringify(result[0].salt).replace(/['"]+/g, ''); //DB에 있는 salt
    const pwd = JSON.stringify(result[0].password).replace(/['"]+/g, ''); //값이 ""큰따옴표가 붙어서 나오기 때문에 제거해줘야함
    console.log(pwd);
    const derivedKey = crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512');
    const pwdkey = derivedKey.toString('base64');
    console.log(pwdkey);

    if (pwd != pwdkey) {
      return {
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.MISS_MATCH_PW)
      };
    } else {
      //토큰 발행(jwt)하고 성공 메시지 보내기
      const token = JSON.stringify(jwt.sign(result[0]).token);
      const insert = await pool.queryParam_None(`UPDATE ${table} SET token = '${token}' WHERE (userId = '${userId}')`);

      if (!insert) {
        return {
          code: sc.BAD_REQUEST,
          json: au.successFalse(rm.EMPTY_TOKEN)
        };
      }

      return {
        code: sc.OK,
        json: au.successTrue(rm.SIGN_IN_SUCCESS, token)
      };
    }
  }
};
