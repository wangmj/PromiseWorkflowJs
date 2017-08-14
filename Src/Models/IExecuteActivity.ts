module wfjs {
    export interface IExecuteActivity {
        //输入
        inputs: string[],
        //输出
        outputs: string[],
        //执行
        Execute(context: ActivityContext): Promise<void>;
        //中断
        Terminate(): boolean;
        next: string;
    }
}