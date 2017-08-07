module wfjs {
    export interface IActivityContext {
        inputs: Dictionary<any>;
        outputs: Dictionary<any>;
        globals: Dictionary<any>;
        runningActivity: IActivity;
        runningActivityName: string;
    }
}