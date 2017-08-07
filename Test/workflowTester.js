var wfjs = require("./workflow");
console.log(wfjs);
var flowchart = {
    $inputs: [],
    $outputs: [],
    $globals: {
        "a": 1
    },
    activities: {
        "assignTest": wfjs.Activity({
            activity: new wfjs.AssignActivity(),
            $inputs: {
                values: {
                    "a": "this.a+1"
                }
            },
            next: "alertTest"
        }),
        "alertTest": wfjs.Activity({
            activity: new alertActivity(),
            $inputs: {
                msg: "'aaaa'"
            }
        })
    }
};

wfjs.FlowchartInvoker.Createflowchart(flowchart).Invoke(function() {
    alert("workflowjs completed");
});