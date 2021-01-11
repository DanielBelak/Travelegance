//VOTE//
const options = document.querySelectorAll(".vote-card");
const votes = document.querySelectorAll(".number");
const beachScore = document.querySelector(".beach-number");
const cityScore = document.querySelector(".city-number");
const mountainScore = document.querySelector(".mountain-number");
let goal;
let score = {
  beach: 0,
  city: 0,
  mountain: 0,
};
if (localStorage.getItem("score")) {
  score = JSON.parse(localStorage.getItem("score"));
  console.log(score);
  beachScore.innerHTML = score.beach;
  cityScore.innerHTML = score.city;
  mountainScore.innerHTML = score.mountain;
}

function vote() {
  options.forEach((option) => {
    option.addEventListener("click", (e) => {
      goal = e.target.dataset.type;
      voteOnce();
    });
  });
}
vote();

function voteOnce() {
  if (sessionStorage.getItem("voted") === null) {
    score[goal] += 1;
    beachScore.innerHTML = score.beach;
    cityScore.innerHTML = score.city;
    mountainScore.innerHTML = score.mountain;
    sessionStorage.setItem("voted", true);
    localStorage.setItem("score", JSON.stringify(score));
  } else {
    alert("You can vote only once");
  }
}
