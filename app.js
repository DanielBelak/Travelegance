//WELCOME VIDEO//
const welcomeVideo = document.querySelector(".intro");
const mainPage = document.querySelector(".main-page");
const continueBtn = document.querySelector(".continue-link");
const body = document.querySelector("body");
if (!document.cookie) {
  welcomeVideo.style.display = "block";
  body.style.overflowY = "hidden";
  document.cookie = "visited";
} else {
  mainPage.style.visibility = "visible";
}

continueBtn.addEventListener("click", () => {
  welcomeVideo.classList.add("fadeout");
  body.style.overflowY = "scroll";
});
welcomeVideo.addEventListener("animationend", () => {
  welcomeVideo.style.display = "none";
  mainPage.style.visibility = "visible";
  mainPage.classList.add("fadein");
});

//NAVBAR SCROLL//
const header = document.querySelector("header");
const navbar = document.querySelector(".main-nav-list");
const observer = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {});
});

observer.observe(header);

window.addEventListener("scroll", function () {
  let header = document.querySelector("header");
  let scrollPosition = window.scrollY > 20;
  header.classList.toggle("header-active", scrollPosition);
  navbar.classList.toggle("navbar-active", scrollPosition);
});
//BURGER MENU//
const burger = document.querySelector(".burger");

burger.addEventListener("click", () => {
  navbar.classList.toggle("flex");
});
//TYPING EFFECT//

const typingText = document.querySelector(".typing");
const word = ["view", "life", "story"];
const letterDelay = 100;
const wordDelay = 2000;
let wordIndex = 0;
let letterIndex = 0;

function type() {
  if (letterIndex < word[wordIndex].length) {
    typingText.textContent += word[wordIndex].charAt(letterIndex);
    letterIndex++;
    setTimeout(type, letterDelay);
  } else {
    setTimeout(erase, wordDelay);
  }
}
function erase() {
  if (letterIndex > 0) {
    typingText.textContent = word[wordIndex].substring(0, letterIndex - 1);
    letterIndex--;
    setTimeout(erase, letterDelay);
  } else {
    wordIndex++;
    if (wordIndex >= word.length) wordIndex = 0;
    setTimeout(type, letterDelay + 1000);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (word.length) setTimeout(type, wordDelay);
});

//CAROUSEL//
{
  const config = {
    type: "carousel",
    autoplay: "5000",
    animationDuration: "2000",
  };
  new Glide(".glide", config).mount();
}

//QUIZ//
const rewardButton = document.querySelector(".reward");
const nextButton = document.querySelector(".next");
const overlay = document.querySelector(".overlay");
const scratch = document.querySelector(".scratch");
const popUp = document.querySelector(".pop-up-quiz");

rewardButton.addEventListener("click", () => {
  overlay.classList.add("active");
  popUp.classList.add("active");
});

let question = document.querySelector(".question");
let options = document.querySelector(".options");
const questionSet = [
  {
    question: "What country is not a part of Scandinavia?",
    answers: [
      { text: "Finland", correct: false },
      { text: "Sweden", correct: false },
      { text: "Iceland", correct: false },
      { text: "Poland", correct: true },
    ],
  },
  {
    question: "What is the capital of Germany?",
    answers: [
      { text: "Berlin", correct: true },
      { text: "Frankfurt", correct: false },
      { text: "Munich", correct: false },
      { text: "Hamburg", correct: false },
    ],
  },
  {
    question: "Which continent does Madagascar belong to?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Africa", correct: true },
      { text: "Australia", correct: false },
      { text: "South America", correct: false },
    ],
  },
  {
    question: "Which is the longest river in the world?",
    answers: [
      { text: "Kongo", correct: false },
      { text: "Amazon", correct: false },
      { text: "Nile", correct: true },
      { text: "Danube", correct: false },
    ],
  },
  {
    question: "What is the biggest country in the world?",
    answers: [
      { text: "Canada", correct: false },
      { text: "Russia", correct: true },
      { text: "India", correct: false },
      { text: "China", correct: false },
    ],
  },
  {
    question: "What colour is not on the flag of Jamaica?",
    answers: [
      { text: "green", correct: false },
      { text: "white", correct: true },
      { text: "yellow", correct: false },
      { text: "black", correct: false },
    ],
  },
  {
    question: "What is the currency of Norway?",
    answers: [
      { text: "rupee", correct: false },
      { text: "dollar", correct: true },
      { text: "euro", correct: false },
      { text: "crown", correct: true },
    ],
  },
  {
    question: "What is the official language of Brazil?",
    answers: [
      { text: "English", correct: false },
      { text: "French", correct: false },
      { text: "Portuguese", correct: true },
      { text: "Spanish", correct: false },
    ],
  },
];

