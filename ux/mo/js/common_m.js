
/* * * * * * * * * * * * * * * * * * * * * * * 

1. Init    (초기설정)

* * * * * * * * * * * * * * * * * * * * * */

$(document).ready(function () {

        // 웹페이지가 브라우징된 후 주소창 제거
        window.addEventListener("load", function () {
            setTimeout(scrollTo, 0, 0, 1);
        }, false);

        // history back
        $(".btn_back").on("click", function () {
            history.back()
        });

        // goTop, header (스크롤 인식)
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


});


/* * * * * * * * * * * * * * * * * * * * * * * 

2. Utility (유틸리티)

* * * * * * * * * * * * * * * * * * * * * */




    // FORM
    // input-File-Add
    $(document).ready(function() {
        if (window.File && window.FileList && window.FileReader) {
            $("#fileAdd").on("change", function(e) {
                var files = e.target.files,
                    filesLength = files.length;
                for (var i = 0; i < filesLength; i++) {
                    var f = files[i]
                    var fileReader = new FileReader();
                    fileReader.onload = (function(e) {
                        var file = e.target;
                        $("<span class=\"pics\">" +
                            "<img class=\"picsThumbs\" src=\"" + e.target.result + "\" title=\"" + file.name + "\"/>" +
                            "<br/><span class=\"removes\">Removes image</span>" +
                            "</span>").insertAfter("#fileAdd");
                        $(".removes").click(function(){
                            $(this).parent(".pics").remove();
                        });
                    });
                fileReader.readAsDataURL(f);
                }
            });
        } else {
            alert("브라우저가 File API를 지원하지 않습니다.")
        }
    });

    // input-File-Adds
    $(document).ready(function() {
        if (window.File && window.FileList && window.FileReader) {
            $("#fileAdds").on("change", function(e) {
                var files = e.target.files,
                    filesLength = files.length;
                for (var i = 0; i < filesLength; i++) {
                    var f = files[i]
                    var fileReader = new FileReader();
                    fileReader.onload = (function(e) {
                        var file = e.target;
                        $("<span class=\"pics\">" +
                            "<img class=\"picsThumbs\" src=\"" + e.target.result + "\" title=\"" + file.name + "\"/>" +
                            "<br/><span class=\"removes\">Removes image</span>" +
                            "</span>").insertAfter("#fileAdds");
                        $(".removes").click(function(){
                            $(this).parent(".pics").remove();
                        });
                    });
                fileReader.readAsDataURL(f);
                }
            });
        } else {
            alert("브라우저가 File API를 지원하지 않습니다.")
        }
    });

    // check-All
    $( document ).ready(function() {
        var $chkAll = $('.check-all');
            $chkAll.change(function () {
                var checked = $(this).prop('checked'); 
                $('input[name="dd"]').prop('checked', checked);
            });
            
        var ddChk = $('input[name="dd"]');
            ddChk.change(function () {
                var ddChkLength = ddChk.length;
                var checkedLength = $('input[name="dd"]:checked').length;
                var selectAll = (ddChkLength == checkedLength);
                $chkAll.prop('checked', selectAll);
            });
    });

//Select Custom
$( document ).ready(function() {
	$('select').each(function(){
		var $this = $(this), numberOfOptions = $(this).children('option').length;
	
		$this.addClass('select_hidden'); 
		$this.wrap('<div class="select"></div>');
		$this.after('<div class="select_dress"></div>');

		var $dressSelect = $this.next('div.select_dress');
		$dressSelect.text($this.children('option').eq(0).text());
	
		var $selList = $('<ul />', {
			'class': 'select_options'
		}).insertAfter($dressSelect);
	
		for (var i = 0; i < numberOfOptions; i++) {
			$('<li />', {
				text: $this.children('option').eq(i).text(),
				rel: $this.children('option').eq(i).val(),
				class: $this.children('option').eq(i).attr('disabled')
			}).appendTo($selList);
		}
	
		var $selListItems = $selList.children('li');
	
		$dressSelect.click(function(e) {
			e.stopPropagation();
			$('div.select_dress.active').not(this).each(function(){
				$(this).removeClass('active').next('ul.select_options').hide();
			});
			$(this).toggleClass('active').next('ul.select_options').toggle();
		});
	
		$selListItems.click(function(e) {
			e.stopPropagation();
			
			if($(this).hasClass('disabled')){
				$this.val($(this).attr('rel',false));
			} 
			else{
				$dressSelect.text($(this).text()).removeClass('active');
				$this.val($(this).attr('rel'));
				$selList.hide();
			}
		});
	
		$(document).click(function() {
			$dressSelect.removeClass('active');
			$selList.hide();
		});

	});
});


