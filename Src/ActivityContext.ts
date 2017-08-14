module wfjs {
    export class ActivityContext {
        public chartInputs: Dictionary<any>;
        public inputs: Dictionary<any>;
        public outputs: string[];//此处存储的是整个工作流要输入的变量
        public globals: Dictionary<any>;
        public runningActName: string;
        public runningAct: IActivity;
        public log(type: string, ...msg: any[]) {
            Logger.log(type, msg);
        }
    }
}