class Modal {
    constructor(selector){
        this.$el = document.querySelector(selector);
        this.$el.style.display = "none";
        
        this.boundHide = evt => this.hide(evt);
        this.$el.addEventListener("click", this.boundHide)
    
        this.$elForm = this.$el.querySelector(".innerModal");
        
    }

    hide(event){
        if(event.target === this.$el){this.$el.style.display = "none"}
    }

    simpleHide(){
        this.$el.style.display = "none"
    }

    show(){
        this.$el.style.display = "flex";
    }

    

    
}

const login = new Modal("#loginWindow");
document.querySelector("#login_btn").addEventListener("click", () => login.show());

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
  .then(token => {
    if(token.length !== 36 || token[8] !== "-" || token[13] !== "-" || token[18] !== "-" || token[23] !== "-"){
        return alert("Неверный логин или пароль"); 
    }
        login.simpleHide();
        document.querySelector("input[name='login']").value = document.querySelector("input[name='password']").value = "";
        
        document.querySelector("#login_btn").style.display = "none";
        const createVisit = document.createElement("button");
        createVisit.innerHTML = "Создать визит";
        createVisit.classList.add("nav__btn");
        document.querySelector("nav").append(createVisit);
    
})

})


