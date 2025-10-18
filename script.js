// Store logos for each platform
const storeLogos = {
  epic: "Epic.png",
  steam: "Steam.png",
  gog: "Gog.png",
  ea: "EA.png"
};

// Sale data
const storeData = {
  epic: [
    "Fortress Siege – 75% OFF → $4.99",
    "Dark Horizon – 50% OFF → $9.99",
    "Soulborne: Revenant – 40% OFF → $17.99",
    "Starforge Dominion – 65% OFF → $12.99",
    "Chrono Rebellion – 55% OFF → $10.99",
    "Mystic Realms – 70% OFF → $8.99"
  ],
  steam: [
    "Zombie Outbreak Survival – 95% OFF → $1.99",
    "Cyber Drift Racer – 80% OFF → $3.99",
    "Pixel Quest Legends – 70% OFF → $5.99",
    "Blade of Eternity – 60% OFF → $9.99",
    "Empire Collapse – 50% OFF → $11.99",
    "Dungeon Breaker – 45% OFF → $13.49"
  ],
  gog: [
    "Retro Galaxy 2 – 90% OFF → $2.49",
    "Mystic Kingdoms – 60% OFF → $8.99",
    "Chrono Tales – 50% OFF → $9.99",
    "Lost Frontier – 75% OFF → $4.99",
    "Oceanborn Legacy – 65% OFF → $7.99",
    "Desert Odyssey – 55% OFF → $10.49"
  ],
  ea: [
    "Need for Speed Legacy – 85% OFF → $4.99",
    "Battlefront Saga – 60% OFF → $14.99",
    "Simville Deluxe – 75% OFF → $5.49",
    "Dragonspire – 50% OFF → $9.99",
    "Apex Titans – 40% OFF → $17.99",
    "Galactic Command – 45% OFF → $11.99"
  ]
};

let showingAll = false;
let currentStore = "epic";

// --- Core function: shows selected store ---
function showStore(store) {
  currentStore = store;
  const content = document.getElementById("store-content");
  const tabButtons = document.querySelectorAll(".tab-btn");
  const logo = document.getElementById("store-logo");
  const moreBtn = document.getElementById("more-btn");

  // Highlight active tab
  tabButtons.forEach(btn => btn.classList.remove("active"));
  document.querySelector(`.tab-btn[onclick="showStore('${store}')"]`).classList.add("active");

  // Change logo with smooth fade
  logo.classList.add("fade-out");
  setTimeout(() => {
    logo.src = storeLogos[store];
    logo.alt = store + " Logo";
    logo.classList.remove("fade-out");
  }, 200);

  // Load first 3 sales linking to game.html
  const sales = storeData[store];
  content.innerHTML = sales
    .slice(0, 3)
    .map(item => `
      <div class="sale-item">
        <a href="game.html" class="sale-link">${item}</a>
      </div>
    `)
    .join("");

  // Reset "More" button
  showingAll = false;
  moreBtn.style.display = "block";
  moreBtn.textContent = "More ⬇";
  moreBtn.onclick = () => toggleMore(store);

  // Reset height transition
  content.style.maxHeight = "300px";
}

// --- Expand / collapse extra sales ---
function toggleMore(store) {
  const content = document.getElementById("store-content");
  const moreBtn = document.getElementById("more-btn");
  const sales = storeData[store];

  if (!showingAll) {
    // Expand smoothly
    const extraItems = sales
      .slice(3)
      .map(item => `
        <div class="sale-item">
          <a href="game.html" class="sale-link">${item}</a>
        </div>
      `)
      .join("");
    content.insertAdjacentHTML("beforeend", extraItems);

    // Smooth height expansion
    content.style.transition = "max-height 0.5s ease";
    content.style.maxHeight = content.scrollHeight + "px";

    moreBtn.textContent = "Less ⬆";
  } else {
    // Collapse smoothly
    showStore(store);
  }

  showingAll = !showingAll;
}

// --- Default view ---
showStore("epic");

// --- Rotating wide ad banners ---
const adSets = [
  { left: "ad1_left.jpg", center: "ad1_center.jpg", right: "ad1_right.jpg" },
  { left: "ad2_left.jpg", center: "ad2_center.jpg", right: "ad2_right.jpg" },
  { left: "ad3_left.jpg", center: "ad3_center.jpg", right: "ad3_right.jpg" }
];

window.addEventListener("DOMContentLoaded", () => {
  const ad = document.querySelector(".ad-frame");
  if (ad && adSets.length > 0) {
    const randomSet = adSets[Math.floor(Math.random() * adSets.length)];
    ad.querySelector(".ad-side.left").src = randomSet.left;
    ad.querySelector(".ad-center").src = randomSet.center;
    ad.querySelector(".ad-side.right").src = randomSet.right;
  }
});
