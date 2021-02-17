let servBtns = document.getElementById("services-buttons");
let servTxts = document.getElementById("services-texts");

servBtns.addEventListener("click", () => {
    elem = event.target;
    if(elem.tagName === "BUTTON"){
        for(key of servBtns.children){
            key.classList.remove("active-btn");
        }

         for(key of servTxts.children){
            key.classList.remove("active");
        }
         servTxts.children[elem.dataset.number].classList.add("active");
         elem.classList.add("active-btn");
    }
})