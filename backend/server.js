let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
let dbConfig = require("./database/db");
let path = require("path");

const studentR = require("./routes/student.routes");

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

app.use(express.static(path.join(__dirname, "./../../kumon_schedule/")));

// React root
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "./../../kumon_schedule/src/index.html"));
});

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
