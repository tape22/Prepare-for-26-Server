const randToken = require("rand-token");
const jwt = require("jsonwebtoken");
const { secretOrPrivateKey } = require("../config/secretKey");
const options = {
  algorithm: "HS256",
  expiresIn: "3h",
  issuer: "jungmin"
};

// payload에 저장 -> 이 코드들은 매우 기본
module.exports = {
  // sign? 유효한 회원임까지 인식을 했으면 이제 그 회원 데이터대로 토큰 만들기
  sign: user => {
    const payload = {
      idx: user.idx,
      grade: user.grade,
      name: user.name
    };
    const result = {
      // 페이로드, 지정한 시크릿 키, 옵션
      token: jwt.sign(payload, secretOrPrivateKey, options), //토큰이 딱 만들어짐! 사용자 판별할 수 있는 토큰이 딱!
      refreshToken: randToken.uid(256)
    };
    return result;
  },
  verify: token => {
    let decoded; // 해독하기

    try {
      decoded = jwt.verify(token, secretOrPrivateKey);
    } catch (err) {
      if (err.message === "jwt expired") {
        console.log("expired token");
        return -3;
      } else if (err.message === "invalid token") {
        console.log("invalid token");
        return -2;
      } else {
        console.log("invalid token");
        return -2;
      }
    }
    return decoded;
  },
  refresh: user => {
    const payload = {
      idx: user.idx,
      grade: user.grade,
      name: user.name
    };
    return jwt.sign(payload, secretOrPrivateKey, options);
  }
};
