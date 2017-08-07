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
            if (act == null)
                return;
            else {
                this._executeAct(act);
            }
        }
        private _executeAct(activity: IActivity) {
            Helpers.ObjectHelpers.CombineObjAsync(this.context.chartInputs, activity.$inputs)
                .then((inputs) => {
                    this.context.inputs = inputs;
                    return;
                }).then(() => {
                    activity.activity.Execute(this.context)
                }).then(() => {
                    return bll.workflow.GetNextActivityName(this.context, activity);
                }).then((actname: string) => {
                    return this.flowchart.activities[actname];
                }).then((act) => {
                    if (act == null)
                        return;
                    else
                        return this._executeAct(act);
                });
        }

    }

}