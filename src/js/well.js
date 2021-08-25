class Modal {
    constructor(selector){
        this.$el = document.querySelector(selector);
        this.$el.style.display = "none";
        
        this.boundHide = evt => this.hide(evt);
        this.$el.addEventListener("click", this.boundHide)
    
        this.$elForm = this.$el.querySelector(".innerModal");
        
    }

    hide(event){
        if(event.target === this.$el)
        this.$el.style.display = "none";
    }

    show(){
        this.$el.style.display = "flex";
    }

    

    
}

const login = new Modal("#login");
document.querySelector(".login_btn").addEventListener("click", () => login.show())


