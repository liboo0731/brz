angular.module('video').factory('videoService',['$resource','basePath', function($resource,videoPath){
	return $resource(basePath+'/video.json',{},{});
}]);