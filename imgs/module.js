define([
	'js/angular'
	],function(){
	var homeModule=angular.module('imgs', [
			'ui.router',
			'ngResource',
			'ngTable',
			'oc.lazyLoad']);
	homeModule.config(['$stateProvider',function($stateProvider){
		$stateProvider.state({
			name:'imgs',
			url: '/imgs',
			redirectTo: 'imgs.list',
			lazyLoad: function($transition$){
				return $transition$.injector().get('$ocLazyLoad').load([
					'imgs/service'
				]);
			}
		});
		$stateProvider.state('imgs.list', {
			url: '/list',
			component: 'imgsList',
			resolve: {
				data: ['imgsService',function(homeService){
					return homeService.get().$promise.then(function(resp){
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