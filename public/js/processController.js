angular.module("MyApp").
  controller("ProcessController", function($scope) {
  
  $scope.isCollapsed = false;
  
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
   // console.log(process);
  
    $.ajax({
      url: "/processes",
      method: "POST",
      data: process,
      
      success: function() {      
        console.log("Post request succeded");
        $scope.processes.push(process);
        $scope.$apply();
      },
      
      error: function(data) {
        $scope.alertText = data.responseText;   
      }
    
    });
     
    
  };
  
  $scope.delete = function(proc) {
    $.ajax({
      url: "/processes/" + proc.id,
      type: "DELETE",
      
      success: function(data) {
        console.log(data);
        $scope.processes = _.filter($scope.processes, function(process) {
          return process === data;
        } );
          $scope.$apply();
      }, 
      
      error: function(error) {
        console.log("Server internal error...");  
      }
      
    });
    
    

  };
    
});
