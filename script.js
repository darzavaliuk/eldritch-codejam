import ancientsData from "./data/ancients.js";
// import ancients from "./data/ancients.js"
import difficulties from "./data/difficulties.js";
import cardsDataGreen from "./data/mythicCards/green/index.js";
import cardsDataBrown from "./data/mythicCards/brown/index.js";
import cardsDataBlue from "./data/mythicCards/blue/index.js";

let levels = document.getElementById("doma");
let cards = document.getElementById("cards");
let counter = document.getElementById("counter");
let difficult = "easy";
let images = document.getElementById("images");
let backgroun = document.getElementById("img-background");
let greenCard = [];
let arrNewNew = [];
let j = 0;
let mix = document.querySelector(".button-title");
let level = "";

console.log(levels);

window.addEventListener("load", loadWind);

console.log(difficulties);

function loadWind() {
    for (let i = 0; i < difficulties.length; i++) {
        let newNode = document.createElement("span");
        newNode.id = difficulties[i].id;
        newNode.textContent = difficulties[i].name + "\n";
        levels.appendChild(newNode);
    }

    for (let i = 0; i < ancientsData.length; i++) {
        let newNode = document.createElement("img");
        newNode.src = ancientsData[i].cardFace;
        newNode.id = ancientsData[i].id;
        newNode.className = ancientsData[i].name;
        cards.appendChild(newNode);
    }

    document.getElementById("easy").classList.add("tick");
}

let prevDif = "easy";

