requirejs.config({
    baseUrl: "/",
    paths: {
        "text": "/common/text",
        "activities": "/activities",
        "durandal": "/durandaljs",
        "jsRuntime": "/runtime",
        "shells": "/app/Shells",
        "flowchart": "/flowchart"
    }
});
define("vue", function() { return Vue; });
require(["jsRuntime/viewManager", 'jsRuntime/loader', 'jsRuntime/composition'], function(vm, loader, composition) {
    var page = "app/Shells/layout",
        module = "app/Shells/layout",
        element = document.getElementById("applicationHost");
    // vm.showPage(page, element);
    loader.loadView(page)
        .then(function(v) {
            view = v;
        }).then(function() {
            return loader.loadMoudle(module);
        }).then(function(m) {
            model = m;
        }).then(function() {
            vm.layoutModel = model;
            composition.compose(view, model, element);
        }).catch(function(err) {
            console.error(err);
        });
});