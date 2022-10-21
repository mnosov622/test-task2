const timeSelector = document.querySelector(".tickets__time-select");
const destinationSelector = document.querySelector(".tickets__route");
const timeBack = document.querySelector(".tickets__time-back");
const countBtn = document.querySelector(".tickets__count-btn");
const ticketsForm = document.querySelector(".tickets__form");
const summary = document.querySelector(".summary");
const route = document.querySelector("#route");
const departureTime = document.querySelector("#time");
const travelBackTime = document.querySelector("#time1");
const ticketsAmount = document.querySelector("#num");

const selectTimeBack = document.querySelector(".tickets__back");

let ticketPrice = 700;
let travelTime = 50;
let travelBack = false;
let travelMinutes = "";
let travelHours = "";

function convertH2M(timeInHour){
    var timeParts = timeInHour.split(":");
    return Number(timeParts[0]) * 60 + Number(timeParts[1]);
  }
 

const timesForward = ["18:00", "18:30","18:45","19:00","19:15","21:00","21:00","21:30","22:00","22:30"]; 
const timesBack = [ "18:30","18:45","19:00","19:15","19:35","21:50","21:55"]; 
const minTimesArray = [];

timesBack.forEach(time => {
    minTimesArray.push(convertH2M(time));
});

console.log("Minutes array", minTimesArray);

timeBack.style.display = "none";

function num_word(value, words) {  
	value = Math.abs(value) % 100; 
	var num = value % 10;

	if(value > 10 && value < 20) {
        return words[2];
    } 

	if(num > 1 && num < 5) {
        return words[1];
    }

	if(num == 1) {
        return words[0];
    }

	return words[2];
}


const removeChilds = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};




route.addEventListener("change", () => {
    if(route.value === "из A в B и обратно в А") {
        timeBack.style.display = "block";
        travelBack = true;
        travelTime += 50;

        travelMinutes = travelTime % 60;
        travelHours = `${Math.floor(travelTime / 60)} ${num_word(travelHours, ["часов", "часа", "час"])}`;

    }
    
    
    else {
        travelTime = 50;
        travelBack = false;
        timeBack.style.display = "none";
        travelMinutes = travelTime;
        travelHours = "";
    }
})

console.log("Initial array", timesBack);
let sortedTimes = [];


  

departureTime.addEventListener("change", (e) => {
    sortedTimes = [];
    removeChilds(travelBackTime);
    
    let timeAsString = departureTime.value.substring(0, departureTime.value.indexOf("(").toString());

    let timeInMinutes = convertH2M(departureTime.value.substring(0, departureTime.value.indexOf("(")));

    console.log(timeInMinutes + 50);

    if(travelBack) {
        timesBack.forEach((time) => {
            if(time > timeAsString) {
                sortedTimes.push(time);
            }
        });

        console.log("New array ", sortedTimes);
    }
    
    
    sortedTimes.forEach(time => {
        const timeOption = document.createElement("option");
        timeOption.innerHTML = time;
        travelBackTime.appendChild(timeOption);

        console.log("Time option", timeOption);
    })

    if(sortedTimes.length === 0) {
        console.log("Nothing in ther");
        const timeOptionNotFound = document.createElement("option");
        timeOptionNotFound.innerHTML = "К сожалению, на выбранное время нет обратного поезда";
        travelBackTime.style.disabled = true;
        travelBackTime.appendChild(timeOptionNotFound);
    }
        
})

// function getTimeZone() {
//     return /\((.*)\)/.exec(new Date().toString())[1];
// }

// const date = new Date();
// document.querySelector('.time-label').innerHTML = getTimeZone(date);

// Вы выбрали 4 билета по маршруту из A в B стоимостью 4000р.
// Это путешествие займет у вас 40 минут. 
// Теплоход отправляется в 12-00, а прибудет в 18-00.

    ticketsAmount.addEventListener("change", () => {
        console.log("change");
        if(!travelBack) {
            price = 700;
            travelMinutes = travelTime;
            travelHours = "";
        }   
        price = 1200;
    })

ticketsForm.addEventListener("submit", (e)=> {
    e.preventDefault();
    summary.innerHTML = "";
    if(!travelBack) {
        ticketPrice = 700;
        travelTime = 50;
    }   
    
    else if (travelBack) {
        ticketPrice = 1200;
    }

    ticketPrice*=ticketsAmount.value;
    console.log(num_word(ticketsAmount,["билет", "билета", "билетов"]));
  
    summary.innerHTML += `Вы выбрали <b>${ticketsAmount.value} ${num_word(ticketsAmount.value, ["билет", "билета", "билетов"])}</b> по маршруту <b>${route.value}</b> стоимостью <b>${ticketPrice}р</b>.
    <br>
    Это путешествие займет у вас <b>${travelHours} ${travelMinutes} минут</b>.
    <br>
    `
    ;


})


