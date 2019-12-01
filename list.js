var homeModule=angular.module('home', [
		'ui.router',
		'ngResource',
		'ngTable']);
homeModule.config(['$stateProvider',function($stateProvider){
	$stateProvider.state({
		name:'home',
		url: '/home',
		redirectTo: 'home.list'
	});
	$stateProvider.state({
		name: 'home.detail',
		url: '/detail',
		component: 'homeDetail'
	});
	$stateProvider.state({
		name: 'home.list',
		url: '/list',
		component: 'homeList',
		resolve: {
			data: ['homeService',function(homeService){
				return homeService.get().$promise.then(function(resp){
					return resp
				});
			}]
		}
	});
}]);
homeModule.component('homeDetail',{
	templateUrl: 'detail.html',
	controller: [function(){
		var self = this;
		
	}]
});
homeModule.factory('homeService',['$resource','basePath', function($resource,basePath){
	return $resource(basePath+'data.json',{},{});
}]);
homeModule.component('homeList',{
	bindings:{
		data:'<'
	},
	templateUrl: 'list.html',
	controller: ['NgTableParams','$scope','$element',function(NgTableParams,$scope,$element){
		var self = this;
		
		self.$onInit = function(){
			self.brzDataSet = self.data.data;
		
			
			self.tableParams = new NgTableParams({
				count:5,
				page:1,
				sorting:{name:'desc'}
			},{
				counts:[5,10,15],
				dataset:self.brzDataSet,
				filterOptions:{
					filterComparator: false
				},
				interceptors:[{
		    		response:function(data,params){
		    			return data;	
		    		},
		    		responseError:function(reason,params){
		    			return reason;
		    		}
				}]
			});
		    
			self.applyGlobalSearch = function(){
				var term = self.globalSearchTerm;
				if (self.isInvertedSearch){
					term = "!" + term;
				};
				self.tableParams.filter({$:term});
			};
			
			self.isFiltersVisible = true;
			
		    self.isFiltersEnabled = true;
		    
			self.isSortable = true;
		}
	}]
});
