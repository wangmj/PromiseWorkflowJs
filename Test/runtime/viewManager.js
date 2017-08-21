define(['./loader', "./composition"], function(loader, composition) {
    var _showNext = false;

    var vmMgr = {
        showPage: showPage,
        layoutModel: null
    };

    function showPage(page, element) {
        var container = element || document.getElementById("body");
        var view, model;
        loader.loadView(page)
            .then(function(v) {
                view = v;
            }).then(function() {
                return loader.loadMoudle(page);
            }).then(function(m) {
                model = m;
            }).then(function() {
                composition.compose(view, model, container);
            }).catch(function(err) {
                console.error(err);
            });
        return new Promise(function(resolve, reject) {
            vmMgr.layoutModel.pageResolve = resolve;
            vmMgr.layoutModel.showNext = true;
        });
    }

    return vmMgr;
});