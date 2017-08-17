define(["./composition"], function(composition) {
    var vmMgr = {
        showPage: showPage
    };

    function showPage(page) {
        var container = document.getElementById("body");
        composition.compose(page, page, container);
    }

    return vmMgr;
});