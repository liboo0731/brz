define([
	'js/angular'
	],function(){
	var homeModule=angular.module('tools', [
			'ui.router',
			'ngResource',
			'ngTable',
			'oc.lazyLoad']);
	homeModule.config(['$stateProvider',function($stateProvider){
		$stateProvider.state({
			name:'tools',
			url: '/tools',
			redirectTo: 'tools.list',
			lazyLoad: function($transition$){
				return $transition$.injector().get('$ocLazyLoad').load([
					'tools/service'
				]);
			}
		});
		$stateProvider.state('tools.list', {
			url: '/list',
			component: 'commonList',
			resolve: {
				data: ['toolsService',function(homeService){
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
