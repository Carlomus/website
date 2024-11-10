// Hey dont look here! This is a secret!
let currentYear = new Date().getFullYear();
let easterEggCount = 0;
let totalEasterEggs = 1;

document.querySelector("footer p").innerHTML += `<br>
Pssst, you've found ${easterEggCount} out of the ${totalEasterEggs}
Easter eggs on this page!`;

function updateEasterEggCount() {
  easterEggCount++;
  if (easterEggCount === totalEasterEggs) {
    document.querySelector("footer p").innerHTML =
      "© 2024 Carlo A. Mussolini | Website by Carlo" +
      "<br>🎉 Congratulations! You've found all the Easter eggs on this page! 🎉";
  } else {
    document.querySelector("footer p").innerHTML =
      document.querySelector("footer p").innerHTML.split("\n")[0] +
      `Pssst, you've found ${easterEggCount} out of the ${totalEasterEggs} Easter eggs on this page!`;
  }
}

function showTab(tabId) {
  const tabs = document.querySelectorAll(".tab-content");
  tabs.forEach((tab) => tab.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");

  const menuLinks = document.querySelectorAll(".main-menu a");
  menuLinks.forEach((link) => link.classList.remove("active"));
  document
    .querySelector(`.main-menu a[onclick="showTab('${tabId}')"]`)
    .classList.add("active");
}
function increaseSize(element) {
  element.style.transform = "scale(1.2)"; // Increase size by 10%
  element.style.transition = "transform 0.2s ease"; // Smooth transition
}
function returnSize(element) {
  element.style.transform = "scale(1)"; // Reset size to original
  element.style.transition = "transform 0.1s ease"; // Smooth transition
}
let clickCount = 0;
let clickTimer;
let transformed = false;

function boom(element) {
  if (transformed === false) {
    clickCount++;

    if (clickCount === 1) {
      // Start a 2-second timer on the first click
      clickTimer = setTimeout(() => {
        returnSize(element);
        clickCount = 0; // Reset count after 1 second
      }, 1000);
    }
    if (clickCount > 1) {
      increaseSize(element);
    }

    if (clickCount === 5) {
      // Change logo to logo2 after 5 clicks
      document.getElementById("logo").src = "logo2.png";
      clickCount = 0; // Reset count after changing the logo
      clearTimeout(clickTimer); // Clear the timer since we reached the click threshold
      transformed = true;
      returnSize(element);
      updateEasterEggCount();
    }
  }
}
