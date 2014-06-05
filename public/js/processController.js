angular.module("MyApp").
  controller("ProcessController", function($scope) {
  
  $scope.process = {
    id: Number,
    name: "",
    cmd: "",
    params: ""
  };
  
  $scope.process = [];
  
  $scope.send = function() {
    
    $.ajax("/process", {
      method: "GET",
      dataType: "JSON",
      
      success: function(serverResponse) {
        var processes =   _.reject($scope.processes, function(process) {
          return process == serverResponse;
          processes.push(serverResponse);
          $scope.processes = processes;
        });
      },
      
      error: function() {
        console.log("Error happened");   
      }
      
    });
    
  }
  
});
