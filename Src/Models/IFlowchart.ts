module wfjs {
    export interface IFlowchart {
        $inputs: any,
        $outputs: string[],
        $globals: Dictionary<any>,
        activities: Dictionary<IActivity>
    }
}