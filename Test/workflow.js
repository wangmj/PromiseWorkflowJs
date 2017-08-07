var wfjs;
(function(wfjs) {
    function Activity(activity) {
        return activity;
    }
    wfjs.Activity = Activity;
})(wfjs || (wfjs = {}));
var wfjs;
(function(wfjs) {
    var ActivityContext = (function() {
        function ActivityContext() {}
        return ActivityContext;
    }());
    wfjs.ActivityContext = ActivityContext;
})(wfjs || (wfjs = {}));
var wfjs;
(function(wfjs) {
    var FlowchartInvoker = (function() {
        function FlowchartInvoker(flowchart) {
            var inputs = wfjs.bll.workflow.GetValues(flowchart.$inputs, this.outInputs);
            this.context = wfjs.bll.workflow.CreateContext(inputs, flowchart.$outputs, flowchart.$globals);
            this.flowchart = flowchart;
        }
        FlowchartInvoker.Createflowchart = function(flowchart) {
            return new FlowchartInvoker(flowchart);
        };
        FlowchartInvoker.prototype.setInputs = function(inputs) {
            this.outInputs = inputs;
            return this;
        };
        FlowchartInvoker.prototype.Invoke = function(callback) {
            var firstActName = wfjs.bll.workflow.GetFirstActivityName(this.flowchart.activities);
            this.ExecuteAct(firstActName);
            if (callback) {
                callback("", "");
            }
        };
        FlowchartInvoker.prototype.ExecuteAct = function(actName) {
            var act = this.flowchart.activities[actName];
            var error = null;
            do {
                this.context.runningActName = actName;
                this.context.runningAct = act;
                try {
                    this._executeAct(act, this.context);
                    var result = act.activity.Execute(this.context);
                    actName = wfjs.bll.workflow.GetNextActivityName(this.context, act);
                    act = this.flowchart.activities[actName];
                } catch (e) {
                    error = e;
                    wfjs.Logger.log("error", e);
                }
            } while (act != null && error == null);
        };
        FlowchartInvoker.prototype._executeAct = function(act, context) {
            var _this = this;
            wfjs.Helpers.ObjectHelpers.CombineObj(this.context.inputs, this.context.chartInputs, act.$inputs);
            var result = act.activity.Execute(this.context);
            return result.then(function() {
                wfjs.bll.workflow.ClearContextInputs(_this.context);
            });
        };
        return FlowchartInvoker;
    }());
    wfjs.FlowchartInvoker = FlowchartInvoker;
})(wfjs || (wfjs = {}));
var wfjs;
(function(wfjs) {
    var FlowchartInvoker2 = (function() {
        function FlowchartInvoker2(flowchart) {
            var inputs = wfjs.bll.workflow.GetValues(flowchart.$inputs, this.outInputs);
            this.context = wfjs.bll.workflow.CreateContext(inputs, flowchart.$outputs, flowchart.$globals);
            this.flowchart = flowchart;
        }
        FlowchartInvoker2.Createflowchart = function(flowchart) {
            return new wfjs.FlowchartInvoker(flowchart);
        };
        FlowchartInvoker2.prototype.setInputs = function(inputs) {
            this.outInputs = inputs;
            return this;
        };
        FlowchartInvoker2.prototype.Invoke = function() {
            var firstActName = wfjs.bll.workflow.GetFirstActivityName(this.flowchart.activities);
        };
        FlowchartInvoker2.prototype.ExecuteChart = function(actName) {
            var act = this.flowchart.activities[actName];
            if (act == null)
                return;
            else {}
        };
        FlowchartInvoker2.prototype._executeAct = function(activity) {
            var _this = this;
            activity.activity.Execute(this.context)
                .then(function() {
                    return wfjs.bll.workflow.GetNextActivityName(_this.context, activity);
                }).then(function(actname) {
                    return _this.flowchart.activities[actname];
                }).then(function(act) {
                    if (act == null)
                        return;
                    else
                        return _this._executeAct(act);
                });
        };
        return FlowchartInvoker2;
    }());
    wfjs.FlowchartInvoker2 = FlowchartInvoker2;
})(wfjs || (wfjs = {}));
var wfjs;
(function(wfjs) {
    var Logger = (function() {
        function Logger() {}
        Logger.SetLogger = function(logger) {
            Logger._logger = logger;
        };
        Logger.log = function(level) {
            var message = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                message[_i - 1] = arguments[_i];
            }
            var logger = Logger.getlogger();
            var msg = Logger.composeMsg(message);
            switch (level) {
                case "error":
                    logger.error(msg);
                case "":
            }
            logger.log();
        };
        Logger.getlogger = function() {
            if (Logger._logger)
                return Logger._logger;
            else
                return null;
        };
        Logger.composeMsg = function() {
            var msg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                msg[_i] = arguments[_i];
            }
            var res = "";
            msg.unshift((new Date()).toLocaleString());
            msg.unshift("workflowjs");
            msg.forEach(function(m) {
                res += m;
            });
            return res;
        };
        return Logger;
    }());
    wfjs.Logger = Logger;
})(wfjs || (wfjs = {}));
var wfjs;
(function(wfjs) {
    var bll;
    (function(bll) {
        var workflow = (function() {
            function workflow() {}
            workflow.CreateContext = function(inputs, outputs, globals) {
                var context = new wfjs.ActivityContext();
                context.inputs = inputs;
                context.outputs = outputs;
                context.globals = globals;
                return context;
            };
            workflow.GetValues = function(keys, values) {
                var result = {};
                keys = keys || [];
                if (keys == "*")
                    return values;
                else if (Array.isArray(keys)) {
                    keys.forEach(function(key) {
                        if (key in values) {
                            result[key] = values[key];
                        } else {
                            result[key] = null;
                        }
                    });
                    return result;
                }
                return result;
            };
            workflow.GetFirstActivityName = function(activities) {
                return Object.keys(activities)[0];
            };
            workflow.GetNextActivityName = function(context, act) {
                return context.outputs["$next"] || act.next || "";
            };
            workflow.ClearContextInputs = function(context) {
                context.inputs = {};
            };
            return workflow;
        }());
        bll.workflow = workflow;
    })(bll = wfjs.bll || (wfjs.bll = {}));
})(wfjs || (wfjs = {}));
var wfjs;
(function(wfjs) {
    var AssignActivity = (function() {
        function AssignActivity() {}
        AssignActivity.prototype.Terminate = function() {
            throw new Error("Method not implemented.");
        };
        AssignActivity.prototype.Execute = function(context) {
            Object.keys(context.inputs.values).forEach(function(key) {
                var v = context.inputs.values[key];
                var values = {};
                wfjs.Helpers.ObjectHelpers.CombineObj(values, context.inputs, context.globals);
                if (key in context.globals)
                    context.globals[key] = wfjs.Helpers.EvalHelper.EvalWithContext(values, v);
                else {
                    wfjs.Helpers.EvalHelper.EvalWithContext(values, v);
                }
            });
        };
        return AssignActivity;
    }());
    wfjs.AssignActivity = AssignActivity;
})(wfjs || (wfjs = {}));
var wfjs;
(function(wfjs) {
    var Helpers;
    (function(Helpers) {
        var EvalHelper = (function() {
            function EvalHelper() {}
            EvalHelper.EvalWithContext = function(context, code) {
                function EvalContext() {
                    return eval(code);
                }
                return EvalContext.call(context);
            };
            return EvalHelper;
        }());
        Helpers.EvalHelper = EvalHelper;
    })(Helpers = wfjs.Helpers || (wfjs.Helpers = {}));
})(wfjs || (wfjs = {}));
var wfjs;
(function(wfjs) {
    var Helpers;
    (function(Helpers) {
        var ObjectHelpers = (function() {
            function ObjectHelpers() {}
            ObjectHelpers.CombineObj = function(target) {
                var source = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    source[_i - 1] = arguments[_i];
                }
                source.forEach(function(item) {
                    for (var i in item) {
                        target[i] = item[i];
                    }
                });
                return target;
            };
            return ObjectHelpers;
        }());
        Helpers.ObjectHelpers = ObjectHelpers;
    })(Helpers = wfjs.Helpers || (wfjs.Helpers = {}));
})(wfjs || (wfjs = {}));