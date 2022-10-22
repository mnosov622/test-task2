import {numWord, convertH2M, removeChilds} from "./helpers.js";



const timeBack = document.querySelector(".tickets__time-back");
const ticketsForm = document.querySelector(".tickets__form");
const summary = document.querySelector(".summary");
const route = document.querySelector("#route");
const departureTime = document.querySelector("#time");
const travelBackTime = document.querySelector("#time1");
const ticketsAmount = document.querySelector("#num");
const localZone = document.querySelector("#local");
const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

localZone.innerHTML = localTimeZone;

let ticketPrice = 700;
let travelTime = 50;
let travelBack = false;
let travelMinutes = "";
let travelHours = "";
let sortedTimes = [];
timeBack.style.display = "none";


const timesForward = ["18:00", "18:30","18:45","19:00","19:15","21:00"]; 
const timesBack = [ "18:30","18:45","19:00","19:15", "19:35","21:50","21:55"]; 
const minTimesArray = [];

timesBack.forEach(time => {
    minTimesArray.push(convertH2M(time));
});


route.addEventListener("change", () => {
    summary.innerHTML = "";
    if(route.value === "из A в B и обратно в А") {
        timeBack.style.display = "block";
        travelBack = true;
        travelTime += 50;

        travelMinutes = travelTime % 60;
        travelHours = `${Math.floor(travelTime / 60)} ${numWord(travelHours, ["часов", "часа", "час"])}`;
        removeChilds(departureTime);
        timesForward.forEach(timeForward => {
            const timeOption = document.createElement("option");
            timeOption.innerHTML = `${timeForward} (из A в B)`;
            departureTime.appendChild(timeOption);
        })

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


departureTime.addEventListener("change", (e) => {
    sortedTimes = [];
    removeChilds(travelBackTime);
    
    let timeAsString = departureTime.value.substring(0, departureTime.value.indexOf("(").toString());

    let timeInMinutes = convertH2M(timeAsString);
    timeInMinutes+=50;

    minTimesArray.forEach((time) => {
        if(time > timeInMinutes) {
                sortedTimes.push(time);
        }
    });
    
    sortedTimes.forEach(sortedTime => {

        let m = sortedTime % 60;
        let h = (sortedTime-m)/60;
        let HHMM = (h < 10 ? "0" : "") + h.toString() + ":" + (m < 10 ? "0" : "") + m.toString();

        const timeOption = document.createElement("option");
        timeOption.innerHTML = `${HHMM}(из B в A)`;
        travelBackTime.appendChild(timeOption);

    })
    
    if(sortedTimes.length === 0) {
        const timeOptionNotFound = document.createElement("option");
        timeOptionNotFound.innerHTML = "К сожалению, на выбранное время нет обратного теплохода";
        travelBackTime.style.disabled = true;
        travelBackTime.appendChild(timeOptionNotFound);
    }
        
})

    ticketsAmount.addEventListener("change", () => {
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

    let timeAsString = departureTime.value.substring(0, departureTime.value.indexOf("(").toString());
    let timeInMinutes = convertH2M(timeAsString);
    
    let m = timeInMinutes % 60;
    let h = (timeInMinutes-m)/60;
    const depTime = (h < 10 ? "0" : "") + h.toString() + ":" + (m < 10 ? "0" : "") + m.toString();

    let shipArrivalTime = timeInMinutes + 50;
    let arrMin = shipArrivalTime % 60;
    let arrHour = (shipArrivalTime-arrMin)/60;

    let shipArrivalTimeTotal = (arrHour < 10 ? "0" : "") + arrHour.toString() + ":" + (arrMin < 10 ? "0" : "") + arrMin.toString();

    summary.innerHTML += `Вы выбрали <b>${ticketsAmount.value} ${numWord(ticketsAmount.value, ["билет", "билета", "билетов"])}</b> по маршруту <b>${route.value}</b> стоимостью <b>${ticketPrice}р</b>.
    <br>
    Это путешествие займет у вас <b>${travelHours} ${travelMinutes} минут</b>.
    <br>
    Теплоход  отправляется в <b>${depTime}</b>, а прибудет в <b>${shipArrivalTimeTotal}.</b>  
    `
    ;

})


