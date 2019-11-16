define([
		'js/angular',
		'js/angular-ui-router',
		'js/angular-resource',
		'plugins/ng-table/ng-table',
		'home/module'
	],function(){
		var brzModule=angular.module('brz',[
				'ui.router',
				'oc.lazyLoad',
				'home']);
		
		brzModule.constant('basePath',location.protocol+'//'+location.host+'/brz/data');
		
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
