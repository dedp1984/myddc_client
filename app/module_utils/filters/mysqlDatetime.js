/**
 * Created by dengpan on 2016/4/22.
 */
'use strict';

/* Filters */
// need load the moment.js to use this filter.
angular.module('pu.utils.filters')
    .filter('mysqlDatetime', function() {
        return function(value) {
            if(value==null || angular.isUndefined(value)){
                return '';
            }
            var da = new Date(parseInt(value));
            return da.getFullYear() + "-" + (da.getMonth() + 1) + "-" + da.getDate() + " " + da.getHours() + ":" + da.getMinutes() + ":" + da.getSeconds();
        }
    });