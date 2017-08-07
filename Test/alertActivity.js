var alertActivity = function() {
    this.$inputs = "*";
    this.$outputs = "*";

};
alertActivity.prototype.Execute = function(context) {
    var opt = {
        msg: ""
    };
    var inputs = context.inputs;
    alert(inputs.msg);
};