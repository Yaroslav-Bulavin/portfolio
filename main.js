
$(document).ready(function () {

    const workSlider = $('[data-slider="slick"]');

    let filter = $('[data-filter]');
    filter.on("click", function (event) {
        event.preventDefault();
        let cat = $(this).data("filter");
        if (cat == "all") {
            $('[data-cat]').removeClass('hide');
        } else {
            $('[data-cat]').each(function () {
                let workCat = $(this).data("cat");
                console.log(workCat);
                if (workCat !== cat) {
                    $(this).addClass('hide');
                } else {
                    $(this).removeClass('hide');
                }
            })
        }

    });

    // Modal

    const ModalCall = $('[data-modal]');
    const ModalClose = $('[data-close]');

    ModalCall.on("click", function (event) {
        event.preventDefault();
        let $this = $(this);
        let ModalId = $this.data('modal');
        $(ModalId).addClass('show');
        $("body").addClass("no-scroll");

        setTimeout(function () {
            $(ModalId).find(".modal__dialog").css({
                transform: "scale(1)"
            });
        }, 200);
        workSlider.slick('setPosition');
    });

    ModalClose.on("click", function (event) {
        event.preventDefault();
        let $this = $(this);
        let CloseParent = $this.parents('.modal');
        CloseParent.find(".modal__dialog").css({
            transform: "scale(0)"
        });

        setTimeout(function () {
            CloseParent.removeClass('show');
            $("body").removeClass("no-scroll");
        }, 200);
    });

    $(".modal").on("click", function (event) {
        let $this = $(this);
        $this.find(".modal__dialog").css({
           transform: "scale(0)"
        });
        setTimeout(function () {
            $this.removeClass('show');
            $("body").removeClass("no-scroll");
        }, 200);
    });

    $(".modal__dialog").on("click", function (event) {
        event.stopPropagation();
    });

    // Slider: https://kenwheeler.github.io/slick/ ========================

    workSlider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        dots: true,
        arrows: false
    });

    $(".sliderPrev").on("click", function (event) {
        event.preventDefault();
        let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]');
        currentSlider.slick('slickPrev');
    });
    $(".sliderNext").on("click", function (event) {
        event.preventDefault();
        let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]');
        currentSlider.slick('slickNext');
    });

    //navToggle
    const nav = $('#nav');
    const navToggle = $('#navToggle');

    navToggle.on("click", function (event) {
        event.preventDefault();
        $(this).toggleClass('active');
        nav.toggleClass('active');
    });
    //Navigation
    $(".nav__link").on("click", function (event) {
        event.preventDefault();
        $('#nav').toggleClass('active');
        $('#navToggle').toggleClass('active');
    });

    //scroll
    let header = $("#header");
    let introH = $("#intro").innerHeight();
    let scrollOffset = $(window).scrollTop();

    checkScroll(scrollOffset);

    $(window).on("scroll", function () {
        scrollOffset = $(this).scrollTop();
        checkScroll(scrollOffset);

    });
    function checkScroll(scrollOffset) {
        if(scrollOffset >= introH) {
            header.addClass("fixed");
        } else {
            header.removeClass("fixed");
        }
    }

    //Smooth scroll
    $("[data-scroll]").on("click", function(event) {
        event.preventDefault();
        var $this = $(this),
            blockId = $this.data('scroll'),
            blockOffset = $(blockId).offset().top;

        $("#nav a").removeClass("active");
        $this.addClass("active");
        $("html,body").animate({
            scrollTop: blockOffset }, 500);
    });
});

