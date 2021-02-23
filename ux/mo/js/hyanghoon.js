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
