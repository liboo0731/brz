define([
	'js/angular'
	],function(){
	var homeModule=angular.module('all', [
			'ui.router',
			'ngResource',
			'ngTable',
			'oc.lazyLoad']);
	homeModule.config(['$stateProvider',function($stateProvider){
		$stateProvider.state({
			name:'all',
			url: '/all',
			redirectTo: 'all.list',
			lazyLoad: function($transition$){
				return $transition$.injector().get('$ocLazyLoad').load([
					'all/service'
				]);
			}
		});
		$stateProvider.state('all.list', {
			url: '/list',
			component: 'allList',
			resolve: {
				data: ['allService',function(allService){
					return allService.get().$promise.then(function(resp){
						return resp
					});
				}]
			},
			lazyLoad: function($transition$){
				return $transition$.injector().get('$ocLazyLoad').load(['all/component']);
			}
		});
	}]);
});
