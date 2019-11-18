define([
		'js/angular',
		'js/angular-ui-router',
		'js/angular-resource',
		'plugins/ng-table/ng-table',
		'home/service'
	],function(){
		var brzModule=angular.module('brz',[
				'ui.router',
				'oc.lazyLoad',
				'home']);
		
		brzModule.constant('basePath',location.protocol+'//'+location.host+'/brz/brz/data');
		
		brzModule.config(['$compileProvider','$httpProvider','$qProvider','$stateProvider',function($compileProvider,$httpProvider,$qProvider,$stateProvider){
			$compileProvider.debugInfoEnabled(false);
			$compileProvider.commentDirectivesEnabled(false);

			$httpProvider.defaults.withCredentials = true;
			
			$qProvider.errorOnUnhandledRejections(false);
			
			$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
			
			$stateProvider.state({
				name:'base.**',
				url: '/base',
				lazyLoad: function($transition$){
					return $transition$.injector().get('$ocLazyLoad').load(['base/module']);
				}
			});
			$stateProvider.state({
				name:'detail.**',
				url: '/detail',
				lazyLoad: function($transition$){
					return $transition$.injector().get('$ocLazyLoad').load(['detail/module']);
				}
			});
			$stateProvider.state({
				name:'app.**',
				url: '/app',
				lazyLoad: function($transition$){
					return $transition$.injector().get('$ocLazyLoad').load(['app/module']);
				}
			});
			$stateProvider.state({
				name:'imgs.**',
				url: '/imgs',
				lazyLoad: function($transition$){
					return $transition$.injector().get('$ocLazyLoad').load(['imgs/module']);
				}
			});
			$stateProvider.state({
				name:'online.**',
				url: '/online',
				lazyLoad: function($transition$){
					return $transition$.injector().get('$ocLazyLoad').load(['online/module']);
				}
			});
			$stateProvider.state({
				name:'tools.**',
				url: '/tools',
				lazyLoad: function($transition$){
					return $transition$.injector().get('$ocLazyLoad').load(['tools/module']);
				}
			});
			$stateProvider.state({
				name:'video.**',
				url: '/video',
				lazyLoad: function($transition$){
					return $transition$.injector().get('$ocLazyLoad').load(['video/module']);
				}
			});
		}]);
		
		brzModule.run(['$urlService','$state',function($urlService,$state){
			if(!$urlService.url()){
				$state.go('home');
			}
		}]);
		
		angular.element(document).ready(function() {
			angular.bootstrap(document, ['brz'],{
				strictDi: true
			});
		});
});
