define([
	'js/angular'
	],function(){
	var homeModule=angular.module('base', [
			'ui.router',
			'ngResource',
			'ngTable',
			'oc.lazyLoad']);
	homeModule.config(['$stateProvider',function($stateProvider){
		$stateProvider.state({
			name:'base',
			url: '/base',
			redirectTo: 'base.list',
			lazyLoad: function($transition$){
				return $transition$.injector().get('$ocLazyLoad').load([
					'base/service'
				]);
			}
		});
		$stateProvider.state('base.list', {
			url: '/list',
			component: 'baseList',
			resolve: {
				data: ['baseService',function(homeService){
					return homeService.get().$promise.then(function(resp){
						return resp
					});
				}]
			},
			lazyLoad: function($transition$){
				return $transition$.injector().get('$ocLazyLoad').load(['base/component']);
			}
		});
	}]);
});
