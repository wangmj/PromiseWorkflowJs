module wfjs {
    export class DecisionActivity implements IExecuteActivity {
        inputs: string[];
        outputs: string[];
        Execute(context: ActivityContext): Promise<void> {
            var opt = {
                condition: "",
                true: "",
                false: ""
            };
            var optInputs = wfjs.GetInputsFromContextByOpt(context, opt);
            var allValues = Helpers.ObjectHelpers.CombineObjAsync(context.inputs, context.globals)
            var result = Helpers.EvalHelper.EvalWithContext(allValues, optInputs.condition);
            context.outputs["$next"] = result == true ? optInputs.true : optInputs.false;
            return Promise.resolve();
        }
        Terminate(): boolean {
            return true;
        }
        next: string;
    }
}