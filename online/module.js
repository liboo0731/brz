define([
	'js/angular'
	],function(){
	var homeModule=angular.module('online', [
			'ui.router',
			'ngResource',
			'ngTable',
			'oc.lazyLoad']);
	homeModule.config(['$stateProvider',function($stateProvider){
		$stateProvider.state({
			name:'online',
			url: '/online',
			redirectTo: 'online.list',
			lazyLoad: function($transition$){
				return $transition$.injector().get('$ocLazyLoad').load([
					'online/service'
				]);
			}
		});
		$stateProvider.state('online.list', {
			url: '/list',
			component: 'commonList',
			resolve: {
				data: ['onlineService',function(onlineService){
					return onlineService.get().$promise.then(function(resp){
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
