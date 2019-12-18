let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
let dbConfig = require("./database/db");
let path = require("path");

const studentR = require("./routes/student.routes");

//let pa = require("./../../kumon_schedule/src/index.html");

// Mongo connection
mongoose.Promise = global.Promise;

mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true
  })
  .then(
    () => {
      console.log("Database sucessfully connected!");
    },
    error => {
      console.log("Could not connect to database : " + error);
    }
  );

const app = express();

// Adding production build to fullfill react requestions
//app.use(express.static(path.join(__dirname, "./../src/")));

console.log(__dirname);
//app.use("/static", express.static(path.join(__dirname, "./../src/")));
// app.use("/static", express.static(path.join("./../src/")));

app.use(express.static(__dirname + "./../dist"));
// React root
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "./../dist/index.html"));
  //res.sendFile(path.join("./../src/index.html"));
});

//let a = require("./../src/index")
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

// Might need to change this
app.use("/students", studentR);

// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port  " + port);
});

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
