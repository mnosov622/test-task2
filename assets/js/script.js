const cardTimes = document.querySelector(".card__times");
const timesAvailable = cardTimes.querySelectorAll(".card__time-available");
const hiddenTimes = cardTimes.querySelector(".card__hidden-times");
const expandTimesBtn = cardTimes.querySelector(".card__moreTimes-btn");

const amountOfTimes = timesAvailable.length;
const hiddenTimesArray = [];
if(expandTimesBtn) {
    expandTimesBtn.style.display = "flex";
}

if(amountOfTimes > 4 ) {
    console.log("More");   
    for(let i=4; i< amountOfTimes; i++) {
        console.log(timesAvailable[i] || "No times");
        timesAvailable[i].style.display = "none";
        // timesAvailable[i].className = ""
        hiddenTimesArray.push(timesAvailable[i]);
        hiddenTimes.appendChild(timesAvailable[i]);
        // console.log(timesAvailable[timesAvailable.length - 1]);
    }
}

else {
    console.log("it's okay");
}

console.log(hiddenTimesArray);

if(expandTimesBtn) {

    expandTimesBtn.addEventListener('click', () => {
        for(let i=0; i<amountOfTimes; i++) {
            timesAvailable[i].style.display = "flex";
        }
        
        hiddenTimes.classList.add("expand-cards");
    })
}