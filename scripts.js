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

let exploded = false;
let carlod = false;
let xmasd = false;

document.querySelector("footer p").innerHTML += `<br>
Pssst, you've found ${easterEggCount} out of ${totalEasterEggs}
Easter eggs on this page!`;

function updateEasterEggCount() {
  easterEggCount++;
  if (easterEggCount === totalEasterEggs) {
    document.querySelector("footer p").innerHTML = `Website by Carlo | © 2024
      <br>🎉 Congratulations! You've found all the Easter eggs on this page! 🎉`;
  } else {
    document.querySelector(
      "footer p"
    ).innerHTML = `Website by Carlo | © 2024<br>
      Pssst, you've found ${easterEggCount} out of ${totalEasterEggs}
      Easter eggs on this page!`;
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
  if (exploded === false) {
    clickCount++;

    if (clickCount === 1) {
      // Start a 2-second timer on the first click
      clickTimer = setTimeout(() => {
        resetSize(element);
        clickCount = 0; // Reset count after 1 second
      }, 1000);
    }
    if (clickCount === 1) {
      increaseSize(element);
    }

    if (clickCount === 5) {
      // Change logo to logo2 after 5 clicks
      clearTimeout(clickTimer); // Clear the timer since we reached the click threshold
      document.getElementById("logo").src = "media/logo2.png";
      clickCount = 0; // Reset count after changing the logo
      exploded = true;
      resetSize(element);
      updateEasterEggCount();
    }
  }
}

// Easter egg 2 and 3
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

      checkOrders(); // Check the order after each drop
    }
  }
}

function checkOrders() {
  const menu = document.getElementById("main-menu");
  const order = Array.from(menu.children)
    .map((item) => item.id)
    .join("");

  if (order === "CARLO") {
    if (carlod === false) {
      triggerCarloAction();
    }
  } else if (order === "CAROL") {
    triggerXmasAction();
  }
}

function triggerCarloAction() {
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
  if (carlod === false) {
    updateEasterEggCount();
    carlod = true;
  }
}

function triggerXmasAction() {
  const snowflakeInterval = setInterval(createSnowflake, 100); // Create a snowflake every 100ms

  // Stop creating new snowflakes after 10 seconds
  setTimeout(() => {
    clearInterval(snowflakeInterval);
    removeSnowflakes(); // Remove remaining snowflakes after stopping
  }, 10000);
  if (!xmasd) {
    updateEasterEggCount();
    xmasd = true;
  }
}

function triggerXmasAction() {
  const snowflakeInterval = setInterval(createSnowflake, 100); // Create a snowflake every 100ms

  // Stop creating new snowflakes after 10 seconds
  setTimeout(() => {
    clearInterval(snowflakeInterval);
    removeSnowflakes(); // Remove remaining snowflakes after stopping
  }, 10000);

  if (!xmasd) {
    updateEasterEggCount();
    xmasd = true;
  }
}

function triggerXmasAction() {
  const snowflakeInterval = setInterval(createSnowflake, 100); // Create a snowflake every 100ms

  // Stop creating new snowflakes after 10 seconds
  setTimeout(() => {
    clearInterval(snowflakeInterval);
  }, 10000);

  if (!xmasd) {
    updateEasterEggCount();
    xmasd = true;
  }
}

function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  snowflake.textContent = "❄"; // Snowflake symbol

  // Set random position and size for each snowflake
  snowflake.style.left = Math.random() * 100 + "vw"; // Random horizontal position
  snowflake.style.fontSize = Math.random() * 10 + 13 + "px"; // Random size

  // Randomize the animation duration for a natural effect
  const fallDuration = Math.random() * 5 + 5 + "s"; // Fall duration between 5-10 seconds
  snowflake.style.animationDuration = fallDuration;

  document.body.appendChild(snowflake);

  // Remove snowflake after it falls to avoid build-up
  setTimeout(() => snowflake.remove(), parseFloat(fallDuration) * 2000);
}
