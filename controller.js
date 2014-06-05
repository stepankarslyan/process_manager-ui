var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");
console.log("Connection to mongodb established");

var schema = new mongoose.Schema({
  id: String,
  name: String,
  cmd: String,
  params: String
});

var Process = mongoose.model("Process", schema);


module.exports = {
  
  save: function(req, res) {
    console.log(req.body);
    var process =  new Process(req.body);
    process.save();   
  }

};
