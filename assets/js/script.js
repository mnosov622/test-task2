// const cardTimes = document.querySelectorAll(".card__times-available");
// cardTimes.forEach(cardTime => {
//     const timesAvailable = cardTime.querySelectorAll(".card__time-available");
//     const hiddenTimes = cardTime.querySelector(".card__hidden-times");
//     const expandTimesBtn = cardTime.querySelector(".card__moreTimes-btn");
    
//     const amountOfTimes = timesAvailable.length;

    
// const hiddenTimesArray = [];
// if(expandTimesBtn) {
//     expandTimesBtn.style.display = "flex";
// }

// if(amountOfTimes > 4 ) {
//     console.log("More");   
//     for(let i=4; i< amountOfTimes; i++) {
//         console.log(timesAvailable[i] || "No times");
//         timesAvailable[i].style.display = "none";
//         // timesAvailable[i].className = ""
//         hiddenTimesArray.push(timesAvailable[i]);
//         hiddenTimes.appendChild(timesAvailable[i]);
//         // console.log(timesAvailable[timesAvailable.length - 1]);
//     }
// }

// else {
//     console.log("it's okay");
// }

// console.log(hiddenTimesArray);

// if(expandTimesBtn) {

//     expandTimesBtn.addEventListener('click', () => {
//         for(let i=0; i<amountOfTimes; i++) {
//             timesAvailable[i].style.display = "flex";
//         }
        
//         hiddenTimes.classList.add("expand-cards");
//     })
// }

// })

const cardTimesAvailable = document.querySelectorAll(".card__times-available");
cardTimesAvailable.forEach(cardTimeAvailable => {
    const timeCards = cardTimeAvailable.querySelectorAll(".card__time-available");
    const expandMoreBtn = cardTimeAvailable.querySelector(".card__moreTimes-btn");
    const hiddenTimes = cardTimeAvailable.querySelectorAll(".card__times-hidden");

    const hiddenTimesArray = [];

    if(timeCards.length > 4 && expandMoreBtn) {
        expandMoreBtn.style.display = "block";
        for(let i=4; i < timeCards.length; i++) {
            hiddenTimesArray.push(timeCards[i]);
            timeCards[i].style.display = "block";
            
            hiddenTimes.forEach(hidden => {
                hidden.appendChild(timeCards[i]);   
            })
        }
        expandMoreBtn.addEventListener("click", () => {
            hiddenTimes.classList.add("open-hidden-cards");
        })
        
    }


    console.log("Hidden times" , hiddenTimes);
})
