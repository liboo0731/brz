angular.module('video').factory('videoService',['$resource','basePath', function($resource,basePath){
	return $resource(basePath+'/video.json',{},{});
}]);
