AllCards=document.querySelectorAll('.flip-card');
let timeEle=document.getElementById('time')
let flipsEle=document.getElementById('flips')
let cardOne=null
let cardTwo=null
let disableDeck=false;
let matches=0;
let flips=0;
let time=0;
let pause=true;
function getTime() {
    if(pause===false){
        time++;
        if(time < 10){
            timeEle.innerText=`Time:0${time}s`
        }
        else{
            timeEle.innerText=`Time:${time}s`
        }
    }
    else{
       return
    }
    
}
setInterval(getTime,1000);
function suffleCard() {
    // console.log(Game Start)
    timeEle.innerText="Time:00s"
    flipsEle.innerText="flips:00"
    cardOne=null
    cardTwo=null
    disableDeck=false;
    matches=0;
    pause=false;
    time=0;
    flips=0;
    let arr=[1,2,3,4,5,6,1,2,3,4,5,6];
    arr.sort(() => Math.random() > 0.5 ? 1:-1);
    AllCards.forEach((card,index) => {
            let innerCard=card.querySelector(".flip-card-inner");
            innerCard.classList.remove("flip");
            let imgtag=card.querySelectorAll('img')[1];
            imgtag.src=`img/${arr[index]}.jpg`;
            card.addEventListener("click", flipCard);
    });
}

function matchedCard(img1,img2) {
    if(img1===img2){
        flips++;
        matches++;
        if(matches===6){
            timeEle.innerText=`Time:${time}s`
            flipsEle.innerText=`flips:${flips}`
            pause=true
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne=null;
        cardTwo=null;
        disableDeck=false;
    }
    else{
        flips++;
        setTimeout(() =>{
          cardOne.classList.add("shake");
          cardTwo.classList.add("shake");
        },400);
        setTimeout(() =>{
          cardOne.classList.remove("shake");
          cardTwo.classList.remove("shake");
          let cardOneInner=cardOne.querySelector(".flip-card-inner");
          let cardTwoInner=cardTwo.querySelector(".flip-card-inner");
          cardOneInner.classList.remove("flip");
          cardTwoInner.classList.remove("flip");
          cardOne=null;
          cardTwo=null;
          disableDeck=false;
        },1200)
    }
}
function flipCard(event) {
    let innerCard=event.target.parentElement.parentElement
    let card=event.target.parentElement.parentElement.parentElement
    if(card !==cardOne && !disableDeck){
    innerCard.classList.add("flip");
    if(cardOne===null){
        cardOne=card;
    }
    else{
    cardTwo=card;
    disableDeck=true;
    let img1=cardOne.querySelectorAll('img')[1].src;
    let img2=cardTwo.querySelectorAll('img')[1].src;
    matchedCard(img1,img2);
    }
}
}
AllCards.forEach(card => {
    card.addEventListener("click", flipCard);
})