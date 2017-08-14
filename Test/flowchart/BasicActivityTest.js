define(
    [],
    function() {
        var flowchart = function() {
            return {
                $inputs: "*",
                $outputs: "*",
                $globals: { assignKey: 1 },
                activities: {
                    "assignTest": wfjs.Activity({
                        activity: new wfjs.AssignActivity(),
                        $inputs: {
                            values: {
                                "assignKey": "this.assignKey+1"
                            }
                        }
                    })
                }
            };
        };
        return flowchart;
    }
);