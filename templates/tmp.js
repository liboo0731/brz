
self = this
var params = angular.copy(self.userGroup);

self.submit = function(event,form){
    if(form.$valid){
        userGroupsService.save($.param(params)).$promise.then(function(data){
            if(data.status != 200){
                return;
            }
            self.data = data.data;
            //下载
            window.self.location=basePath+'/license/request?'+$(event.target).serialize();
        });
    }
};