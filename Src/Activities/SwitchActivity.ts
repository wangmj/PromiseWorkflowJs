module wfjs {
    export class SwitchActivity implements IExecuteActivity {
        inputs: string[];
        outputs: string[];
        Execute(context: ActivityContext): Promise<void> {
            var opt = {
                condition: "",
                cases: {}
            };
            var optInputs = wfjs.GetInputsFromContextByOpt(context, opt);
            var allValues = Helpers.ObjectHelpers.CombineObjAsync(context.inputs, context.globals)
            var result = Helpers.EvalHelper.EvalWithContext(allValues, context.inputs.condition);
            Object.keys(optInputs.cases).forEach((item) => {
                if (item == result) {
                    context.outputs["$next"] = optInputs.cases[item];
                }
            });
            return Promise.resolve();
        }
        Terminate(): boolean {
            throw new Error("Method not implemented.");
        }
        next: string;
    }
}