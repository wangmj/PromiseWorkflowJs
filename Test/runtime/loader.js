define(function() {
    function loadView(viewUrl) {
        if (typeof viewUrl != "string")
            throw new Error("loadView argument viewUrl must be a string");
        if (!viewUrl.endsWith(".html") || !viewUrl.endsWith(".htm"))
            viewUrl += ".html";

        var args = ["text!" + viewUrl];
        return new Promise(function(resolve, reject) {
            require(args, function(ret) {
                resolve(ret);
            }, function(err) {
                reject(err);
            });
        });
    }

    function loadMoudle(moduleUrl) {
        if (typeof moduleUrl != "string") {
            throw new Error("loadMoudle argument moduleUrl must be a string");
        }
        return new Promise(function(resolve, reject) {
            require([moduleUrl], function(ret) {
                resolve(ret);
            }, function(err) {
                reject(err);
            });
        });
    }
    var ret = {
        loadMoudle: loadMoudle,
        loadView: loadView
    }
    return ret;
})