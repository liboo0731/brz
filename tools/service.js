angular.module('tools').factory('toolsService',['$resource','basePath', function($resource,basePath){
	return $resource(basePath+'/tools.json',{},{});
}]);