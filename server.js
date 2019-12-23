let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");

let dbConfig = require("./database/db");
let path = require("path");

// To externalize or put data out of source code into a .env file. Didn't use CRA so I don't have it
require("dotenv").config();

const studentR = require("./routes/student.routes");
//let pa = require("./../../kumon_schedule/src/index.html");

// Mongo connection
mongoose.Promise = global.Promise;

// Getting variable
//let dbConfig = process.env.MONGODB_URL;

const app = express();

// Getting Cors to connect
app.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST", "PUT");
  next();
});

// Connect the database to schema
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true
  })
  .then(
    () => {
      console.log(process.env.MONGODB_URL);
      console.log("Database sucessfully connected!");
    },
    error => {
      console.log("Could not connect to database : " + error);
    }
  );

// Loading up all of the front end files to serve
app.use(express.static(path.join(__dirname, "Client", "dist")));
app.use(cors());

// Parse the data in easily readable format
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Might need to change this
app.use("/students", studentR);

app.get("/students", (req, res) => {
  res.sendStatus(212);
  //res.sendFile(path.join(__dirname, "Client", "dist", "index.html"));
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Client", "dist", "index.html"));
});

// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port  " + port);
});

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

// Unkown error
app.use(function(err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
