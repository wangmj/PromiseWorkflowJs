module wfjs {
    export interface IActivity {
        $inputs: Dictionary<any>,
        $outputs: Dictionary<any>,
        activity: IExecuteActivity,
        next: string
    }
}