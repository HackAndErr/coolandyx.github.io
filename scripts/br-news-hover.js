document.querySelector(".breaking-news .img-box").addEventListener("mouseover", (event) =>{
    elem = event.target;
   
    if(elem.closest(".block")){
        elem.closest(".block").querySelector(".article-title").classList.add("green");
        elem.closest(".block").querySelector(".img div").classList.add("green-back")
    }
})

document.querySelector(".breaking-news .img-box").addEventListener("mouseout", (event) =>{
    elem = event.target;
    
    if(elem.closest(".block")){
        elem.closest(".block").querySelector(".article-title").classList.remove("green");
        elem.closest(".block").querySelector(".img div").classList.remove("green-back")
    }
})