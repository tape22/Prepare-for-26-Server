var express = require('express');
var router = express.Router();

const { au, sc, rm } = require('../../modules/utils');
const crypto = require('crypto');
const jwt = require('../../modules/auth/jwt');

/*
  회원가입
  POST| /signup 
  {
    userId, pwd, email
  }
*/
const Sign = require('../../models/user');

router.post('/signup', async (req, res) => {
  const { userId, password, email } = req.body;

  //공백 값 체크
  if (!userId || !password || !email) {
    res.status(sc.BAD_REQUEST).send(au.successFalse(rm.NULL_VALUE));
    return;
  }

  //회원가입
  try {
    //pwd salt값 뿌려주기
    const salt = crypto.randomBytes(32).toString('base64');
    const derivedKey = crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512');
    const key = derivedKey.toString('base64');

    const { code, json } = await Sign.signup({ userId, key, email, salt });
    res.status(code).send(json);
  } catch (err) {
    console.log(err);
    res.status(sc.INTERNAL_SERVER_ERROR).send(rm.INTERNAL_SERVER_ERROR);
  }
});

/*
  로그인
  POST| /login
  {
    userId, pwd
  }
*/
router.post('/login', async (req, res) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    res.status(sc.BAD_REQUEST).send(au.successFalse(rm.NULL_VALUE));
    return;
  }

  try {
    const { code, json } = await Sign.login({ userId, password });
    res.status(code).send(json);
  } catch (err) {
    console.log(err);
    res.status(sc.INTERNAL_SERVER_ERROR).send(rm.INTERNAL_SERVER_ERROR);
  }
});

module.exports = router;
