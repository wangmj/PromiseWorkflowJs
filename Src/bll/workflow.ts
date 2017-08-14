module wfjs.bll {
    export class workflow {
        //Create ActivityContext
        public static CreateContext(inputs: Dictionary<any>, outputs: string[], globals: Dictionary<any>): ActivityContext {
            var context = new ActivityContext();
            context.inputs = inputs;
            context.outputs = outputs;
            context.globals = globals;
            return context;
        }
        /*
        @desc: 根据keys获取指定的值     
        @param: keys: 1.string "*",通配符 ;2.string[]
        */
        public static GetValues(keys: any, values: Dictionary<any>): Dictionary<any> {
            var result = {};
            keys = keys || [];
            if (keys == "*")
                return values || {};
            else if (Array.isArray(keys)) {
                (<Array<string>>keys).forEach((key) => {
                    if (key in values) {
                        result[key] = values[key];
                    } else {
                        result[key] = null;
                    }
                })
                return result;
            }
            return result;
        }
        public static GetFirstActivityName(activities: Dictionary<IActivity>): string {
            return Object.keys(activities)[0];
        }
        public static GetNextActivityName(context: ActivityContext, act: IActivity): string {
            return context.outputs["$next"] || act.next || "";
        }
        public static ClearContextInputs(context: ActivityContext) {
            context.inputs = {};
        }
    }
}