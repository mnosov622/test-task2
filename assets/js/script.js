
const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    const cardTimesAvailable = card.querySelectorAll(".card__times-available");

    cardTimesAvailable.forEach(cardTimeAvailable => {
        const timeCards = cardTimeAvailable.querySelectorAll(".card__time-available");
        const expandMoreBtn = cardTimeAvailable.querySelector(".card__moreTimes-btn");
        const hiddenTimes = cardTimeAvailable.querySelectorAll(".card__times-hidden");

        const hiddenTimesArray = [];
        
        if(timeCards.length > 3 && expandMoreBtn) {
            expandMoreBtn.style.display = "block";
            console.log("cards more than 3");
            for(let i = 3; i < timeCards.length; i++) {
                hiddenTimesArray.push(timeCards[i]);
                
                hiddenTimes.forEach(hidden => {
                    hidden.appendChild(timeCards[i]); 
                    hidden.style.display = "none";  
                })
            }
            
            
        }

        expandMoreBtn.addEventListener("click", () => {
        expandMoreBtn.style.display = "none";
        card.classList.add('add-height');
        hiddenTimes.forEach(hiddenTime => {
            hiddenTime.classList.add("open-hidden-cards");
            hiddenTime.style.display = "flex";
        })
    })
    
    console.log("Hidden times" , hiddenTimes);
})

})