import {num_word} from "./helpers.js";

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
 

const timesForward = ["18:00", "18:30","18:45","19:00","19:15","21:00"]; 
const timesBack = [ "18:30","18:45","19:00","19:15", "19:35","21:50","21:55"]; 
const minTimesArray = [];

timesBack.forEach(time => {
    minTimesArray.push(convertH2M(time));
});

console.log("Minutes array", minTimesArray);

timeBack.style.display = "none";




const removeChilds = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};


route.addEventListener("change", () => {
    summary.innerHTML = "";
    if(route.value === "из A в B и обратно в А") {
        timeBack.style.display = "block";
        travelBack = true;
        travelTime += 50;

        travelMinutes = travelTime % 60;
        travelHours = `${Math.floor(travelTime / 60)} ${num_word(travelHours, ["часов", "часа", "час"])}`;

    }

    else if (route.value === "из A в B") {
        removeChilds(departureTime);
        timesForward.forEach(timeForward => {
            const timeOption = document.createElement("option");
            timeOption.innerHTML = `${timeForward} (из A в B)`;
            departureTime.appendChild(timeOption);
        })
        travelTime = 50;
        travelBack = false;
        timeBack.style.display = "none";
        travelMinutes = travelTime;
        travelHours = "";

    }
    
    
    else {
        removeChilds(departureTime);
        travelTime = 50;
        travelBack = false;
        timeBack.style.display = "none";
        travelMinutes = travelTime;
        travelHours = "";

        timesBack.forEach(timeBack => {
            const timeOption = document.createElement("option");
            timeOption.innerHTML = `${timeBack}(из B в A)`;
            departureTime.appendChild(timeOption);
        })
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

    let timeInMinutes = convertH2M(timeAsString);
    timeInMinutes+=50;

    console.log("Time in minutes" , timeInMinutes);

        minTimesArray.forEach((time) => {
            console.log(time);
            if(time > timeInMinutes) {
                sortedTimes.push(time);
            }
        });

        console.log("New array ", sortedTimes);

        // let m = timeInMinutes % 60;
        // let h = (timeInMinutes-m)/60;
        
        // const arrTime = (h < 10 ? "0" : "") + h.toString() + ":" + (m < 10 ? "0" : "") + m.toString();
    
        // console.log("Ship departure time is", arrTime);
        
    
    sortedTimes.forEach(sortedTime => {

        let m = sortedTime % 60;
        let h = (sortedTime-m)/60;
        
        let HHMM = (h < 10 ? "0" : "") + h.toString() + ":" + (m < 10 ? "0" : "") + m.toString();
        console.log("Modified time", HHMM);

        const timeOption = document.createElement("option");
        timeOption.innerHTML = `${HHMM}(из B в A)`;
        travelBackTime.appendChild(timeOption);

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
            ticketPrice = 700;
            travelMinutes = travelTime;
            travelHours = "";
        }   
        ticketPrice = 1200;
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

    // let departureTime1 = departureTime.value.substring(0, departureTime.value.indexOf("(").toString());

    let timeAsString = departureTime.value.substring(0, departureTime.value.indexOf("(").toString());

    let timeInMinutes = convertH2M(timeAsString);

    
    let m = timeInMinutes % 60;
    let h = (timeInMinutes-m)/60;
    
    const depTime = (h < 10 ? "0" : "") + h.toString() + ":" + (m < 10 ? "0" : "") + m.toString();

    let shipArrivalTime = timeInMinutes + 50;

    let arrMin = shipArrivalTime % 60;
    let arrHour = (shipArrivalTime-arrMin)/60;

    let shipArrivalTimeTotal = (arrHour < 10 ? "0" : "") + arrHour.toString() + ":" + (arrMin < 10 ? "0" : "") + arrMin.toString();
        // const travelBack = travelBackTime.value.substring(0, travelBackTime.value.indexOf("(").toString());
        // let arrivalTimeMinutes = convertH2M(travelBack);
        // if(travelBack) {
        //     arrivalTimeMinutes+=50;
        // }

        // let minArrival = arrivalTimeMinutes % 60;
        // let hArrival = (arrivalTimeMinutes-minArrival)/60;
        
        // const arrTime = (hArrival < 10 ? "0" : "") + hArrival.toString() + ":" + (minArrival < 10 ? "0" : "") + minArrival.toString();

    summary.innerHTML += `Вы выбрали <b>${ticketsAmount.value} ${num_word(ticketsAmount.value, ["билет", "билета", "билетов"])}</b> по маршруту <b>${route.value}</b> стоимостью <b>${ticketPrice}р</b>.
    <br>
    Это путешествие займет у вас <b>${travelHours} ${travelMinutes} минут</b>.
    <br>
    Теплоход  отправляется в <b>${depTime}</b>, а прибудет в <b>${shipArrivalTimeTotal}.</b>  
    `
    ;


})


