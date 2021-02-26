
$(document).ready(function () {
    // 웹페이지가 브라우징된 후 주소창 제거
    window.addEventListener("load", function () {
        setTimeout(scrollTo, 0, 0, 1);
    }, false);

    // history back
    $(".btn_back").on("click", function () {
        history.back()
    });

    // GNB
    $(".btn_gnb").on("click", function () {
        $(this).toggleClass("on");
        $(".hmenu").toggleClass("on");
        $("body").toggleClass("gnb_on");
    });

    $(".gnb .d1 > .folder > a").on("click", function () {
        var d2_H = $(this).siblings(".d2").children("li").length * 39;

        if ( $(this).parent().hasClass("on") ) {
            
            $(this).siblings(".d2").animate({
                "height": 0, "padding-top": 0, "padding-bottom": 0
            }, 500 , function() {
                $(this).siblings(".d2").hide();
                $(this).parent().removeClass("on");
            });
        } else {
            $(this).parent().addClass("on");
            $(this).siblings(".d2").show().animate({
                "height": d2_H+"px", "padding-top": "20px", "padding-bottom": "20px"
            }, 500);
        }
    });
    $(".gnb .d2 > .folder > a").on("click", function () {
        var d3_H = $(this).siblings(".d3").children("li").length * 36;

        if ( $(this).parent().hasClass("on") ) {
            $(this).siblings(".d3").animate({
                "height": 0, "padding-bottom": 0
            }, 500 , function() {
                $(this).siblings(".d3").hide();
                $(this).parent().removeClass("on");
            });
        } else {
            $(this).parent().addClass("on");
            $(this).siblings(".d3").show().animate({
                "height": d3_H+"px", "padding-bottom": "10px"
            }, 500);
            $(this).parent().parent(".d2").css({"height":"auto"})
        }
    });

    // CNB (Media)
    $(".cnb .btn_cnb").on("click", function () {
        var cate_H = $(this).siblings("ul").height()+70;

        if ( $(this).parent(".cnb").hasClass("on") ) {
            $(this).parent(".cnb").animate({
                "height": "50px"
            }, 500);
            $(this).parent().removeClass("on");
        } else {
            $(this).parent().addClass("on");
            $(this).parent(".cnb").animate({
                "height": cate_H+"px"
            }, 500);
        }
    });

    $(".cnb .list_cate button").on("click", function () {
        if ( $(this).hasClass("btn_all") ) {
            $(".list_cate button").removeClass("on");
            $(this).addClass("on");
        } else {
            $(".list_cate .btn_all").removeClass("on");
            $(this).toggleClass("on");
        }
    });


    // goTop, header
    $(".btn_top").click(function () {
        $("html, body").animate({
            "scrollTop": 0
        }, 50);
    });
    $(window).scroll(function () {

        // header height 가 아닌, 스크롤 감지로 변경할 것
        if ($(window).scrollTop() > $("header").height()) {
            $(".tabbar").removeClass('fixed');
        } else {
            $(".tabbar").addClass('fixed');
        }

        if ($(window).scrollTop() > $("header").height()) {
            $(".btn_top").animate({
                "opacity": 1
            }, 50);
            
            if ( $(window).scrollTop() > ($("footer").position().top - $("footer").height() )) {
                $(".btn_top").css("bottom", ($("footer").height() + 20) + "px");
            } else {
                $(".btn_top").css("bottom", "60px");
            }
        } else {
            $(".btn_top").animate({
                "opacity": 0
            }, 50);
        }

        if ($(window).scrollTop() > ($(window).height() - $("header .htop").height())) {            
            // $("header.main .htop").addClass("dark");            
            $("header").addClass("hide");
        } else {            
            // $("header.main .htop").removeClass("dark");
            $("header").removeClass("hide");
        }
    });

    // infos
    $(".btn_infos").click(function () {
        $(this).toggleClass("on");
        $(".infos").toggleClass("on");
    });

    // slide main
    var swiper_m1 = new Swiper(".m1 .slide", {
        loop: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination-m1",
            clickable: true,
            renderBullet: function (index, className) {
                return '<i class="' + className + '"> 0' + (index + 1) + '</i>';
            },
        },
        /*
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        on: {
            slideChangeTransitionEnd: function() {
                var slideIndex = this.activeIndex;
                var slidesLen = this.slides.length - 2;
                var nextIndex, prevIndex;

                // console.log(slideIndex, slidesLen);

                if ( (slideIndex == 1) || (slideIndex == (slidesLen+1)) )  {
                    nextIndex = 2;
                    prevIndex = slidesLen;
                } else if (slideIndex == slidesLen) {
                    nextIndex = 1;
                    prevIndex = slidesLen-1;
                } else {
                    nextIndex = slideIndex+1;
                    prevIndex = slideIndex-1;
                }
                
                $(".swiper-button-next").css("background-image", "url('./images/bg_me1_0"+ nextIndex +".jpg')");
                $(".swiper-button-prev").css("background-image", "url('./images/bg_me1_0"+ prevIndex +".jpg')");
            }
        }
        */
    });

    $(".swiper-button-pause").click(function () {
        swiper_m1.autoplay.stop();
        $(this).hide();
        $(this).siblings(".swiper-button-play").show();
    });
    $(".swiper-button-play").click(function () {
        swiper_m1.autoplay.start();
        $(this).hide();
        $(this).siblings(".swiper-button-pause").show();
    });

    var swiper_m2 = new Swiper(".m2 .slide", {
        loop: false,
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 20,
    });
    var swiper_m3Nav = new Swiper(".m3 .snb", {
        slidesPerView: 3,
    });
    var swiper_m3 = new Swiper(".m3 .slide", {
        loop: true,
        thumbs: {
            swiper: swiper_m3Nav,
        },
    });
    var swiper_m4 = new Swiper(".m4 .slide", {
        loop: false,
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 20,
        pagination: {
            el: ".swiper-pagination-m4",
            type: "progressbar",
        },
    });
    // slide sub
    var swiper_lnbNav = new Swiper(".lnb", {
        slidesPerView: "auto",
        spaceBetween: 20,
        autoHeight: true,
        preventClicks: true,
        preventClicksPropagation: false,
        observer: true,
        observeParents: true
    });
    var $lnbItem = $('.lnb .swiper-wrapper .swiper-slide a');
    $lnbItem.click(function(){
        var target = $(this).parent();
        $lnbItem.parent().removeClass('on')
        target.addClass('on');
        muCenter(target);
    })
    function muCenter(target){
        var snbwrap = $('.lnb .swiper-wrapper');
        var targetPos = target.position();
        var box = $('.lnb');
        var boxHarf = box.width()/2;
        var pos;
        var listWidth=0;
        
        snbwrap.find('.swiper-slide').each(function(){ listWidth += $(this).outerWidth(); })
        
        var selectTargetPos = targetPos.left + target.outerWidth()/2;
        if (selectTargetPos <= boxHarf) { // left
            pos = 0;
        }else if ((listWidth - selectTargetPos) <= boxHarf) { //right
            pos = listWidth-box.width();
        }else {
            pos = selectTargetPos - boxHarf;
        }
        
        setTimeout(function(){snbwrap.css({
            "transform": "translate3d("+ (pos*-2) +"px, 0, 0)",
            "transition-duration": "500ms"
        })}, 200);
    }



    var swiper_subTab = new Swiper(".slideWrap", {
        autoHeight: true,
        thumbs: {
            swiper: swiper_lnbNav,
        },
    });

    var swiper_me1 = new Swiper(".me1_pop .slide", {
        loop: false,
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 20,
        pagination: {
            el: ".swiper-pagination-me1",
            type: "progressbar",
        },
    });

    var swiper_b1 = new Swiper(".b1 .slide", {
        loop: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination-b1",
            type: 'fraction',
        },
    });

    $(".swiper-button-pause-b1").click(function () {
        swiper_b1.autoplay.stop();
        $(this).hide();
        $(this).siblings(".swiper-button-play-b1").show();
    });
    $(".swiper-button-play-b1").click(function () {
        swiper_b1.autoplay.start();
        $(this).hide();
        $(this).siblings(".swiper-button-pause-b1").show();
    });

    // toggleBox (윤리경영)
    $(".list_cate > li dl dt > button").on("click", function () {
        var li = $(this).parent().parent().parent("li").index();
        // var liPos = ($(this).parent().parent().parent().parent().position().top) + 110 + ($(this).parent().height() * li);

        if ($(this).parent().parent().parent("li").hasClass("on")) {
            $(this).parent().parent().parent("li").removeClass("on");
            $(this).parent().parent().parent().parent().siblings(".cate").children("li").eq(li).find("button").removeClass("on");
        } else {
            $(this).parent().parent().parent("li").siblings().removeClass("on");
            $(this).parent().parent().parent("li").addClass("on");
            $(this).parent().parent().parent().parent().siblings(".cate").children("li").find("button").removeClass("on");
            $(this).parent().parent().parent().parent().siblings(".cate").children("li").eq(li).find("button").addClass("on");

            // $("html, body").animate({
            //     "scrollTop": liPos
            // }, 300);
        }
    });

    // $(".c5 .cate button").on("click", function () {
    //     var li = $(this).parent("li").index();
    //     var liPos = ($(this).parent().parent().siblings(".list_cate").position().top) + 110 + ($(this).parent().parent().siblings(".list_cate").find("dt").height() * li);
    //     $(this).parent().siblings().find("button").removeClass("on");
    //     $(this).addClass("on");
    //     $(this).parent().parent().siblings(".list_cate").find("li").removeClass("on");
    //     $(this).parent().parent().siblings(".list_cate").children("li").eq(li).addClass("on");
    //     $("html, body").animate({
    //         "scrollTop": liPos
    //     }, 300);
    // });

    // media play
    $(".btn_play").on("click", function(e) {
        e.stopPropagation();
    });

    // popup (media)
    $(".btn_popOpen").on("click", function(e) {
        $(".me1_pop").fadeIn();
        swiper_me1.update();
    });
    $(".me1_pop .btn_popClose").on("click", function(e) {
        $(".me1_pop").fadeOut();
    });

    // jk
    $(".btn_popOpen_mov, .btn_popOpen_mov .btn_play").on("click", function(e) {
        $(".me1_popMov").fadeIn();
    });
    $(".me1_popMov .btn_popClose").on("click", function(e) {
        $(".me1_popMov").fadeOut();
    });








/* ====================================================================================================================================================================
                                        ▲▲▲▲▲▲▲ 여기를 기점으로 위에는 윤성미과장님 필드 ▲▲▲▲▲▲▲
                                        ▼▼▼▼▼▼▼        아래는 향훈,향아,밀림 필드       ▼▼▼▼▼▼▼ 
                                                    (**작업끝나면 주석지워주세요.**)
======================================================================================================================================================================*/

/* ==================================================향훈,향아,밀림 필요한 스크립트 추가(pc에서 가져옴)========================================================*/
    /* 고객센터_accordion */
    $(document).on('click','.cs .foldGroup .fold_head',function(e){
        $(this).parents('.foldGroup li').find('.fold_cont').slideToggle(100);
        $(this).toggleClass('on');
        return false;
    });

























/* ================================================= SCRIPT END========================================================*/
});