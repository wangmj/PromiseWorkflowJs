module wfjs {
    export class AssignActivity implements IExecuteActivity {
        inputs: string[];
        outputs: string[];
        Terminate(): boolean {
            return true;
        }
        next: string;

        public Execute(context: ActivityContext) {
            Object.keys(context.inputs.values).forEach((key) => {
                var v = context.inputs.values[key];
                var values = {};
                Helpers.ObjectHelpers.CombineObj(values, context.inputs, context.globals);
                //if key in globals,update globals[key],else only execute it;
                if (key in context.globals)
                    context.globals[key] = Helpers.EvalHelper.EvalWithContext(values, v);
                else {
                    Helpers.EvalHelper.EvalWithContext(values, v);
                }
            });
            return Promise.resolve();
        }
    }
}