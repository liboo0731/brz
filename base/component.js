angular.module('base').component('baseList',{
	bindings:{
		data:'<'
	},
	templateUrl: 'base/template.html?'+resourcesVersion,
	controller: ['NgTableParams','$scope','$element',function(NgTableParams,$scope,$element){
		var self = this;
		
		self.$onInit = function(){
			self.brzDataSet = self.data.data;
		
			// 表格实例
			self.tableParams = new NgTableParams({
				count:5,
				filter:{name:'a'},
				page:2,
				sorting:{name:'desc'}
			},{
				counts:[5,10,20],
				dataset:self.brzDataSet,
				filterOptions:{
					filterComparator: false	// 模糊过滤
				},
				interceptors:[{	// 在数据行显示在表中之前对getData函数的调用结果的拦截器集合，集合中后一个拦截器会去拦截前一个的返回值，最终返回最后一个拦截器的处理结果
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
			// 是否显示过滤
			self.isFiltersVisible = true;
			// 是否启用过滤
		    self.isFiltersEnabled = true;
		    
			// 是否启用排序
			self.isSortable = true;
			
			self.checkboxes = {
		      checked: false,
		      items: {}
		    };
		    // 监控全选
		    $scope.$watch(function() {
		      return self.checkboxes.checked;
		    }, function(value) {
		      angular.forEach(self.brzDataSet, function(item) {
		        self.checkboxes.items[item.id] = value;
		      });
		    });
		    // 监控选中行的数据
		    $scope.$watch(function() {
		      return self.checkboxes.items;
		    }, function(values) {
		      var checked = 0, unchecked = 0,
		          total = self.brzDataSet.length;
		      angular.forEach(self.brzDataSet, function(item) {
		        checked   +=  (self.checkboxes.items[item.id]) || 0;
		        unchecked += (!self.checkboxes.items[item.id]) || 0;
		      });
		      if ((unchecked == 0) || (checked == 0)) {
		        self.checkboxes.checked = (checked == total);
		      }
		      // grayed checkbox
		      angular.element($element[0].getElementsByClassName("select-all")).prop("indeterminate", (checked != 0 && unchecked != 0));
		    }, true);
		}
	}]
});