mix.addEventListener("click", (e) => {
    if (level) {
        backgroun.style.visibility = "visible";
        counter.innerHTML = "";
        images.innerHTML = "";
        j = 0;
        let greenCard = [];
        let blueCard = [];
        let brownCard = [];
        for (let i = 0; i < ancientsData.length; i++) {
            if (level == ancientsData[i].id) {
                var firstStage = ancientsData[i].firstStage;
                var secondStage = ancientsData[i].secondStage;
                var thirdStage = ancientsData[i].thirdStage;
                var typesOfCards = [Object.keys(firstStage)];
                var typesOfStages = [firstStage, secondStage, thirdStage];
            }
        }

        var counterGreen = 0;
        var counterBlue = 0;
        var counterBrown = 0;
        let i = 0;
        for (let obj of typesOfStages) {
            let newNode0 = document.createElement("p");
            newNode0.id = `blueCards__title${i}`;
            newNode0.innerText = `Stage ` + (i + 1);
            counter.appendChild(newNode0);

            let newNode = document.createElement("p");
            counterBlue += obj.blueCards;
            newNode.id = "blueCards" + i;
            newNode.innerText = obj.blueCards;
            newNode.className = "circle-blue";
            counter.appendChild(newNode);

            let newNode2 = document.createElement("p");
            newNode2.innerText = obj.greenCards;
            counterGreen += obj.greenCards;
            newNode2.id = "greenCards" + i;
            newNode2.className = "circle-green";
            counter.appendChild(newNode2);

            let newNode3 = document.createElement("p");
            counterBrown += obj.brownCards;
            newNode3.id = "brownCards" + i;
            newNode3.className = "circle-brown";
            newNode3.innerText = obj.brownCards;
            counter.appendChild(newNode3);
            i++;
        }

        for (let obf of cardsDataGreen) {
            obf.difficulty.forEach((e) => {
                e == difficult ? complte(obf, greenCard) : "";
            });
        }

        for (let obf of cardsDataBlue) {
            obf.difficulty.forEach((e) => {
                e == difficult ? complte(obf, blueCard) : "";
            });
        }

        for (let obf of cardsDataBrown) {
            obf.difficulty.forEach((e) => {
                e == difficult ? complte(obf, brownCard) : "";
            });
        }

        function complte(obf, obj) {
            // console.log(obf.cardFace);
            let newNode = document.createElement("img");
            newNode.src = obf.cardFace;
            newNode.id = obf.id;
            newNode.className = obf.color;
            obj.push(newNode);
        }

        let addNewGreen = [];
        let addNewBlue = [];
        let addNewBrown = [];

        if (greenCard.length < counterGreen) {
            if (difficult == "very-easy") {
                for (let obf of cardsDataGreen) {
                    obf.difficulty.forEach((e) =>
                        e == "add-easy" ? complte(obf, addNewGreen) : ""
                    );
                }
            }

            if (difficult == "very-hard") {
                for (let obf of cardsDataGreen) {
                    obf.difficulty.forEach((e) =>
                        e == "add-hard" ? complte(obf, addNewGreen) : ""
                    );
                }
            }
        }

        if (brownCard.length < counterBrown) {
            if (difficult == "very-easy") {
                for (let obf of cardsDataBrown) {
                    obf.difficulty.forEach((e) =>
                        e == "add-easy" ? complte(obf, addNewBrown) : ""
                    );
                }
            }

            if (difficult == "very-hard") {
                for (let obf of cardsDataBrown) {
                    obf.difficulty.forEach((e) =>
                        e == "add-hard" ? complte(obf, addNewBrown) : ""
                    );
                }
            }
        }

        if (blueCard.length < counterBlue) {
            if (difficult == "very-easy") {
                for (let obf of cardsDataBlue) {
                    obf.difficulty.forEach((e) =>
                        e == "add-easy" ? complte(obf, addNewBlue) : ""
                    );
                }
            }

            if (difficult == "very-hard") {
                for (let obf of cardsDataBlue) {
                    obf.difficulty.forEach((e) =>
                        e == "add-hard" ? complte(obf, addNewBlue) : ""
                    );
                }
            }
        }

        let shuffle = (greenCard) => {
            return greenCard.sort(() => Math.round(Math.random() * 100) - 50);
        };

        // let arr2 = shuffle(addNew);
        function writeArr(greenCard, counterGreen, addNewGreen) {
            let arr = [];
            while (greenCard.length < counterGreen)
                greenCard.push(
                    addNewGreen[Math.floor(Math.random() * greenCard.length)]
                );
            arr = shuffle(greenCard);
            arr = arr.slice(0, counterGreen);
            // arr.forEach((e) => images.appendChild(e));
            console.log(arr);
            return arr;
        }

        let arrGreen = writeArr(greenCard, counterGreen, addNewGreen);
        let arrBlue = writeArr(blueCard, counterBlue, addNewBlue);
        let arrBrown = writeArr(brownCard, counterBrown, addNewBrown);

        let arr = [];
        arr.push(...arrGreen.splice(0, firstStage.greenCards));
        arr.push(...arrBlue.splice(0, firstStage.blueCards));
        arr.push(...arrBrown.splice(0, firstStage.brownCards));
        arr = shuffle(arr);
        console.log(arr);
        // arr.forEach((e) => images.appendChild(e));

        let arr2 = [];
        arr2.push(...arrGreen.splice(0, secondStage.greenCards));
        arr2.push(...arrBlue.splice(0, secondStage.blueCards));
        arr2.push(...arrBrown.splice(0, secondStage.brownCards));
        arr2 = shuffle(arr2);
        console.log(arr2);
        // arr2.forEach((e) => images.appendChild(e));

        let arr3 = [];
        arr3.push(...arrGreen.splice(0, thirdStage.greenCards));
        arr3.push(...arrBlue.splice(0, thirdStage.blueCards));
        arr3.push(...arrBrown.splice(0, thirdStage.brownCards));
        arr3 = shuffle(arr3);
        console.log(arr3);
        arrNewNew = [];
        // arr3.forEach((e) => images.appendChild(e));
        arrNewNew = [...arr, ...arr2, ...arr3];
        console.log(arrNewNew);

        window.clickBack = clickBack;

        function clickBack() {
            if (j < arrNewNew.length) {
                backgroun.style.visibility = "visible";
                images.innerHTML = "";
                images.appendChild(arrNewNew[j]);
                if (j < arr.length) {
                    console.log(`${arrNewNew[j].className}Cards0`);
                    document.getElementById(
                        `${arrNewNew[j].className}Cards0`
                    ).innerText -= 1;
                    document
                        .getElementById(`blueCards__title0`)
                        .classList.add("reds");
                } else if (j < arr.length + arr2.length) {
                    // console.log(`${arrNewNew[j].className}Cards1`);
                    document.getElementById(
                        `${arrNewNew[j].className}Cards1`
                    ).innerText -= 1;
                    document
                        .getElementById(`blueCards__title0`)
                        .classList.remove("reds");
                    document
                        .getElementById(`blueCards__title1`)
                        .classList.add("reds");
                } else if (j < arr.length + arr2.length + arr3.length) {
                    // console.log(`${arrNewNew[j].className}Cards2`);
                    document.getElementById(
                        `${arrNewNew[j].className}Cards2`
                    ).innerText -= 1;
                    document
                        .getElementById(`blueCards__title2`)
                        .classList.add("reds");
                    document
                        .getElementById(`blueCards__title1`)
                        .classList.remove("reds");
                    if (j == arr.length + arr2.length + arr3.length - 1) {
                        backgroun.style.visibility = "hidden";
                    }
                }
                j = j + 1;
                // console.log(j);
            } else {
                backgroun.style.visibility = "hidden";
            }
        }
    }
});

levels.addEventListener("click", (e) => {
    counter.innerHTML = "";
    backgroun.style.visibility = "hidden";
    // counter.innerHTML = "";
    images.innerHTML = "";
    j = 0;
    for (let i = 0; i < difficulties.length; i++) {
        if (e.target.id == difficulties[i].id) {
            difficult = difficulties[i].id;
        }
    }

    console.log(e.target.id);
    if (prevDif != "")
        document.getElementById(prevDif).classList.remove("tick");
    document.getElementById(e.target.id).classList.add("tick");
    prevDif = e.target.id;
    console.log(difficult);
});

let prevCard = "";

cards.addEventListener("click", (e) => {
    counter.innerHTML = "";
    images.innerHTML = "";
    backgroun.style.visibility = "hidden";
    level = e.target.id;
    document.getElementById(level).classList.add("reds");
    if (prevCard != "" && prevCard != level)
        document.getElementById(prevCard).classList.remove("reds");
    prevCard = level;
});
