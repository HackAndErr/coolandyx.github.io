const burger_menu_btn = document.querySelector(".nav-menu__burger-menu");
const burger_menu = document.querySelector(".nav-menu__links");

if(document.body.clientWidth <= 768){
  burger_menu.style.display = "none";
}

burger_menu_btn.addEventListener("click", function() {
    if(burger_menu.style.display === "none"){
        burger_menu.style.display = "block";
        burger_menu_btn.innerHTML = "&#10006";
        }
    else{
        burger_menu.style.display = "none";
         burger_menu_btn.innerHTML = "&#9776";
    }
 
 
});
