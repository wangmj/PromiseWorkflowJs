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
// define("knockout", ko);
define("vue", Vue);
require(["jsRuntime/composition"], function(composition) {
    composition.compose("app/Shells/layout", "app/Shells/layout", document.getElementById("applicationHost"))
});