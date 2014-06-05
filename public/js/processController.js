angular.module("MyApp").
  controller("ProcessController", function($scope) {
  
  $scope.process = {
    id: "",
    name: "",
    cmd: "",
    params: ""
  };
  
  $scope.processes = [];

  
  $scope.save = function() {
  
    $.ajax({
      url: "/processes",
      method: "POST",
      data: $scope.process,
      
      success: function() {
        console.log("Post request succeded");
      },
      
      error: function() {
        console.log("Error happened");   
      }
    
    });
     
    
  };
  
});
