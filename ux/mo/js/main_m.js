var acc = document.getElementsByClassName("tog_btn");
function qna_list(){
    for(var i=0; i<acc.length; i++){
        acc[i].addEventListener("click", function(){
            var panel = this.nextElementSibling;
            var csBtn = this.getElementsByClassName("cs_btn");
            if (panel.style.display === "block") {
                panel.style.display = "none";
                csBtn[0].classList.toggle("on")
              } else {
                panel.style.display = "block";
                csBtn[0].classList.toggle("on")
              }
        })
    }
}
qna_list();

// sch_result 탭메뉴
var schTab = document.querySelectorAll(".sch_result .area_taps .sch-tab");
var srCont = document.querySelectorAll(".sch .sch_result .sch_result_cont");

function sch_tab(){
  for(var i=0; i<schTab.length; i++){
      schTab[i].classList.remove("on");
      this.classList.add("on");
  }
}

function tab_event(){
  for(var i=0; i<schTab.length; i++){
    schTab[i].addEventListener("click", sch_tab);
  }
}

tab_event();