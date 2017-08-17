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
                        },
                        next: "decisionTest"
                    }),
                    "decisionTest": wfjs.Activity({
                        activity: new wfjs.DecisionActivity(),
                        $inputs: {
                            condition: "this.assignKey==2",
                            true: "switchTest",
                            false: ""
                        }
                    }),
                    "switchTest": wfjs.Activity({
                        activity: new wfjs.SwitchActivity(),
                        $inputs: {
                            condition: "this.assignKey",
                            cases: {
                                1: "ShowPage"
                            },
                            defaultCase: ""
                        }

                    })
                }
            };
        };
        return flowchart;
    }
);