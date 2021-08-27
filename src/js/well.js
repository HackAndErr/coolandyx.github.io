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

class Visit {
    constructor(options){
        this.purpose = "<input name='purpose' placeholder='Цель визита'>",
        this.desc = "<input name='desc' placeholder='Краткое описание визита'>",
        this.priority = `Срочность визита: <select id='visitPriority' placeholder="Срочность визита">
        <option name="priority" value="common">Обычная</option>
        <option name="priority" value="immediate">Приоритетная</option>
        <option name="priority" value="superimmediate">Неотложная</option>
        </select>`
        this.name = "<input name='name' placeholder='ФИО'>"
    }
}

class VisitCardiologist extends Visit{
    constructor(options){
        super(options);
        this.pressure = "<input name='pressure' placeholder='Обычное давление'>",
        this.bmi = "<input name='bmi' type='number' placeholder='Индекс массы тела'>",
        this.illnesses = "<input name='illnesses' placeholder='Перенесенные заболевания сердечно-сосудистой системы'>",
        this.age = "<input name='age' type='number' placeholder='Возраст'>"
    }
}

class VisitDentist extends Visit{
    constructor(options){
        super(options);
        this.lastVisit = "<input name='lastVisit' placeholder='Дата последнего посещения'>"
    }
}

class VisitTherapist extends Visit{
    constructor(options){
        super(options);
        this.age = "<input name='age' type='number' placeholder='Возраст'>"
    }
}

const login = new Modal("#loginWindow");
document.querySelector("#login_btn").addEventListener("click", () => login.show());

const logInField = document.querySelector("input[name='login']"); 
const passwordField = document.querySelector("input[name='password']");

document.querySelector("#log_in").addEventListener("click", async function(){ //Авторизация
    fetch("https://ajax.test-danit.com/api/v2/cards/login", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ email: logInField.value, password: passwordField.value })
})
  .then(response => response.text())
  .then(token => {
    if(token.length !== 36 || token[8] !== "-" || token[13] !== "-" || token[18] !== "-" || token[23] !== "-"){ //Верификация ключа
        
        return alert("Неверный логин или пароль"); 
    }

    //Если формат ключа правильный:
        let personalToken = token;
        login.simpleHide();
        document.querySelector("input[name='login']").value = document.querySelector("input[name='password']").value = "";
        
        document.querySelector("#login_btn").style.display = "none";
        const createVisit = document.createElement("button");
        createVisit.innerHTML = "Создать визит";
        createVisit.classList.add("nav__btn");
        document.querySelector("nav").append(createVisit);


        createVisit.addEventListener("click", async function(){  //Создаём модальное окно "Создать визит"
            const visit = new Modal("#visitWindow");
            const visitCardiologist = new VisitCardiologist();
            const visitDentist = new VisitDentist();
            const visitTherapist = new VisitTherapist();

            function reloadSelect(doctor){
                const visitWindow = document.querySelector("#visitWindow");
                visitWindow.querySelector(".selectVisitDetails").innerHTML = "";
                for(key in visitCardiologist){
                    console.log(doctor[key])
                    visitWindow.querySelector(".selectVisitDetails").innerHTML += doctor[key]
                }
            }
            
            reloadSelect(visitCardiologist);
            
            document.querySelector("#selectVisit").addEventListener("click", () =>{
                console.log(document.querySelector("#selectVisit").value);
                switch (document.querySelector("#selectVisit").value) {
                    case "Визит к кардиологу": 
                        reloadSelect(visitCardiologist);
                        break;

                    case "Визит к стоматологу": 
                        reloadSelect(visitDentist);
                        break;

                    case "Визит к терапевту": 
                        reloadSelect(visitTherapist);
                        break;
                
                    default:
                        break;
                }
            })
            visit.show();
        })
})

})