// Select-Combo-Custom
function sCombo(selector){
	this.$selectBox = null,
	this.$select = null,
	this.$list = null,
	this.$listLi = null;
	sCombo.prototype.init = function(selector){
		this.$selectBox = $(selector);
		this.$select = this.$selectBox.find('.combo .select');
		this.$list = this.$selectBox.find('.combo .list');
		this.$listLi = this.$list.children('li');
	}
	sCombo.prototype.initEvent = function(e){
		var that = this;
		this.$select.on('click', function(e){
			that.listOn();
		});
		this.$listLi.on('click', function(e){
			that.listSelect($(this));
		});
		$(document).on('click', function(e){
			that.listOff($(e.target));
		});
	}
	sCombo.prototype.listOn = function(){
		this.$selectBox.toggleClass('on');
		if(this.$selectBox.hasClass('on')){
			this.$list.css('display', 'block');
		}else{
			this.$list.css('display', 'none');
		};
	}
	sCombo.prototype.listSelect = function($target){
		$target.addClass('selected').siblings('li').removeClass('selected');
		this.$selectBox.removeClass('on');
		//this.$select.text($target.text());
		this.$select.html($target.html());
		this.$list.css('display', 'none');
	}
	sCombo.prototype.listOff = function($target){
		if(!$target.is(this.$select) && this.$selectBox.hasClass('on')){
			this.$selectBox.removeClass('on');
			this.$list.css('display', 'none');
		};
	}
	this.init(selector);
	this.initEvent();
};



// selectBrand on/off
$( document ).ready( function() {
	$("#selectBrand .brandbox input").on("click", function() {
		$("#selectBrand .brandbox input").removeClass("on");
		$(this).addClass("on");
	});
});




/* alert */
        $(function(){
            $('.alertCls').click(function(){
                setTimeout(function(){
                    $('.alert').css('animation', 'none');
                        $('.alert').css('display', 'none');
                        $('.once').css('display', 'none');
                    }, 300);
                // uifn_currCallback();
            });
        });




