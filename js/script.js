const hamburgerButton = document.querySelector(".hamburger-button")
const navList = document.querySelector(".nav-list")
const pageOverlay = document.querySelector(".page-overlay")
const bar1 = document.getElementById("bar-1")
const bar2 = document.getElementById("bar-2")
const bar3 = document.getElementById("bar-3")
document.getElementById('current-year').textContent = new Date().getFullYear();

hamburgerButton.addEventListener("click", ()=>{
    navList.classList.toggle("nav-visible");
    pageOverlay.classList.toggle("overlay-visible")
    bar1.classList.toggle("x")
    bar2.classList.toggle("x")
    bar3.classList.toggle("x")
})
    


//make sure to write the logic for the form submit
