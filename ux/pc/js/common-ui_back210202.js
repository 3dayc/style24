/* *******************************************

 [1][ prefix ]
	 uifn_ 

 [2][ index ]
	 1. Variables (전역변수)
	 2. Init    (초기설정)
	 3. Utility (유틸리티)
	 4. Custom  (라이브러리 커스텀)
	 5. Content (컨텐츠)

 [3][ update ]
	 2020.12.02  FOOT area - popup, family site, scrollTop
	 2020.12.10  FORM - check-All, input-File-Add, Select Custom

******************************************* */
/* * * * * * * * * * * * * * * * * * * * * * 

(1) Variables (전역변수)

* * * * * * * * * * * * * * * * * * * * * */





/* * * * * * * * * * * * * * * * * * * * * * * 

2. Init    (초기설정)

* * * * * * * * * * * * * * * * * * * * * */





/* * * * * * * * * * * * * * * * * * * * * * * 

3. Utility (유틸리티)

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
				rel: $this.children('option').eq(i).val()
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
			$dressSelect.text($(this).text()).removeClass('active');
			$this.val($(this).attr('rel'));
			$selList.hide();
			//console.log($this.val());
		});
	
		$(document).click(function() {
			$dressSelect.removeClass('active');
			$selList.hide();
		});

	});
});


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
    }, 300);
    // uifn_currCallback();
  });
});



/* * * * * * * * * * * * * * * * * * * * * * * 

4. Custom  (라이브러리 커스텀)

* * * * * * * * * * * * * * * * * * * * * */

$( document ).ready(function() {
//datepicker 
$.datepicker.regional['kr'] = {
	dateFormat: 'yy-mm-dd' // 날짜 포맷 설정
};

$.datepicker.setDefaults($.datepicker.regional['kr']);
});



/* * * * * * * * * * * * * * * * * * * * * * * 

5. Content (컨텐츠)

* * * * * * * * * * * * * * * * * * * * * */

$( document ).ready(function() {

	var footerH = $("#footer").outerHeight();
	var fixedH = $(".fixed_btns").outerHeight();
	var limitH = ((footerH+fixedH)-8);

	uifn_bottomfloat($(".fixed_btns"), footerH);
	$(window).on('scroll', function(){
		uifn_bottomfloat($(".fixed_btns"), footerH);
	});

	uifn_popupCtr();
	uifn_familyCtr();

	//popup
	function uifn_popupCtr() {
		var popupArea = $(".popup-area");
		
		if(popupArea.css('display') == 'block'){
			popupArea.show();
			document.body.classList.add("stop-scroll");
		};
	
		popupArea.find(".close").click(function(){
			popupArea.css('display','none');
			document.body.classList.remove("stop-scroll");
		});
	};
	
	// family site
	function uifn_familyCtr(){
		$('.family-area').click(function(e){
			$('.family-area').toggleClass('on');
		});
	}
});

// scrollTop
function uifn_bottomfloat(object, num) {
	var bottom = $(document).height() - $(window).height() - $(document).scrollTop();

	if (bottom > num) {
		object.removeClass("off");
	} else if (bottom <= num) {
		object.addClass("off");
	} else {
		object.removeClass("off");
	}
}
/* PANEL FUNCTIONS */
function panel_collapse(panel,action,callback){

    if(panel.hasClass("panel-toggled")){        
        panel.removeClass("panel-toggled");
        
        panel.find(".panel-collapse .fa-angle-up").removeClass("fa-angle-up").addClass("fa-angle-down");

        if(action && action === "shown" && typeof callback === "function")
            callback();            

        onload();
                
    }else{
        panel.addClass("panel-toggled");
                
        panel.find(".panel-collapse .fa-angle-down").removeClass("fa-angle-down").addClass("fa-angle-up");

        if(action && action === "hidden" && typeof callback === "function")
            callback();

        onload();        
        
    }
}


/* cs_acodian */
$(document).ready( function() {
	$('.cs .foldGroup .fold_head').on('click',function(e){
		e.preventDefault();
		$(this).parents('.foldGroup li').find('.fold_cont').slideToggle(100);
		$(this).toggleClass('on');
	});	
});
/* //cs_acodian */

/* mb_acodian,mb_tapMenu */
$(document).ready( function() {

	$('.mb .foldGroup.checkcase').on('click','.fold_head',function(e){
		e.preventDefault();
		$(this).parents('.foldGroup li').find('.fold_cont').slideDown(100);
		$(this).addClass('on');
		$('.foldGroup.checkcase .fold_head').not(this).removeClass('on').next('.fold_cont').slideUp(100);
	}).on('click','.fold_head.on',function(e){
		e.preventDefault();
		$(this).removeClass('on');
		$(this).next('.fold_cont').slideUp(100);
	});

	function resetFold() {
		$('.foldGroup.checkcase .fold_head').removeClass('on').next('.fold_cont').hide();
	};	
	var navTaps = $('.registration_nav ul li');
	var	tapPanels = $('.registration_tap .form_group');
	navTaps.click(function(){
		resetFold();
		$(this).addClass('active').siblings().removeClass('active');
		tapPanels.hide();		
		tapPanels.eq($(this).index()).show();
	});
	navTaps.eq(0).trigger('click');	

});    
/* //mb_acodian,mb_tapMenu */

/* od_acodian */
$(document).ready( function() {
	$('.od .foldGroup .fold_head').on('click',function(e){
		e.preventDefault();
		$(this).parents('.foldGroup li').find('.fold_cont').slideToggle(100);
		$(this).toggleClass('on');
	});	
});
/* //od_acodian */

/* dropDownMenu */
$(document).ready(function(){
	$(".tgl_dropdown").click(function(){
		$(this).next(".dropdown_menu").slideToggle(300, function() {
		});
	$(this).toggleClass('on');
	});
});
/* //dropDownMenu */

/* 드래그 스크롤 */
$(function(){
	var x,left,down;
	$(".bullet_sticky_nav ul").mousedown(function(e){
	e.preventDefault();
	down = true;
	x = e.pageX;
	left = $(this).scrollLeft();
	});

	$("body").mousemove(function(e){
	if(down){
		var newX = e.pageX;
		$(".bullet_sticky_nav ul").scrollLeft(left - newX + x);
	}
	});
	$("body").mouseup(function(e){down = false;});
});
/* //드래그 스크롤 */

/* 전시 팝업 */
$(function(){
	$("#coupon_pop").click(function() {
		$("#coupon_modal_01").modal("show");
	});					 
	$("#coupon_pop").click(function() {
		$("#coupon_modal_01").modal("hide");
	});
	$("#coupon_pop2").click(function() {
		$("#coupon_modal_02").modal("show");
	});					 
	$("#coupon_pop2").click(function() {
		$("#coupon_modal_02").modal("hide");
	});
});
/* //전시 팝업 */

/* 같은 데이터 노출시 동일 영역끼리 병합 */
$(document).ready( function() {
	$(".merge_row").each(function() {
		var txt = $(this).text();
		var rows = $(this).parents("table").find(".merge_row:contains('" + txt + "')");
		//var rows = $(".merge_row:contains('" + $(this).text() + "')");
		if (rows.length > 1) {
			rows.eq(0).attr("rowspan", rows.length);
			rows.not(":eq(0)").remove();
		}
	});   
});
/* //같은 데이터 노출시 동일 영역끼리 병합 */
