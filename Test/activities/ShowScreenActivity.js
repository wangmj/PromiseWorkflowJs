define(['runtime/viewManager'], function(vm) {
    var act = function() {
        this.inputs = ["page"];
        this.outputs = [];
    };
    act.prototype.Execute = function(context) {
        return vm.showPage(context.inputs.page);
    }
    return act;
});