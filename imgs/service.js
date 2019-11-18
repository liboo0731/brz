angular.module('imgs').factory('imgsService',['$resource','basePath', function($resource,basePath){
	return $resource(basePath+'/imgs.json',{},{});
}]);