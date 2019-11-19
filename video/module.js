define([
	'js/angular'
	],function(){
	var homeModule=angular.module('video', [
			'ui.router',
			'ngResource',
			'ngTable',
			'oc.lazyLoad']);
	homeModule.config(['$stateProvider',function($stateProvider){
		$stateProvider.state({
			name:'video',
			url: '/video',
			redirectTo: 'video.list',
			lazyLoad: function($transition$){
				return $transition$.injector().get('$ocLazyLoad').load([
					'video/service'
				]);
			}
		});
		$stateProvider.state('video.list', {
			url: '/list',
			component: 'commonList',
			resolve: {
				data: ['videoService',function(videoService){
					return videoService.get().$promise.then(function(resp){
						return resp
					});
				}]
			},
			lazyLoad: function($transition$){
				return $transition$.injector().get('$ocLazyLoad').load(['common/component']);
			}
		});
	}]);
});