/* * * * * * * * * * * * * * * * * * * * * * * 

2. Page Setting    (페이지세팅)

* * * * * * * * * * * * * * * * * * * * * */
$(document).ready(function () {
        // GNB
        $(".btn_gnb").on("click", function () {
            $(this).toggleClass("on");
            $(".hmenu").toggleClass("on");
            $("body").toggleClass("gnb_on");
        });
        // GNB
        $(".btn_gnbs").on("click", function () {
            $(this).toggleClass("on");
            $(".hmenus").toggleClass("on");
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

        // pop open
        function popOpenScroll(){
            $('html, body').css({'overflow': 'hidden', 'height': '100%'}); 
            $('#element').on('scroll touchmove mousewheel', function(event) { // 터치무브, 휠 스크롤 방지
                event.preventDefault();
                event.stopPropagation();
                return false;
            });
        }
        // pop close
        function popClsScroll(){
            $('html, body').css({'overflow': 'auto', 'height': '100%'}); //n 해제
            $('#element').off('scroll touchmove mousewheel'); // 터치무브, 휠 스크롤 가능
        }
        
        // popup (media)
        $(".btn_popOpen").on("click", function(e) {
            popOpenScroll();
            $(".popup").fadeIn();
            swiper_me1.update();
        });
        $(".popup .btn_popClose").on("click", function(e) {
            popClsScroll();
            $(".popup").fadeOut();
        });

        // jk
        $(".btn_popOpen_mov, .btn_popOpen_mov .btn_play").on("click", function(e) {
            $(".me1_popMov").fadeIn();
        });
        $(".me1_popMov .btn_popClose").on("click", function(e) {
            $(".me1_popMov").fadeOut();
        });


    // bottom pop (개선중)
    //var appCall = document.getElementsByClassName('app'); // 디바이스 app 호출
    //console.log(appCall);

    //var appHeight = document.documentElement.clientHeight; // 디바이스의 클라이언트 높이값
    //console.log('★ 디바이스의 클라이언트 높이값 : ' + appHeight); 

    //var bodyCall = document.getElementsByClassName('btPop_body'); // btPop_body 호출
    //console.log(bodyCall); 

    // let mememe = document.querySelector('.btPop'); 
    let headresult = document.querySelector('.btPop_head');
    let result = document.querySelector('.btPop_body');
    // console.log('btPop : '+mememe.offsetHeight);
    //console.log('★ 헤더 높이 : ' + headresult.offsetHeight);
    //console.log('★ 바디 높이 : ' + result.offsetHeight);
    //
    //let calll = result.offsetHeight + result.offsetHeight;
    //console.log('★ 헤더+바디 : ' + calll);

    //let pxtop = appHeight - calll;
    //console.log('★ 디바이스-(헤더+바디) : ' + pxtop);

        // btPop_full
        $('.btPop_full_click').click(function(){
            popOpenScroll();
            $('.container').addClass('btPop_full_open');
        });
        
        $('.btPop_full_close').click(function(){
            popClsScroll();
            $('.container').removeClass('btPop_full_open');
        });

        // btPopAuto
        $('.btPop_close').click(function(){
            popClsScroll();
            $('.container').removeClass('btPop_open');
            autome.style.top  = 100 + "%";
        });

        //let autome = document.querySelector('.btPopAuto'); 
        //let headsize = this.querySelector('.btPopAuto .btPopAuto_head');
        //let bodysize = this.querySelector('.btPopAuto .btPopAuto_body');
        //console.log('★ btPop_auto헤더 높이 : ' + headsize.offsetHeight);
        //console.log('★ btPop_auto바디 높이 : ' + bodysize.clientHeight);

        //let autotop = appHeight - (headsize.offsetHeight + bodysize.offsetHeight);
        //console.log('★ btPopAuto전체 높이 - 컨텐츠 높이 : ' + autotop);
        //console.log('★ btPopAuto전체 높이 - 컨텐츠 높이 /10 : ' + autotop /10);

        $('.btPop_auto').click(function(){
            popOpenScroll();
            $('.container').addClass('btPop_open');
            // autome.style.top  = autotop /10 + "vh";
            if (autotop > 251) {
                autome.style.top = 25.0 + "vh";
            }else{
                autome.style.top  = pxtop/10 + "vh";
            }
            return false;
        });

});
        


/* ================================================== JS branch JS ========================================================*/
$( document ).ready( function() {


        /* 고객센터_accordion */
        $(document).on('click','.foldGroup .fold_head',function(e){
            $(this).parents('.foldGroup li').find('.fold_cont').slideToggle(100);
            $(this).toggleClass('on');
            return false;
        });

        // 쇼핑백팝업
        $("#btn_shoppingBag_pop").click(function() {
            popClsScroll();
            $('.container').removeClass('btPop_open');
            // autome.style.top  = 100 + "%";
            $("html, body").animate({"scrollTop": 0}, 0);
            $("#shoppingBagModal").fadeIn();
            setTimeout(function(){
                $("#shoppingBagModal").fadeOut(500);
            },2000);
        });	


});
