let mysql = require("mysql");
let config = require("./config.js");
const fetch = require("node-fetch");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require("express");
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post("/api/getMovies", (req, res) => {
  let connection = mysql.createConnection(config);
  let sql = `SELECT * FROM movies`;
  let data = [];
  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    let string = JSON.stringify(results);
    let obj = JSON.parse(string);
    res.send({ express: string });
  });
  connection.end();
});

app.post("/api/addReview", (req, res) => {
  let connection = mysql.createConnection(config);
  const reviewTitle = req.body.reviewTitle;
  const reviewContent = req.body.reviewContent;
  const reviewScore = req.body.reviewScore;
  const user_userId = req.body.user_userId;
  const movies_id = req.body.movies_id;
  let sql = `INSERT INTO review (reviewTitle, reviewContent, reviewScore, user_userId, movies_id) 
	VALUES (?, ?, ?, ?, ?)`;
  let data = [reviewTitle, reviewContent, reviewScore, user_userId, movies_id];
  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);
    let string = JSON.stringify(results);
    res.send({ express: string });
  });
  connection.end();
});

app.post("/api/getSearch", (req, res) => {
  let connection = mysql.createConnection(config);

  if (req.body.searchTitle != "") {
    let sql = "SELECT * FROM movies WHERE movies.name LIKE ?";

    console.log(sql);

    let data = [req.body.searchTitle + "%"];

    console.log(data);
    connection.query(sql, data, (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }

      console.log(results);
      let string = JSON.stringify(results);
      let obj = JSON.parse(string);
      res.send({ express: string });
    });
    connection.end();
  }
});

app.post("/api/getGenre", (req, res) => {
  let connection = mysql.createConnection(config);

  if (req.body.movieId != "") {
    let sql = "SELECT genre FROM movies_genres WHERE movie_id = ?";

    console.log(sql);

    let data = [req.body.movieId];

    console.log(data);
    connection.query(sql, data, (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }

      console.log(results);
      let string = JSON.stringify(results);
      let obj = JSON.parse(string);
      res.send({ express: string });
    });
    connection.end();
  }
});

app.post("/api/getAllGenre", (req, res) => {
  let connection = mysql.createConnection(config);

  
    let sql = "SELECT DISTINCT genre FROM movies_genres";

    console.log(sql);

    let data = [];

    console.log(data);
    connection.query(sql, data, (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }

      console.log(results);
      let string = JSON.stringify(results);
      let obj = JSON.parse(string);
      res.send({ express: string });
    });
    connection.end();
  }
);

app.post("/api/loadUserSettings", (req, res) => {
  let connection = mysql.createConnection(config);
  let userID = req.body.userID;

  let sql = `SELECT mode FROM user WHERE userID = ?`;
  console.log(sql);
  let data = [userID];
  console.log(data);

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }

    let string = JSON.stringify(results);
    //let obj = JSON.parse(string);
    res.send({ express: string });
  });
  connection.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
