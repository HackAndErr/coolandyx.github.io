const menuBtn = document.querySelector(".menu-btn");
const menu = document.getElementById("menu");
const headerTop = document.querySelector(".header__top");

document.body.addEventListener("click", function(event){

    if(event.target === menuBtn.querySelector("img")){

    if(!menu.classList.contains("show")){
        menu.classList.add("show");
        menuBtn.innerHTML = '<img src="dist/images/header/Menu-close-btn.png">';
        
    }
    
    else{
            menu.classList.remove("show");
            menuBtn.innerHTML = "<img src='dist/images/header/Menu-btn.png'>";
        
    }
    
}
    else if(menu.classList.contains("show") && event.target !== menu && event.target !== document.querySelector(".header__top")){
    menu.classList.remove("show");
    menuBtn.innerHTML = "<img src='dist/images/header/Menu-btn.png'>";
    }
})







