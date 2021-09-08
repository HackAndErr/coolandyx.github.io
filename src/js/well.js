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
        this.priority = `Срочность визита: <select id='visitPriority' name="visitPriority" placeholder="Срочность визита">
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

// переменные для глобально использования
let visit
let saveIdCards ;

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

        login.simpleHide();
        document.querySelector("input[name='login']").value = document.querySelector("input[name='password']").value = "";

        document.querySelector("#login_btn").style.display = "none";
        const createVisit = document.createElement("button");
        createVisit.innerHTML = "Создать визит";
        createVisit.classList.add("nav__btn");
        document.querySelector("nav").append(createVisit);


        createVisit.addEventListener("click", async function(){  //Создаём модальное окно "Создать визит"
            visit = new Modal("#visitWindow"); //Саенко(с)
            const visitCardiologist = new VisitCardiologist;
            const visitDentist = new VisitDentist;
            const visitTherapist = new VisitTherapist;

            function reloadSelect(doctor){
                const visitWindow = document.querySelector("#visitWindow");
                visitWindow.querySelector(".selectVisitDetails").innerHTML = "";
                for(key in visitCardiologist){
                    visitWindow.querySelector(".selectVisitDetails").innerHTML += doctor[key]
                }
            }
            
            reloadSelect(visitCardiologist);
            
            document.querySelector("#selectVisit").addEventListener("click", () =>{
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

      // Отправка и рендер карточки
      document.querySelector("#createVisit").addEventListener("click", async function (){
          let dataToSend = {};

          for(key of document.querySelector(".selectVisitDetails").children){
              dataToSend[key.name] = key.value
          }
          fetch("https://ajax.test-danit.com/api/v2/cards", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(dataToSend)
          })
              .then(response => response.json())
              .then(response => {
                  saveIdCards = response.id;

                  createDivCards()
                  clickOnCloseBtn(token);

                  for (let i in response) {
                      if (response[i].length !==0 ){

                          let wrapperCards = document.querySelectorAll(".wrapper-cards")
                          const el = wrapperCards[wrapperCards.length-1]
                          el.insertAdjacentHTML(
                              "beforeend" ,
                              `<li class="text-in-cards"> ${i + " " + ":" + response[i] + '\n'}</li>`);
                      }
                  }
                  visit.simpleHide();
              })

      })

})
})

// функция создания карточки
function createDivCards () {
    let divForCard = document.createElement("div");
    divForCard.classList.add("wrapper-cards");
    divForCard.id = `${saveIdCards}`;

    let domId = document.getElementById("new_cards");
    domId.append(divForCard);

    let deleteButton = document.querySelectorAll('.wrapper-cards');
    const el = deleteButton[deleteButton.length-1]
    el.insertAdjacentHTML(
        "beforeend" ,
        `<span class="closeBtn" >&times;</span>`)
}

// функция удаления карточки
let clearBtn = document.getElementsByClassName("closeBtn")
function clickOnCloseBtn (token){

        for (let i of clearBtn){
        i.addEventListener("click", async (event) => {
            let target = event.target;
            let catchId = target.parentElement.id
            let idToNumber = Number(catchId);
            let getId = document.getElementById(catchId)

                fetch(`https://ajax.test-danit.com/api/v2/cards/${idToNumber}`,{
                    method: 'DELETE',
                    headers: {'Authorization':`Bearer ${token}`}
                })
                .then(r =>{
                    getId.remove();
                });
        });
}}


