define(function() {
    return {
        acquire: function(path) {
            return new Promise(function(resolve, reject) {
                require([path], function(ret) {
                    resolve(ret);
                }, function(err) {
                    reject(err);
                });
            });
        },
        Promise: function(action) {
            return new Promise(action);
        }
    };
});