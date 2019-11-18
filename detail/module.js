define([
	'js/angular'
	],function(){
	var homeModule=angular.module('detail', [
			'ui.router',
			'oc.lazyLoad']);
	homeModule.config(['$stateProvider',function($stateProvider){
		$stateProvider.state('detail', {
			url: '/detail',
			component: 'detail',
			lazyLoad: function($transition$){
				return $transition$.injector().get('$ocLazyLoad').load(['detail/component']);
			}
		});
	}]);
});
