define(["./loader"], function(loader) {
    return {
        compose: function(vUrl, mUrl, element) {
            var view, model;
            loader.loadView(vUrl)
                .then(function(v) {
                    view = v;
                }).then(function() {
                    return loader.loadMoudle(mUrl);
                }).then(function(m) {
                    model = m;
                }).then(function() {
                    element.innerHTML = view;
                    model.$mount(element);
                });
        }
    }
})