let randomQuestion = Math.floor(Math.random() * questionSet.length);

function generateQuestion() {
  question.innerText = questionSet[randomQuestion].question;
}

function generateAnswers() {
  options.style.pointerEvents = "all";
  nextButton.style.display = "none";
  questionSet[randomQuestion].answers.forEach((answer) => {
    const reply = document.createElement("div");
    reply.innerText = answer.text;
    reply.classList.add("option");
    options.appendChild(reply);
    if (answer.correct) {
      reply.classList.add("true");
    }
  });
}

options.addEventListener("click", (e) => {
  if (e.target.classList.contains(true)) {
    e.target.classList.add("correct");
    rewardButton.style.display = "block";
  } else {
    if (e.target.classList.contains("option")) {
      e.target.classList.add("incorrect");
      nextButton.style.display = "block";
      options.style.pointerEvents = "none";
    }
  }
});

nextButton.addEventListener("click", () => {
  question.innerText = "";
  options.innerText = "";
  randomQuestion = Math.floor(Math.random() * questionSet.length);
  generateQuestion();
  generateAnswers();
});

generateQuestion();
generateAnswers();

//ERASER//
const closeButton = document.querySelectorAll(".close");
const eraseArea = document.querySelector(".scratch");
eraseArea.addEventListener("mousemove", (e) => {
  const eraser = document.createElement("span");
  eraser.classList.add("eraser");
  eraser.style.top = -35 + e.offsetY + "px";
  eraser.style.left = -35 + e.offsetX + "px";
  eraseArea.appendChild(eraser);
});
if (closeButton) {
  closeButton.forEach((button) => {
    button.addEventListener("click", () => {
      overlay.classList.remove("active");
      popUp.style.display = "none";
      rewardButton.style.pointerEvents = "none";
      options.style.pointerEvents = "none";
    });
  });
}
//MAP//
fetch("./subpages/map.html")
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    document.querySelector(".map").innerHTML = data;
    let continents = document.querySelector("#continents");
    let clickTarget = null;

    continents.addEventListener("click", function (e) {
      let clickTarget = e.target.parentElement.dataset.d;
      localStorage.setItem("continent", clickTarget);
      window.location.href = "./subpages/tours.html";
    });
  });

//WEATHER//

let london = 2643743;
let sydney = 6619279;
let newYork = 5128581;
let tokyo = 1850147;
const apiKey = config.API_KEY;
function toCelsius(kelvin) {
  return Math.floor(kelvin - 273);
}

function getWeather(cityID, selector) {
  let weatherIcon = document.querySelector(`.${selector} .icon-weather`);
  let temperature = document.querySelector(`.${selector} .degree`);
  let description = document.querySelector(`.${selector} .description`);
  let city = document.querySelector(`.${selector} .location`);
  let api = `http://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=${apiKey}`;
  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      weatherIcon.innerHTML = `<img src="./img/weather-icons/${data.weather[0].icon}.png" alt="weather icon">`;
      temperature.innerHTML = toCelsius(data.main.temp);
      description.innerHTML = data.weather[0].description;
      city.innerHTML = data.name;
    });
}
getWeather(london, "london");
getWeather(tokyo, "tokyo");
getWeather(sydney, "sydney");
getWeather(newYork, "new-york");
