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
			// JSON 数据字符串id 转数字
			self.brzDataSet.forEach(function (value) {
			value['id'] = parseInt(value.id);
                return value
            });
            // 表格实例化
			self.tableParams = new NgTableParams({
				count:10,
				page:1,
				sorting:{id:'asc'}
			},{
				paginationMaxBlocks:5,
				counts:[10,30,50],
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
		    // 全局搜索
			self.applyGlobalSearch = function(){
				var term = self.globalSearchTerm;
				if (self.isInvertedSearch){
					term = "!" + term;
				};
				self.tableParams.filter({$:term});
			};
			// 过滤是否可见
			self.isFiltersVisible = true;
			// 是否启用过滤
		    self.isFiltersEnabled = true;
		    // 是否启用排序
			self.isSortable = true;
		}
	}]
});
