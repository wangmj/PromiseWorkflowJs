define(["./loader"], function(loader) {
    return {
        compose: function(view, model, element) {

            element.innerHTML = view;
            model.$mount(element);
        }
    }
})