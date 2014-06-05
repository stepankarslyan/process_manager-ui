angular.module("MyApp").
  controller("ProcessController", function($scope) {
  
  $scope.process = {
    id: "",
    name: "",
    cmd: "",
    params: ""
  };
  
  $scope.processes = [];

  $.ajax({
    url: "/processes",
    method: "GET",
    
    success: function(data) {
      console.log(data);
      $scope.processes = data;
      $scope.$apply();
    }
    
  });

  
  $scope.save = function() {
  
    var process = $scope.process;
  
    $.ajax({
      url: "/processes",
      method: "POST",
      data: process,
      
      success: function() {      
        console.log("Post request succeded");
        $scope.processes.push(process);
        $scope.$apply();
      },
      
      error: function() {
        console.log("Error happened");   
      }
    
    });
     
    
  };
    
});
