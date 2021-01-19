//BURGER//
const burger = document.querySelector(".burger");
const navbar = document.querySelector(".main-nav-list");

burger.addEventListener("click", () => {
  navbar.classList.toggle("flex");
  navbar.classList.toggle("navbar-active");
});
//POP-UP WINDOW//
{
  const openButton = document.querySelector(".try-btn");
  const closeButton = document.querySelectorAll(".close");
  const overlay = document.querySelector(".overlay");
  const popUp = document.querySelector(".pop-up");
  const cards = document.querySelectorAll(".card-front");
  let randomNumber = [];
  const popUpBody = document.querySelector(".pop-up-body");

  function getRandomNumber() {
    return Math.floor(Math.random() * 29);
  }

  function generateTour() {
    randomNumber = getRandomNumber();
    const randomTour = cards[randomNumber];
    const clone = randomTour.cloneNode(true);
    clone.classList.add("clone");
    popUpBody.appendChild(clone);
  }

  if (closeButton) {
    closeButton.forEach((button) => {
      button.addEventListener("click", () => {
        overlay.classList.remove("active");
        popUp.classList.remove("active");
        setTimeout(function () {
          popUpBody.removeChild(popUpBody.firstChild);
        }, 400);
      });
    });
  }
  if (openButton) {
    openButton.addEventListener("click", () => {
      overlay.classList.add("active");
      popUp.classList.add("active");
      generateTour();
    });
  }
}

//WISHLIST//
const wishBtns = document.querySelectorAll(".heart");
const counter = document.querySelector(".wishlist-length");
let counterLength = 0;
const wishList = document.querySelector(".wishlist-items");
const wishlistTitle = document.querySelector(".wishlist-title");
let destination = "";
let list = [];
const empty = document.createElement("LI");
empty.innerText = "your list is empty ";

wishBtns.forEach((wishBtn) => {
  wishBtn.addEventListener("click", (e) => {
    if (e.path) {
      destination =
        e.path[4].childNodes[1].childNodes[3].childNodes[3].innerText;
    } else {
      destination =
        e.target.parentElement.parentElement.parentElement.parentElement
          .childNodes[1].childNodes[3].childNodes[3].innerText;
    }

    if (!list.includes(destination)) {
      createItem(destination);
      localStorage.setItem("wishlist", JSON.stringify(list));
    }
    isEmpty();
    eraseItem();
  });
});

if (localStorage.getItem("wishlist") === null) {
  wishlist = [];
} else {
  wishlist = JSON.parse(localStorage.getItem("wishlist"));
  wishlist.forEach((destination) => {
    createItem(destination);
    eraseItem();
  });
}

wishlistTitle.addEventListener("click", () => {
  wishList.classList.toggle("wishlist-active");
  isEmpty();
});
if (wishList) {
}

function createItem(destination) {
  list.push(destination);
  const item = document.createElement("LI");
  item.innerText = destination;
  const erase = document.createElement("SPAN");
  erase.innerHTML = "&#10006";
  erase.classList.add("x-btn");
  item.appendChild(erase);
  wishList.appendChild(item);
  counterLength += 1;
  counter.style.display = "inline";
  counter.innerText = counterLength;
}

function eraseItem() {
  const xBtns = document.querySelectorAll(".x-btn");
  xBtns.forEach((xBtn) => {
    xBtn.addEventListener("click", function (e) {
      const deleted = xBtn.parentElement;
      let li = e.target.closest("li");
      let nodes = Array.from(li.closest("ul").children);
      let index = nodes.indexOf(li);
      list.splice(index, 1);
      deleted.remove();
      isEmpty();
      counterLength -= 1;
      counter.innerText = counterLength;
      localStorage.setItem("wishlist", JSON.stringify(list));
    });
  });
}

function isEmpty() {
  if (wishList.innerText == "") {
    counter.style.display = "none";
    wishList.appendChild(empty);
  } else if (wishList.innerText !== "" && wishList.contains(empty)) {
    wishList.removeChild(empty);
  }
}
/*
function saveWishList() {
  let destinations;
  if (localStorage.getItem("destinations") === null) {
    destinations = [];
  } else {
    destinations = JSON.parse(localStorage.getItem("destinations"));
  }
  destinations.push(destination);
  localStorage.setItem("destinations", JSON.stringify(destination));
}*/

//FILTER TOURS//
const filterSelect = document.querySelector(".filter-select");
const options = document.querySelectorAll("option");
const tourCards = document.querySelectorAll(".card");
const saleCards = document.querySelectorAll(`[data-s = "Sale"]`);
let selectedOption = document.querySelector("*[selected]");
let value = selectedOption.textContent;
if (localStorage.getItem("continent") !== null) {
  continent = localStorage.getItem("continent");
  options.forEach((option) => {
    if (option.value == continent) {
      selectedOption.setAttribute("selected", "false");
      option.setAttribute("selected", "true");
      value = continent;
    }
    localStorage.clear();
  });
  filterCards();
}

function filterCards() {
  tourCards.forEach((card) => {
    card.style.display = "none";
  });
  const cards = document.querySelectorAll(`[data-d = "${value}"]`);

  cards.forEach((card) => {
    card.style.display = "block";
  });
  if (value == "All") {
    tourCards.forEach((card) => {
      card.style.display = "block";
    });
  } else if (value == "Sales") {
    saleCards.forEach((card) => {
      card.style.display = "block";
    });
  }
}
filterCards();

filterSelect.addEventListener("change", (e) => {
  selectedOption.setAttribute("selected", "false");
  filterSelect.options[filterSelect.selectedIndex].setAttribute(
    "selected",
    "true"
  );
  value = e.target.value;
  filterCards();
});
