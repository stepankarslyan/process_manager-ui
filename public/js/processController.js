angular.module("MyApp").
  controller("ProcessController", function($scope) {
  
  $scope.process = {
    id: "",
    name: "",
    cmd: "",
    params: "[]"
  };
  
  $scope.processes = [];

  $.ajax({
    url: "/processes",
    method: "GET",
    
    success: function(data) {
      toastr.success("Get request succeded!");
      $scope.processes = _.sortBy(data, function(process) {return process.id});
      $scope.$apply();
    }
    
  });
  
  $scope.save = function() {
    
    var process = {
      id: $scope.process.id,
      name: $scope.process.name,
      cmd: $scope.process.cmd,
      params: JSON.parse($scope.process.params)
    };
      
        $.ajax({
          url: "/processes",
          method: "POST",
          data: process,
          
          success: function(data) {      
            $scope.processes.push(process);
            $scope.processes = _.sortBy($scope.processes, function(proc) {return proc.id});
            toastr.success(data);
            $scope.$apply();        
          },
          
          error: function(error) {
            toastr.error(error, "Fill the fields");
            $scope.$apply();
          }
          
        });
      
  };
  
  $scope.delete = function(proc) {
    
    $.ajax({
      url: "/processes/" + proc.id,
      method: "DELETE",
      
      success: function() {
        $scope.processes = _.reject($scope.processes, function(process) {
          return process.id == proc.id;
          $scope.$apply();
        });
        toastr.success("Process was cuccessfuly deleted", "SUCCESS");
        $scope.$apply();
      }, 
      
      error: function(error) {
        toastr.error(error.responseText, "ERROR");   
        $scope.$apply();
      }
      
    });
    
  };
  
  $scope.start = function(proc) {
    
    $.ajax({
      url: "/processes/" + proc.id + "/starts",
      method: "POST",
      
      success: function(data) {       
        toastr.success("Process" + "[" +proc.id + "]" + " has started" + data);
        $scope.$apply();
      }, 
      
      error: function(error) {
        toastr.error("Error happened");   
        $scope.$apply();
      }
      
    });
    
  }
    
});
