module wfjs {
    export class FlowchartInvoker {
        public context: ActivityContext;
        public outInputs: Dictionary<any>;
        private flowchart: IFlowchart;
        constructor(flowchart: IFlowchart) {
            var inputs = bll.workflow.GetValues(flowchart.$inputs, this.outInputs);
            this.context = bll.workflow.CreateContext(inputs, flowchart.$outputs, flowchart.$globals);
            this.flowchart = flowchart;
        }
        public static Createflowchart(flowchart: IFlowchart) {
            return new FlowchartInvoker(flowchart);
        }
        public setInputs(inputs: Dictionary<any>): FlowchartInvoker {
            this.outInputs = inputs;
            return this;
        }
        public Invoke(): void {
            var firstActName = bll.workflow.GetFirstActivityName(this.flowchart.activities);
            this.ExecuteChart(firstActName)
        }
        private ExecuteChart(actName: string) {
            var act = this.flowchart.activities[actName];
            if (act == null) {
                this.context.log("warn", "workflow first activity is null,workflow completed!");
                return;
            }
            else {
                this.context.runningActName = actName;
                this.context.runningAct = act;
                this._executeAct(act);
            }
        }
        private _executeAct(activity: IActivity) {
            Helpers.ObjectHelpers.CombineObjAsync(this.context.chartInputs, activity.$inputs)
                .then((inputs) => {
                    this.context.inputs = inputs;
                    return;
                }).then(() => {
                    this.context.runningAct = activity;
                }).then(() => {
                    this.context.log("info", this.context.runningActName, " started. ", this.context);
                }).then(() => {
                    activity.activity.Execute(this.context)
                }).then(() => {
                    this.context.log("info", this.context.runningActName , " finished. " , this.context);
                }).then(() => {
                    return bll.workflow.GetNextActivityName(this.context, activity);
                }).then((actname: string) => {
                    this.context.runningActName = actname;
                    return this.flowchart.activities[actname];
                }).then((act) => {
                    if (act == null) {
                        this.context.log("info", "workflow completed!");
                        return;
                    }
                    else
                        return this._executeAct(act);
                }).catch((err) => {
                    this.context.log("error", err);
                });
        }

    }

}