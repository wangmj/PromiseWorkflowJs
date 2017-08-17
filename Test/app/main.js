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
require(["jsRuntime/composition"], function(composition) {
    composition.compose("app/Shells/layout", "app/Shells/layout", document.getElementById("applicationHost"))
});