define(['jsRuntime/workflowManager'], function(wm) {
    return {
        workflows: ko.observableArray([
            { title: "基础工作流组件测试", flowid: "BasicActivityTest" },
            { title: "自定义工作流组件测试", flowid: "CustActivityTest" }
        ]),
        startFlow: function(flowId) {
            wm.startFlow(flowId);
        }
    };
})