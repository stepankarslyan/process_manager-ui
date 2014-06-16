var zmq = require("zmq");
var requester = zmq.socket("asyncreq");
requester.connect("tcp://localhost:5555");

module.exports = {
  
  save: function(req, res) {
    console.log("request: " + typeof(req.body) + JSON.stringify(req.body));
    
    requester.send(JSON.stringify({type: "save",process: req.body }), function(response) {
      console.log("responder says:" + " " + response);
      res.send(response);
    });
  },
  
  get: function(req, res) {
    
    requester.send(JSON.stringify({type: "get"}), function(response) {
      console.log("when get responder sends:" + " " + response);
      res.send(response);
    });
  },
  
  delete: function(req, res) {
    
    requester.send(JSON.stringify({type: "delete", processId: req.params.id}), function(response) {
      console.log("responder sends:" + " " + JSON.stringify(response));
      res.send(response);
    });
  },
  
  start: function(req, res) {
    requester.send(JSON.stringify({type: "start", processId: req.params.id}), function(response) {
      console.log("responder sends: " + response);
      res.send(response);
    });
  }
  
};


