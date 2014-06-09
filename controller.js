var mongoose = require("mongoose");
var _ = require("underscore");
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
    var process =  new Process(req.body);
    
    if (process.id == '') {
      res.status(500);
      res.send("Id should not be empty.");
    }
    else {
      Process.find({id: process.id}, function(error, dbProcesses) {        
        if (error) {
          res.send(500);
        }
        else if (dbProcesses.length != 0) {
          res.send(500);
        }
        else {
          process.save(function(error) {
            if (error) {
              res.send(500);
            }
            else {
              res.send(200);
            }          
          });
        }      
      });
    }   
  },
   
  
  get: function(request, response) {
    
    Process.find(function(err, processes) {
      response.send(processes);
    });

  }, 
  
  delete: function(req, res) {
    var processId = req.params.id;
    //var id = JSON.stringify(req.params.id);
    Process.findOneAndRemove({id: processId}, function(error, dbProcess) {

      if(dbProcess) {
        console.log(dbProcess + "is deleted from mongodb");
        res.send(dbProcess);
      }else{
        console.log(error);
      }
      
    });
    
   
  }

};
