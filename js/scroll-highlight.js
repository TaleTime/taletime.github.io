(function() {
    const headings = $("h2");
    const navHeight = $("nav").outerHeight();
    const padding = 100;

    const highlightCurrent = function() {
        var last;
        for (let i = 0; i < headings.length; i++) {
            let heading = headings[i];
            if (window.pageYOffset < $(heading).offset().top - navHeight - padding) {
                $(".active").removeClass("active");
                $("[href=\"#" + headings[i - 1].id + "\"]").parent().addClass("active");
                break;
            }
        }
    }

    $(window).scroll(highlightCurrent);
    highlightCurrent();
})();
