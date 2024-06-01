const express = require("express");
const mysql = require("mysql2");
const path = require("path");
require("dotenv").config(); // 加載環境變數
const app = express();

// 設置視圖引擎為 EJS
app.set("view engine", "ejs");

// 設置靜態文件夾
app.use(express.static(path.join(__dirname, "public")));

// MySQL 連接配置
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// 連接到資料庫
connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

// 主頁路由
app.get("/", (req, res) => {
  const query = "SELECT * FROM report_options";
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.render("index", { options: results });
  });
});

// 設置伺服器端口
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
