$(function () {

    // init feather icons
    feather.replace();

    // init tooltip & popovers
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    //page scroll
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 50
        }, 1000);
        event.preventDefault();
    });

    //toggle scroll menu
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        // adjust scroll to top
        if (scroll >= 600) {
            $('.scroll-top').addClass('active');
        } else {
            $('.scroll-top').removeClass('active');
        }
        return false;
    });

    AOS.init();

    $("#toggle").click(function() {
        $(this).toggleClass("toggle-active");
        setTimeout(function () {
            $('#left-section').toggleClass('overlay');
        }, 200);
    });
});