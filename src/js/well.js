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

const login = new Modal("#loginWindow");
document.querySelector(".login_btn").addEventListener("click", () => login.show());

const logInField = document.querySelector("input[name='login']"); 
const passwordField = document.querySelector("input[name='password']");

document.querySelector("#log_in").addEventListener("click", async function(){
    fetch("https://ajax.test-danit.com/api/v2/cards/login", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ email: logInField.value, password: passwordField.value })
})
  .then(response => response.text())
  .then(token => {console.log(token);
    
})

})


