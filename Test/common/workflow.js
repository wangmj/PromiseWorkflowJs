var wfjs;
(function (wfjs) {
    function Activity(activity) {
        return activity;
    }
    wfjs.Activity = Activity;
})(wfjs || (wfjs = {}));
var wfjs;
(function (wfjs) {
    var ActivityContext = (function () {
        function ActivityContext() {
        }
        ActivityContext.prototype.log = function (type) {
            var msg = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                msg[_i - 1] = arguments[_i];
            }
            wfjs.Logger.log(type, msg);
        };
        return ActivityContext;
    }());
    wfjs.ActivityContext = ActivityContext;
})(wfjs || (wfjs = {}));
var wfjs;
(function (wfjs) {
    var FlowchartInvoker = (function () {
        function FlowchartInvoker(flowchart) {
            var inputs = wfjs.bll.workflow.GetValues(flowchart.$inputs, this.outInputs);
            this.context = wfjs.bll.workflow.CreateContext(inputs, flowchart.$outputs, flowchart.$globals);
            this.flowchart = flowchart;
        }
        FlowchartInvoker.Createflowchart = function (flowchart) {
            return new FlowchartInvoker(flowchart);
        };
        FlowchartInvoker.prototype.setInputs = function (inputs) {
            this.outInputs = inputs;
            return this;
        };
        FlowchartInvoker.prototype.Invoke = function () {
            var firstActName = wfjs.bll.workflow.GetFirstActivityName(this.flowchart.activities);
            this.ExecuteChart(firstActName);
        };
        FlowchartInvoker.prototype.ExecuteChart = function (actName) {
            var act = this.flowchart.activities[actName];
            if (act == null) {
                this.context.log("warn", "workflow first activity is null,workflow completed!");
                return;
            }
            else {
                this.context.runningActName = actName;
                this.context.runningAct = act;
                this._executeAct(act);
            }
        };
        FlowchartInvoker.prototype._executeAct = function (activity) {
            var _this = this;
            wfjs.Helpers.ObjectHelpers.CombineObjAsync(this.context.chartInputs, activity.$inputs)
                .then(function (inputs) {
                _this.context.inputs = inputs;
                return;
            }).then(function () {
                _this.context.runningAct = activity;
            }).then(function () {
                _this.context.log("info", _this.context.runningActName, " started. ", _this.context);
            }).then(function () {
                activity.activity.Execute(_this.context);
            }).then(function () {
                _this.context.log("info", _this.context.runningActName, " finished. ", _this.context);
            }).then(function () {
                return wfjs.bll.workflow.GetNextActivityName(_this.context, activity);
            }).then(function (actname) {
                _this.context.runningActName = actname;
                return _this.flowchart.activities[actname];
            }).then(function (act) {
                if (act == null) {
                    _this.context.log("info", "workflow completed!");
                    return;
                }
                else
                    return _this._executeAct(act);
            })["catch"](function (err) {
                _this.context.log("error", err);
            });
        };
        return FlowchartInvoker;
    }());
    wfjs.FlowchartInvoker = FlowchartInvoker;
})(wfjs || (wfjs = {}));
var wfjs;
(function (wfjs) {
    var Logger = (function () {
        function Logger() {
        }
        Logger.SetLogger = function (logger) {
            Logger._logger = logger;
        };
        Logger.log = function (level) {
            var message = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                message[_i - 1] = arguments[_i];
            }
            var logger = Logger.getlogger();
            if (logger == null)
                return;
            var msg = Logger.composeMsg(message);
            switch (level) {
                case "error":
                    logger.error.apply(logger, msg);
                    break;
                case "warn":
                    logger.warn.apply(logger, msg);
                    break;
                default:
                    logger.log.apply(logger, msg);
                    break;
            }
        };
        Logger.getlogger = function () {
            if (Logger._logger)
                return Logger._logger;
            else
                return null;
        };
        Logger.composeMsg = function () {
            var msg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                msg[_i] = arguments[_i];
            }
            var res = "";
            msg.unshift((new Date()).toLocaleString());
            msg.unshift("workflowjs");
            msg.forEach(function (m) {
                res += m + " ";
            });
            return msg;
        };
        return Logger;
    }());
    wfjs.Logger = Logger;
})(wfjs || (wfjs = {}));
var wfjs;
(function (wfjs) {
    var bll;
    (function (bll) {
        var workflow = (function () {
            function workflow() {
            }
            workflow.CreateContext = function (inputs, outputs, globals) {
                var context = new wfjs.ActivityContext();
                context.inputs = inputs;
                context.outputs = outputs;
                context.globals = globals;
                return context;
            };
            workflow.GetValues = function (keys, values) {
                var result = {};
                keys = keys || [];
                if (keys == "*")
                    return values || {};
                else if (Array.isArray(keys)) {
                    keys.forEach(function (key) {
                        if (key in values) {
                            result[key] = values[key];
                        }
                        else {
                            result[key] = null;
                        }
                    });
                    return result;
                }
                return result;
            };
            workflow.GetFirstActivityName = function (activities) {
                return Object.keys(activities)[0];
            };
            workflow.GetNextActivityName = function (context, act) {
                return context.outputs["$next"] || act.next || "";
            };
            workflow.ClearContextInputs = function (context) {
                context.inputs = {};
            };
            return workflow;
        }());
        bll.workflow = workflow;
    })(bll = wfjs.bll || (wfjs.bll = {}));
})(wfjs || (wfjs = {}));
var wfjs;
(function (wfjs) {
    var AssignActivity = (function () {
        function AssignActivity() {
        }
        AssignActivity.prototype.Terminate = function () {
            return true;
        };
        AssignActivity.prototype.Execute = function (context) {
            Object.keys(context.inputs.values).forEach(function (key) {
                var v = context.inputs.values[key];
                var values = {};
                wfjs.Helpers.ObjectHelpers.CombineObj(values, context.inputs, context.globals);
                if (key in context.globals)
                    context.globals[key] = wfjs.Helpers.EvalHelper.EvalWithContext(values, v);
                else {
                    wfjs.Helpers.EvalHelper.EvalWithContext(values, v);
                }
            });
            return Promise.resolve();
        };
        return AssignActivity;
    }());
    wfjs.AssignActivity = AssignActivity;
})(wfjs || (wfjs = {}));
var wfjs;
(function (wfjs) {
    var DecisionActivity = (function () {
        function DecisionActivity() {
        }
        DecisionActivity.prototype.Execute = function (context) {
            var opt = {
                condition: "",
                "true": "",
                "false": ""
            };
            var optInputs = wfjs.GetInputsFromContextByOpt(context, opt);
            var allValues = wfjs.Helpers.ObjectHelpers.CombineObjAsync(context.inputs, context.globals);
            var result = wfjs.Helpers.EvalHelper.EvalWithContext(allValues, optInputs.condition);
            context.outputs["$next"] = result == true ? optInputs["true"] : optInputs["false"];
            return Promise.resolve();
        };
        DecisionActivity.prototype.Terminate = function () {
            return true;
        };
        return DecisionActivity;
    }());
    wfjs.DecisionActivity = DecisionActivity;
})(wfjs || (wfjs = {}));
var wfjs;
(function (wfjs) {
    var SwitchActivity = (function () {
        function SwitchActivity() {
        }
        SwitchActivity.prototype.Execute = function (context) {
            var opt = {
                condition: "",
                cases: {}
            };
            var optInputs = wfjs.GetInputsFromContextByOpt(context, opt);
            var allValues = wfjs.Helpers.ObjectHelpers.CombineObjAsync(context.inputs, context.globals);
            var result = wfjs.Helpers.EvalHelper.EvalWithContext(allValues, context.inputs.condition);
            Object.keys(optInputs.cases).forEach(function (item) {
                if (item == result) {
                    context.outputs["$next"] = optInputs.cases[item];
                }
            });
            return Promise.resolve();
        };
        SwitchActivity.prototype.Terminate = function () {
            throw new Error("Method not implemented.");
        };
        return SwitchActivity;
    }());
    wfjs.SwitchActivity = SwitchActivity;
})(wfjs || (wfjs = {}));
var wfjs;
(function (wfjs) {
    var Helpers;
    (function (Helpers) {
        var EvalHelper = (function () {
            function EvalHelper() {
            }
            EvalHelper.EvalWithContext = function (context, code) {
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
(function (wfjs) {
    var Helpers;
    (function (Helpers) {
        var ObjectHelpers = (function () {
            function ObjectHelpers() {
            }
            ObjectHelpers.CombineObj = function (target) {
                var source = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    source[_i - 1] = arguments[_i];
                }
                source.forEach(function (item) {
                    for (var i in item) {
                        target[i] = item[i];
                    }
                });
                return target;
            };
            ObjectHelpers.CombineObjAsync = function () {
                var source = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    source[_i] = arguments[_i];
                }
                var target = {};
                source.forEach(function (item) {
                    for (var k in item) {
                        target[k] = item[k];
                    }
                });
                return Promise.resolve(target);
            };
            return ObjectHelpers;
        }());
        Helpers.ObjectHelpers = ObjectHelpers;
    })(Helpers = wfjs.Helpers || (wfjs.Helpers = {}));
})(wfjs || (wfjs = {}));
var wfjs;
(function (wfjs) {
    function GetInputsFromContextByOpt(context, opt) {
        var inputs = context.inputs;
        var globals = context.globals;
        var result = {};
        Object.keys(opt).forEach(function (key) {
            if (key in globals)
                result[key] = globals[key];
            else if (key in inputs)
                result[key] = inputs[key];
            else
                result[key] = opt[key];
        });
    }
    wfjs.GetInputsFromContextByOpt = GetInputsFromContextByOpt;
})(wfjs || (wfjs = {}));
