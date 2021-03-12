/**
 * Mcx Dialog Mobile v0.1.0
 * Copyright (C) 2018 mcx
 * https://github.com/code-mcx/mcx-dialog-mobile
 */
(function (global, factory) {
		typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
			typeof define === 'function' && define.amd ? define(factory) :
			(global.mcxDialog = factory());
	}
	(this, (function () {
			'use strict';

			function addClass(e, c) {
				var newclass = e.className.split(" ");
				if (e.className === "") newclass = [];
				newclass.push(c);
				e.className = newclass.join(" ");
			};

			function extend(source, target) {
				for (var key in target) {
					source[key] = target[key];
				}
				return source;
			};

			function getAnimationEndName(dom) {
				var cssAnimation = ["animation", "webkitAnimation"];
				var animationEnd = {
					"animation": "animationend",
					"webkitAnimation": "webkitAnimationEnd"
				};
				for (var i = 0; i < cssAnimation.length; i++) {
					if (dom.style[cssAnimation[i]] != undefined) {
						return animationEnd[cssAnimation[i]];
					}
				}
				return undefined;
			};

			function getFontSize() {
				var clientWidth = document.documentElement.clientWidth;
				if (clientWidth < 640) return 16 * (clientWidth / 375) + "px";
				else return 16;
			};

			var layer = {

				initOpen: function initOpen(dom, options) {

					dom.style.fontSize = getFontSize();
					var body = document.querySelector("body");
					var bg = document.createElement("div");
					addClass(bg, "dialog-mobile-bg");
					if (options.showBottom == true) {
						addClass(bg, "animation-bg-fadeIn");
					}
					if (options.bottom) {
						bg.addEventListener("click", function () {
							handleClose();
						});
					}
					body.appendChild(bg);
					body.appendChild(dom);

					var animationEndName = getAnimationEndName(dom);

					function handleClose() {
						if (animationEndName) {
							layer.close([bg]);
							addClass(dom, options.closeAnimation);
							dom.addEventListener(animationEndName, function () {
								layer.close([dom]);
							});
						} else {
							layer.close([bg, dom]);
						}
					};

					//상단 닫기 아이콘
					var closeBtn = document.querySelector(".dialog-close-btn");
					closeBtn.addEventListener("click", function () {
						handleClose();
					});
					closeBtn.focus(); 	/* 200811 박성희 추가  */

					//set button click event
					options.btns.forEach(function (btn, i) {
						if (options.alertCBtn) { //alertC
							btn.addEventListener("click", function () {
								handleClose();
								options.sureBtnClick();

							});
						} else if (options.confirmCBtn || options.bottom) { //confirmC or bottom
							btn.addEventListener("click", function () {
								handleClose();
								options.btnClick(this.getAttribute("i"));
							});
						} else {
							if (i != 0) { //confirm
								btn.addEventListener("click", function () {
									handleClose();
									options.sureBtnClick();
								});
							} else { //alert
								btn.addEventListener("click", handleClose);
							}
						}
					});





					if (!options.bottom) {
						//set position
						dom.style.top = (document.documentElement.clientHeight - dom.offsetHeight) / 2 + "px";
						dom.style.left = (document.documentElement.clientWidth - dom.offsetWidth) / 2 + "px";
					}


				},

				close: function close(doms) {
					var body = document.querySelector("body");
					for (var i = 0; i < doms.length; i++) {
						body.removeChild(doms[i]);
					}

				}

			};


			var mcxDialog = {
				//alert ------------------------
				alert: function alert(content) {
					var btn = document.createElement("button"); /* 200811 박성희 */
					btn.setAttribute("type", "button");	/* 200811 박성희 */
					btn.innerText = "확인";
					addClass(btn, "dialog-button");

					var opts = {};
					opts.btns = [btn];

					this.open(content, opts);
				},

				//alertC ------------------------
				alertC: function confirm(content, options) {
					var opts = {
						sureBtnText: "확인",
						sureBtnClick: function sureBtnClick() {}
					};
					opts = extend(opts, options);

					var sureBtn = document.createElement("button");  /* 200811 박성희 */
					sureBtn.setAttribute("type", "button"); /* 200811 박성희 */
					sureBtn.innerText = opts.sureBtnText;
					addClass(sureBtn, "dialog-sure-button");
					opts.alertCBtn = true;

					opts.btns = [sureBtn];
					this.open(content, opts);

				},

				//confirm ------------------------
				confirm: function confirm(content, options) {
					var opts = {
						cancelBtnText: "취소",
						sureBtnText: "확인",
						sureBtnClick: function sureBtnClick() {}
					};
					opts = extend(opts, options);

					var cancelBtn = document.createElement("button"); /* 200811 박성희 */
					cancelBtn.setAttribute("type", "button"); /* 200811 박성희 */
					cancelBtn.innerText = opts.cancelBtnText; /* 200811 박성희 */
					addClass(cancelBtn, "dialog-cancel-button");

					var sureBtn = document.createElement("button"); /* 200811 박성희 */
					sureBtn.setAttribute("type", "button"); /* 200811 박성희 */
					sureBtn.innerText = opts.sureBtnText;
					addClass(sureBtn, "dialog-sure-button");

					opts.btns = [cancelBtn, sureBtn];
					this.open(content, opts);
				},

				//confirmC ------------------------
				confirmC: function confirmC(content, options) {
					var opts = {
						btn: ["확인"],
						btnClick: function btnClick(index) {}
					};
					opts = extend(opts, options);

					var dialog = document.createElement("div");
					var dialogContent = document.createElement("div");
					var closeBtn = document.createElement("button"); /* 200811 박성희 */
					closeBtn.setAttribute("type", "button"); /* 200811 박성희 */

					addClass(dialog, "dialog-mobile");
					addClass(dialog, "animation-zoom-in");
					addClass(dialogContent, "dialog-content");
					addClass(closeBtn, "dialog-close-btn");

					dialogContent.innerHTML = content;
					dialog.appendChild(dialogContent);
					dialog.appendChild(closeBtn);

					opts.btns = [];
					opts.btns.push(closeBtn);
					opts.btn.forEach(function (b, i) {
						var btn = document.createElement("button"); /* 200811 박성희 */
						btn.setAttribute("type", "button"); /* 200811 박성희 */
						btn.innerText = opts.btn[i];
						btn.setAttribute("i", i + 1);
						addClass(btn, "dialog-sure-button");
						dialog.appendChild(btn);
						opts.btns.push(btn);
					});
					opts.closeAnimation = "animation-zoom-out";
					opts.confirmCBtn = true;

					layer.initOpen(dialog, opts);
				},

				open: function open(content, options) {
					var dialog = document.createElement("div");
					var dialogContent = document.createElement("div");
					var closeBtn = document.createElement("button"); //상단 닫기버튼  /* 200811 박성희 */
					closeBtn.setAttribute("type", "button");  /* 200811 박성희 */


					addClass(dialog, "dialog-mobile");
					addClass(dialog, "animation-zoom-in");
					addClass(dialogContent, "dialog-content");
					addClass(closeBtn, "dialog-close-btn"); //상단 닫기버튼

					dialogContent.innerHTML = content;
					dialog.appendChild(dialogContent);
					dialog.appendChild(closeBtn); //상단 닫기버튼
					options.btns.forEach(function (btn, i) {
						dialog.appendChild(btn);
					});
					options.closeAnimation = "animation-zoom-out";

					layer.initOpen(dialog, options);

				},


				showBottom: function showBottom(options) {
					var opts = {
						btn: ["확인"],
						btnColor: [],
						btnClick: function btnClick(index) {}
					};
					opts = extend(opts, options);
					opts.bottom = true;

					var bottomDialog = document.createElement("div");
					var dialogItem = document.createElement("div");
					var closeBtn = document.createElement("button"); //상단 닫기버튼  /* 200811 박성희 */
					closeBtn.setAttribute("type", "button"); /* 200811 박성희 */
					var cancelBtn = document.createElement("button");  /* 200811 박성희 */
					cancelBtn.setAttribute("type", "button"); /* 200811 박성희 */

					cancelBtn.innerText = "취소";
					addClass(bottomDialog, "dialog-mobile-bottom");
					addClass(bottomDialog, "animation-bottom-in");
					addClass(dialogItem, "bottom-btn-item");
					addClass(closeBtn, "dialog-close-btn"); //상단 닫기버튼
					addClass(cancelBtn, "dialog-cancel-btn");

					bottomDialog.appendChild(dialogItem);
					bottomDialog.appendChild(closeBtn); //상단 닫기버튼
					bottomDialog.appendChild(cancelBtn);

					opts.btns = [];
					opts.btns.push(closeBtn);
					opts.btns.push(cancelBtn);
					opts.btn.forEach(function (b, i) {
						var btn = document.createElement("button");  /* 200811 박성희 */
						btn.setAttribute("type", "button");	 /* 200811 박성희 */
						btn.innerText = opts.btn[i];
						btn.setAttribute("i", i + 1);
						addClass(btn, "dialog-item-btn");
						if (opts.btnColor[i]) btn.style.color = opts.btnColor[i];
						dialogItem.appendChild(btn);
						opts.btns.push(btn);
					});
					opts.closeAnimation = "animation-bottom-out";
					opts.showBottom = true;

					layer.initOpen(bottomDialog, opts);
				},
				toast: function toast(content, time) {
					time = time || 3;
					var toast = document.createElement("div");
					var toastContent = document.createElement("div");

					addClass(toast, "dialog-mobile-toast");
					addClass(toast, "animation-fade-in");
					addClass(toastContent, "toast-content");

					toastContent.innerText = content;

					toast.appendChild(toastContent);

					var body = document.querySelector("body");
					body.appendChild(toast);

					toast.style.fontSize = getFontSize();
					toast.style.left = (document.documentElement.clientWidth - toast.offsetWidth) / 2 + "px";

					setTimeout(function () {
						body.removeChild(toast);
					}, time * 300);
				},

				loadElement: [],
				loading: function loading(options) {
					var opts = {
						src: "img",
						hint: ""
					};
					opts = extend(opts, options);

					var loadingBg = document.createElement("div");
					var loading = document.createElement("div");
					var img = document.createElement("img");

					addClass(loadingBg, "mobile-loading-bg");
					addClass(loading, "mobile-loading");
					addClass(loading, "animation-zoom-in");
					img.src = opts.src + "/loading.gif";
					loading.appendChild(img);

					if (opts.hint) {
						var loadingContent = document.createElement("div");
						addClass(loadingContent, "loading-content");
						loadingContent.innerText = opts.hint;
						loading.appendChild(loadingContent);
					}

					var body = document.querySelector("body");
					body.appendChild(loadingBg);
					body.appendChild(loading);

					loading.style.fontSize = getFontSize();
					loading.style.left = (document.documentElement.clientWidth - loading.offsetWidth) / 2 + "px";
					loading.style.top = (document.documentElement.clientHeight - loading.offsetHeight) / 2 + "px";

					this.loadElement.push(loadingBg);
					this.loadElement.push(loading);
				},
				closeLoading: function closeLoading() {
					layer.close(this.loadElement);
					this.loadElement = [];
				}
			};

			// providing better operations in Vue
			mcxDialog.install = function (Vue, options) {
				Vue.prototype.$mcxDialog = mcxDialog;
			};


			return mcxDialog;

})));