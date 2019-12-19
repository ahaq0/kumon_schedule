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

const app = express();

// Adding production build to fullfill react requestions
//app.use(express.static(path.join(__dirname, "./../src/")));

console.log(__dirname);
//app.use("/static", express.static(path.join(__dirname, "./../src/")));
// app.use("/static", express.static(path.join("./../src/")));

// app.use(express.static(__dirname + "./../dist"));
// // React root
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "./../dist/index.html"));
//   //res.sendFile(path.join("./../src/index.html"));
// });

app.use(express.static(path.join(__dirname, "Client", "dist")));
app.use(cors());

// Allow Cross Origin Resource Sharing (CORS) cross domain requestions

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

//let a = require("./../src/index")
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Might need to change this
app.use("/students", studentR);

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

app.use(function(err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
