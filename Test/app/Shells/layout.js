define(['jsRuntime/workflowManager'], function(wm) {
    return {
        workflows: ko.observableArray([
            { title: "test", flowid: "test" },
            // { title: "", flowid: "" }
        ]),
        startFlow: function(flowId) {
            wm.startFlow(flowId);
        }
    };
})