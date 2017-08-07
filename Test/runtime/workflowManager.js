define(["jsRuntime/utility"], function(utility) {
    function getFlowchart(chartName) {
        var arr = [];
        if (!Array.isArray(chartName)) {
            arr.push(chartName);
        } else {
            arr.concat(chartName);
        }
        return new Promise(function(resolve, reject) {
            require(arr, function(chart) {
                resolve(chart);
            }, function(err) {
                reject(err);
            });
        });
    }
    var wfmgr = {
        startFlow: function(flowid) {
            if (flowid.indexOf("flowchart") < 0) {
                flowid = "flowchart\\" + flowid;
            }
            getFlowchart(flowid).then(function(flowchart) {
                if (flowchart instanceof Function)
                    flowchart = flowchart();
                wfjs.FlowchartInvoker.Createflowchart(flowchart).Invoke(function() {
                    utility.log("workflowjs completed");
                });
            }).catch(function(err) {
                utility.error(err);
            });
        }
    };
    return wfmgr;
});