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

// Hey dont look here! This is a secret! 🤫
const totalEasterEggs = 3;
let easterEggCount = 0;
let clickCount = 0;
let clickTimer;
let transformed = false;

document.querySelector("footer p").innerHTML += `<br>
Pssst, you've found ${easterEggCount} out of ${totalEasterEggs}
Easter eggs on this page!`;

function updateEasterEggCount() {
  easterEggCount++;
  if (easterEggCount === totalEasterEggs) {
    document.querySelector("footer p").innerHTML = `Website by Carlo | © 2024
      <br>🎉 Congratulations! You've found all the Easter eggs on this page! 🎉`;
  } else {
    document.querySelector("footer p").innerHTML =
      document.querySelector("footer p").innerHTML.split("\n")[0] +
      `Pssst, you've found ${easterEggCount} out of the ${totalEasterEggs} Easter eggs on this page!`;
  }
}

// Easter egg 1
function increaseSize(element) {
  element.style.transform = "scale(1.2)"; // Increase size by 10%
  element.style.transition = "transform 0.2s ease"; // Smooth transition
}
function resetSize(element) {
  element.style.transform = "scale(1)"; // Reset size to original
  element.style.transition = "transform 0.1s ease"; // Smooth transition
}

function boom(element) {
  if (transformed === false) {
    clickCount++;

    if (clickCount === 1) {
      // Start a 2-second timer on the first click
      clickTimer = setTimeout(() => {
        resetSize(element);
        clickCount = 0; // Reset count after 1 second
      }, 1000);
    }
    if (clickCount === 2) {
      increaseSize(element);
    }

    if (clickCount === 5) {
      // Change logo to logo2 after 5 clicks
      clearTimeout(clickTimer); // Clear the timer since we reached the click threshold
      document.getElementById("logo").src = "logo2.png";
      clickCount = 0; // Reset count after changing the logo
      transformed = true;
      resetSize(element);
      updateEasterEggCount();
    }
  }
}

// Easter egg 2
document.querySelectorAll("#main-menu li").forEach((item) => {
  item.draggable = true;
  item.addEventListener("dragstart", dragStart);
  item.addEventListener("dragover", dragOver);
  item.addEventListener("drop", drop);
});

let draggedItem = null;

function dragStart(event) {
  // Ensure we set `draggedItem` to the `<li>`, not any child `<a>`
  draggedItem = event.target.closest("li");
  event.dataTransfer.effectAllowed = "move";
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();

  // Ensure target is the `<li>` element
  const targetItem = event.target.closest("li");

  if (targetItem && draggedItem !== targetItem) {
    if (draggedItem.parentNode === targetItem.parentNode) {
      let parent = draggedItem.parentNode;
      const draggedIndex = Array.from(parent.children).indexOf(draggedItem);
      const targetIndex = Array.from(parent.children).indexOf(targetItem);
      if (draggedIndex < targetIndex) {
        // Insert dragged item before target item
        targetItem.insertAdjacentElement("afterend", draggedItem);
      } else {
        // Insert dragged item before target item
        targetItem.insertAdjacentElement("beforebegin", draggedItem);
      }

      checkCARLO(); // Check the order after each drop
    }
  }
}

function checkCARLO() {
  const menu = document.getElementById("main-menu");
  const order = Array.from(menu.children)
    .map((item) => item.id)
    .join("");

  if (order === "CARLO") {
    triggerSpecialAction();
  }
}

function triggerSpecialAction() {
  alert("You’ve unlocked the CARLO Easter Egg!");

  // Select each list item by ID and change the content
  document.getElementById("C").querySelector("a").textContent = "C";
  document.getElementById("A").querySelector("a").textContent = "A";
  document.getElementById("R").querySelector("a").textContent = "R";
  document.getElementById("L").querySelector("a").textContent = "L";
  document.getElementById("O").querySelector("a").textContent = "O";

  // Optional: Style the items differently to celebrate the Easter egg
  const items = document.querySelectorAll("#main-menu li a");
  items.forEach((item) => {
    item.style.color = "gold";
    item.style.fontWeight = "bold";
  });

  updateEasterEggCount();
}

// Easter egg 3
// Konami Code sequence
const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
let konamiIndex = 0;

// Listen for keydown events
document.addEventListener("keydown", function (event) {
  // Check if the key matches the current step in the Konami Code
  if (event.key === konamiCode[konamiIndex]) {
    konamiIndex++;

    // If the full Konami Code is entered, trigger the DOOM function
    if (konamiIndex === konamiCode.length) {
      runDoom();
      konamiIndex = 0; // Reset the index for the next time
    }
  } else {
    konamiIndex = 0; // Reset if the sequence breaks
  }
});

function runDoom() {
  alert("Welcome to DOOM! The Konami Code has been activated.");

  // Create an iframe to load DOOM
  const doomContainer = document.createElement("div");
  doomContainer.style.position = "fixed";
  doomContainer.style.top = "0";
  doomContainer.style.left = "0";
  doomContainer.style.width = "100%";
  doomContainer.style.height = "100%";
  doomContainer.style.backgroundColor = "black";
  doomContainer.style.zIndex = "9999";

  // Add a close button
  const closeButton = document.createElement("button");
  closeButton.textContent = "Close DOOM";
  closeButton.style.position = "absolute";
  closeButton.style.top = "10px";
  closeButton.style.right = "10px";
  closeButton.style.zIndex = "10000";
  closeButton.onclick = () => doomContainer.remove();

  // Add the DOOM iframe
  const doomFrame = document.createElement("iframe");
  doomFrame.src = "https://js-dos.com/games/doom.exe.html"; // JS-DOS DOOM port link
  doomFrame.style.width = "100%";
  doomFrame.style.height = "100%";
  doomFrame.style.border = "none";

  // Append everything
  doomContainer.appendChild(closeButton);
  doomContainer.appendChild(doomFrame);
  document.body.appendChild(doomContainer);

  updateEasterEggCount();
}
