define([
		'js/angular',
		'js/angular-ui-router',
		'js/angular-resource',
		'plugins/ng-table/ng-table',
		'all/service'
	],function(){
		var brzModule=angular.module('brz',[
				'ui.router',
				'oc.lazyLoad',
				'all']);
		
		brzModule.constant('basePath',location.protocol+'//'+location.host+'/brz/data');
		
		brzModule.config(['$compileProvider','$httpProvider','$qProvider','$stateProvider',function($compileProvider,$httpProvider,$qProvider,$stateProvider){
			$compileProvider.debugInfoEnabled(false);
			$compileProvider.commentDirectivesEnabled(false);

			$httpProvider.defaults.withCredentials = true;
			
			$qProvider.errorOnUnhandledRejections(false);
			
			$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
			
			$stateProvider.state({
				name:'all.**',
				url: '/all',
				lazyLoad: function($transition$){
					return $transition$.injector().get('$ocLazyLoad').load(['all/module']);
				}
			});
			$stateProvider.state({
				name:'detail.**',
				url: '/detail',
				lazyLoad: function($transition$){
					return $transition$.injector().get('$ocLazyLoad').load(['detail/module']);
				}
			});
		}]);
		
		brzModule.run(['$urlService','$state',function($urlService,$state){
			if(!$urlService.url()){
				$state.go('all');
			}
		}]);
		
		angular.element(document).ready(function() {
			angular.bootstrap(document, ['brz'],{
				strictDi: true
			});
		});
});
