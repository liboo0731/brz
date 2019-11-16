define([
	'js/angular'
	],function(){
	var homeModule=angular.module('home', [
			'ui.router',
			'oc.lazyLoad']);
	homeModule.config(['$stateProvider',function($stateProvider){
		$stateProvider.state('home', {
			url: '/home',
			component: 'home',
			lazyLoad: function($transition$){
				return $transition$.injector().get('$ocLazyLoad').load(['home/component']);
			}
		});
	}]);
});
