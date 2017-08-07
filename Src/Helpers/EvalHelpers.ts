module wfjs.Helpers {
    export class EvalHelper {
        public static EvalWithContext(context, code): any {
            function EvalContext() {
                return eval(code);
            }
            return EvalContext.call(context);
        }
    }
}