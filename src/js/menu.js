const menuBtn = document.querySelector(".menu-btn");
const menu = document.getElementById("menu");
const menuClose = document.createElement("div");

menuBtn.addEventListener("click", function(){
    if(menu.classList.contains("show")){
        menu.classList.remove("show");
        menuBtn.innerHTML = "<img src='dist/images/header/Menu-btn.png'>";
    }
    else{
           menu.classList.add("show")
           menuBtn.innerHTML = '<img src="dist/images/header/Menu-close-btn.png">';
    }
})



