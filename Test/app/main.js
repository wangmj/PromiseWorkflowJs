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
define("knockout", ko);
define("jquery", function() { return jQuery; });
define(["durandal/system", "durandal/app", "durandal/viewLocator"], function(system, app, viewLocator) {
    var root = "app/Shells/layout";
    system.acquire(root).then(function() {
        app.title = "workflowJS";
    }).then(function() {
        app.start();
    }).then(function() {
        viewLocator.useConvention();
        app.setRoot(root);
    });
});