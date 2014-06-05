var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var server = require('http').createServer(app);
var controller = require("./controller");
server.listen(3030);
console.log("Server running at port 3030 ...");

app.use(express.static(__dirname + "/public"));
app.use('/lib', express.static(__dirname + "/bower_components"));
app.use(bodyParser());

app.post("/processes", controller.save);
