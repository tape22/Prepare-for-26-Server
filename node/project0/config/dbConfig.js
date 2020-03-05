const mysql = require("mysql");

const dbConfig = {
  host: "sopt26.c3ekdk9ns8mr.ap-northeast-2.rds.amazonaws.com",
  port: 3306,
  user: "sopt26",
  password: "ee1517mv!!",
  database: "sopt26",
  dateStrings: "date"
};

module.exports = mysql.createPool(dbConfig);
