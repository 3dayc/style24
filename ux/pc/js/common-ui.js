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
$(document).ready(function(){

	// header minify
	$(function(){
		$(window).scroll(function(){
			//var scroll = $(this).scrollTop();
			var headerH =  $('#header').outerHeight();
			if ($(window).scrollTop() > headerH){
				//header minify
				$("#header").addClass("minify");
				$("#header .hd_top_banner,#header .common_header > .area").hide();
			}
			else {
				//header minify
				$("#header").removeClass("minify");
				$("#header .hd_top_banner,#header .common_header > .area").show();
			}
		});
	});

	// history back
	$(".back").on("click", function () {
		history.back()
	});

	//통합검색 - 레이어 열고닫기
	$(document).on('click','.common_header .search .promotion_search, .common_header .search .btn_open_search',function(e){
		$('body').addClass('lock');
		$("#header .common_search").addClass('active'); 
		return false;
	}).on('click','.common_search .btn_close_search',function(e){
		$("#header .common_search").removeClass('active'); 
		$('body').removeClass('lock');
		return false;
	});		

	//통합검색 - 검색어 입력 시 
	$(document).on('keyup','.common_search .area_input input',function(e){
		var searchValue = $(this).val();
		if(searchValue.length > 0) {
			$('.common_search .area_result .default_box').hide();	
			$('.common_search .area_result .searching_box').show();	
		} else if (searchValue.length == 0) {
			$('.common_search .area_result .searching_box').hide();	
			$('.common_search .area_result .default_box').show();	
		}
	});

	//통합검색 - 슬라이드 컨트롤러 > 지금 고객님들이 많이 보고 있어요 
	$(document).on('click','.common_search .realtime_slider .btn_pause',function(e){
		realtimeItemSwiper.autoplay.stop();
		$(this).hide();
		$('.common_search .realtime_slider .btn_play').show();
	}).on('click','.common_search .realtime_slider .btn_play',function(e){
		realtimeItemSwiper.autoplay.start();
		$(this).hide();
		$('.common_search .realtime_slider .btn_pause').show();
	});

});
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

$(document).ready( function() {

	/* 고객센터_accordion */
	$(document).on('click','.cs .foldGroup .fold_head',function(e){
		$(this).parents('.foldGroup li').find('.fold_cont').slideToggle(100);
		$(this).toggleClass('on');
		return false;
	});

	/* 주문결제_accordion */
	$(document).on('click','.od .foldGroup .fold_head .fold_tit',function(e){	
		$(this).parents('.foldGroup li').find('.fold_cont').slideToggle(100);
		$(this).parents('.fold_head').toggleClass('on');
		return false;
	}).on('click','.od .foldGroup .fold_paymethod .fold_head .fold_tit',function(e){
		$("#rdi-paymethod-quick").trigger("click");
		return false;
	});

	/* 상품상세 > 상품문의 _accordion */
	$(document).on('click','.pd_qnalist .foldGroup .fold_head',function(e){
		if($(this).parent().hasClass('secret_qna')){
			alert('비밀글은 열람하실 수 없습니다.');
		}else {
			$(this).parents('.foldGroup li').find('.fold_cont').slideToggle(100);
			$(this).toggleClass('on');
		}
	});
	
	
	/* 아이디/비밀번호 찾기_accordion:open */
	$(document).on('click','.mb .foldGroup.checkcase .fold_head',function(e){	
		$(this).parents('.foldGroup li').find('.fold_cont').slideDown(100);
		$(this).addClass('on');
		$('.foldGroup.checkcase .fold_head').not(this).removeClass('on').next('.fold_cont').slideUp(100);
		return false;
	});

	/* 아이디/비밀번호 찾기_accordion:close */
	$(document).on('click','.mb .foldGroup.checkcase .fold_head.on',function(e){
		$(this).removeClass('on');
		$(this).next('.fold_cont').slideUp(100);
		return false;
	});

	/* 아이디/비밀번호 찾기_taps */
	$(document).on('click','.registration_nav ul li',function(e){
		$('.foldGroup.checkcase .fold_head').removeClass('on').next('.fold_cont').hide();
		$(this).addClass('active').siblings().removeClass('active');
		$('.registration_tap .form_group').hide();		
		$('.registration_tap .form_group').eq($(this).index()).show();
		return false;
	});

	/* dropDownMenu */
	$(document).on('click','.tgl_dropdown',function(e){
		$(this).next('.dropdown_menu').slideToggle(300);
		$(this).toggleClass('on');
		return false;
	});

	/* 전시 팝업 샘플팝업1 : 수정예정 */
	$(document).on('click','#coupon_pop',function(e){
		$("#coupon_modal_01").modal("show");
		return false;
	});
	
	/* 전시 팝업 샘플팝업2 : 수정예정 */
	$(document).on('click','#coupon_pop2',function(e){	
		$("#coupon_modal_02").modal("show");
		return false;
	});

	/* 같은 데이터 노출시 동일 영역끼리 병합 */
	$(".merge_row").each(function() {
		var txtcont = $(this).text();
		var rows = $(this).parents("table").find(".merge_row:contains('" + txtcont + "')");
		if (rows.length > 1) {
			rows.eq(0).attr("rowspan", rows.length);
			rows.not(":eq(0)").remove();
		}
		rows.eq(0).parent('tr').attr('class', 'bundle_row');
	});

	/* 드래그 스크롤 : 수정 예정 */
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
	/* //드래그 스크롤 : 수정 예정 */
	
});


/////////////////////////////////////////////////////// 
// 이하  미사용 스크립트 정리예정
//$( document ).ready(function() {

//	var footerH = $("#footer").outerHeight();
//	var fixedH = $(".fixed_btns").outerHeight();
//	var limitH = ((footerH+fixedH)-8);

//	uifn_bottomfloat($(".fixed_btns"), footerH);
//	$(window).on('scroll', function(){
//		uifn_bottomfloat($(".fixed_btns"), footerH);
//	});

//	uifn_popupCtr();
//	uifn_familyCtr();

//	//popup
//	function uifn_popupCtr() {
//		var popupArea = $(".popup-area");
		
//		if(popupArea.css('display') == 'block'){
//			popupArea.show();
//			document.body.classList.add("stop-scroll");
//		};
	
//		popupArea.find(".close").click(function(){
//			popupArea.css('display','none');
//			document.body.classList.remove("stop-scroll");
//		});
//	};
	
//	// family site
//	function uifn_familyCtr(){
//		$('.family-area').click(function(e){
//			$('.family-area').toggleClass('on');
//		});
//	}

//	// scrollTop
//	function uifn_bottomfloat(object, num) {
//		var bottom = $(document).height() - $(window).height() - $(document).scrollTop();

//		if (bottom > num) {
//			object.removeClass("off");
//		} else if (bottom <= num) {
//			object.addClass("off");
//		} else {
//			object.removeClass("off");
//		}
//	}
//});