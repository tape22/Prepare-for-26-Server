var express = require("express");
var router = express.Router();

const { au, sc, rm } = require("../../modules/utils");
// salt뿌려서 암호화
const crypto = require("crypto");
// 로그인 시 토큰 발급
// const jwt = require("../../modules/jwt");

router.post("/signup", async (req, res) => {
  const { userId, pwd, email } = req.body;

  //공백 값 체크
  if (!userId || !pwd || !email) {
    res.json({
      code: sc.BAD_REQUEST,
      json: au.successFalse(rm.NULL_VALUE)
    });
  }

  try {
    //pwd salt값 뿌려주기
    const salt = crypto.randomBytes(32).toString("base64");
    console.log(salt);
    const derivedKey = crypto.pbkdf2Sync(password, salt, 1, 32, "sha512");
    const key = derivedKey.toString("base64");
    console.log(key);
  } catch (err) {
    console.log(err);
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.INTERNAL_SERVER_ERROR)
    });
  }
});
