module wfjs {
    export function GetInputsFromContextByOpt(context: ActivityContext, opt: Dictionary<any>):any {
        var inputs = context.inputs;
        var globals = context.globals;
        var result = {};
        Object.keys(opt).forEach((key) => {
            if (key in globals)
                result[key] = globals[key];
            else if (key in inputs)
                result[key] = inputs[key]
            else
                result[key] = opt[key];
        })
    }
}