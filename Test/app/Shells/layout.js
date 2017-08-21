define(['jsRuntime/workflowManager', 'jsRuntime/viewManager'], function(wm, vm) {
    return new Vue({
        data: {
            workflows: [{ title: "基础工作流组件测试", flowid: "BasicActivityTest" },
                { title: "自定义工作流组件测试", flowid: "CustActivityTest" }
            ],
            showNext: false,
            pageResolve: null
        },
        methods: {
            startFlow: function(flowId) {
                wm.startFlow(flowId);
            },
            next: function() {
                if (this.pageResolve) {
                    this.pageResolve();
                }
            }
        }
    });
});