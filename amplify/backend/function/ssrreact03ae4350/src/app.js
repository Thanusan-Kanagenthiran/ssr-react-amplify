/* Amplify Params - DO NOT EDIT
    ENV
    REGION
Amplify Params - DO NOT EDIT */

const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const fs = require("fs");
const render = require("./client/render").default;

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("*", function (req, res) {
  // Read the index.html file from the create-react-app build
  const html = fs.readFileSync("./client/index.html", "utf-8");
  // Server side render the react application
  const markup = render();

  // Replace the empty body of index.html with the fully server rendered react application and send it back to the client
  res.send(
    html.replace(`<div id="root"></div>`, `<div id="root">${markup}</div>`)
  );
});

module.exports = app;
