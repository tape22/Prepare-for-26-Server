var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
  res.send("서버 배포가 성공했다");
});

module.exports = router;
