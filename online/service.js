angular.module('online').factory('onlineService',['$resource','basePath', function($resource,basePath){
	return $resource(basePath+'/online.json',{},{});
}]);