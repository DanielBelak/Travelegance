//BURGER//
const burger = document.querySelector(".burger");
const navbar = document.querySelector(".main-nav-list");

burger.addEventListener("click", () => {
  navbar.classList.toggle("flex");
  navbar.classList.toggle("navbar-active");
});
