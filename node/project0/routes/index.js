var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
  res.send("서버 배포가 성공했다");
});

// index.js에서는 url 경로를 설정한다.
// ** 이 경로를 제대로 설정해주지 않으면 에러가 뜬다.

// router.use("blogs", require("./blogs"));
router.use("user", require("./user"));

module.exports = router;
