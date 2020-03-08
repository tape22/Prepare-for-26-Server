var express = require("express");
var router = express.Router();

const { au, sc, rm } = require("../../modules/utils");
const crypto = require("crypto");
// const jwt = require("../../modules/jwt");

/*
  회원가입
  POST| /signup 
  {
    userId, pwd, email
  }
*/
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
    // 이걸 미들웨어로 뺄순없나??
    //pwd salt값 뿌려주기
    const salt = crypto.randomBytes(32).toString("base64");
    console.log(salt);
    const derivedKey = crypto.pbkdf2Sync(password, salt, 1, 32, "sha512");
    const key = derivedKey.toString("base64");
    console.log(key);

    crypto.pbkdf2("secret", "salt", 100000, 64, "sha512", (err, derivedKey) => {
      if (err) throw err;
      console.log(derivedKey.toString("hex")); // '3745e48...08d59ae'
    });
  } catch (err) {
    console.log(err);
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.INTERNAL_SERVER_ERROR)
    });
  }
});
