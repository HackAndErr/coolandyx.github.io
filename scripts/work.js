let workBtns = document.getElementById("amz-work-buttons");
let themeImgs = document.getElementById("theme-images");
let inactiveImgs = document.getElementsByClassName("inactive");
let loadMore = document.getElementById("load-more");



function show12(){
    for(key of themeImgs.children){
        key.classList.add("inactive");
    }
    if(inactiveImgs.length > 12){
        for(i=0; i<12; i++){
            inactiveImgs[i].classList.remove("inactive");
        }
    }
}

show12();



workBtns.addEventListener("click", () =>{
    elem = event.target;
    if(elem.tagName != "BUTTON") return null;
    if(elem.dataset.type === "all"){
        for(key of workBtns.children){
            key.classList.remove("active");
        }
        elem.classList.add("active");
        show12();
        loadMore.classList.remove("inactive");
        return null;

        
    }
    for(key of workBtns.children){
        key.classList.remove("active");
    }
    for(key of themeImgs.children){
        key.classList.add("inactive");
        if(key.dataset.type === elem.dataset.type){
            key.classList.remove("inactive");
        }
    }

    elem.classList.add("active");
    loadMore.classList.add("inactive");
})

loadMore.addEventListener("click", function(){ 
    
     if(inactiveImgs.length > 12){
        for(i=12; i>0; i--){
            inactiveImgs[i].classList.remove("inactive");
        }
    }
    
    this.classList.add("inactive");
})