define(
    ["activities/ShowScreenActivity"],
    function(ShowScreenActivity) {
        var flowchart = function() {
            return {
                $inputs: "*",
                $outputs: "*",
                $globals: { key1: 1 },
                activities: {
                    "showScreenTest": wfjs.Activity({
                        activity: new ShowScreenActivity(),
                        $inputs: { page: "app/pages/showScreenTest" },
                        next: "showScreenTest"
                    }),
                    "showScreenTest2": wfjs.Activity({
                        activity: new ShowScreenActivity(),
                        $inputs: { page: "app/pages/1-1" },
                        next: "showScreenTest2"
                    }),
                }
            };
        };
        return flowchart;
    }
);