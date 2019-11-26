angular.module('all').factory('allService',['$resource','basePath', function($resource,basePath){
	return $resource(basePath+'/all.json',{},{});
}]);