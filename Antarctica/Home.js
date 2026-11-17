const images = [
  "imgs/1.jpg",
  "imgs/2.jpg",
  "https://images.unsplash.com/photo-1486566584569-b9319dc74315?auto=format&fit=max&w=1600&q=80",
  "imgs/4.jpg",
  "https://images.unsplash.com/photo-1630321936775-7e429aecb5bd?auto=format&fit=max&w=1600&q=80",
  "https://images.unsplash.com/photo-1563377226776-1b0bd48458f2?auto=format&fit=max&w=1600&q=80",
  "imgs/7.jpg",
  "https://images.unsplash.com/photo-1551415923-51267c1f2d73?auto=format&fit=max&w=1600&q=80",
  "https://images.unsplash.com/photo-1703178650419-7dac0606db6f?auto=format&fit=max&w=1600&q=80",
  "https://images.unsplash.com/photo-1462888387064-2a2ea232edb8?auto=format&fit=max&w=1600&q=80",
  "https://images.unsplash.com/photo-1632347562052-83f2d630ac03?auto=format&fit=max&w=1600&q=80",
  "https://images.unsplash.com/photo-1687904364304-3fa792cdb55a?auto=format&fit=max&w=1600&q=80",
  "https://images.unsplash.com/photo-1687904477461-3b38aeef9e54?auto=format&fit=max&w=1600&q=80",
  "https://images.unsplash.com/photo-1687904368738-ca6423635666?auto=format&fit=max&w=1600&q=80",
  "https://images.unsplash.com/photo-1556918936-216daf8e7c4c?auto=format&fit=max&w=1600&q=80",
  "https://images.unsplash.com/photo-1713323778930-68f9a01eeb2e?auto=format&fit=max&w=1600&q=80",
  "https://images.unsplash.com/photo-1534969381548-092c153e4cef?auto=format&fit=max&w=1600&q=80",
  "https://images.unsplash.com/photo-1672570289260-d430df31d893?auto=format&fit=max&w=1600&q=80",
  "https://images.unsplash.com/photo-1671362500619-4b9c06b5c5e1?auto=format&fit=max&w=1600&q=80",
  "https://images.unsplash.com/photo-1672612837795-993be4e8bc0d?auto=format&fit=max&w=1600&q=80",
];
const captions = [
  "Blue iceberg",
  "Penguins on ice",
  "Giant glacier",
  "Coastline from above",
  "Seal on ice",
  "Snowy mountain by the sea",
  "Ice cave",
  "Whale tail",
  "Expedition ship",
  "Iceberg near mountains",
  "Penguin colony",
  "Icebergs on the water",
  "Glacier bay",
  "Iceberg and mountains",
  "Penguins on the shore",
  "Iceberg with a bird",
  "People on the ice",
  "Snowy mountain by the water",
  "Boat among icebergs",
  "Boat in front of mountains",
];
const fbImg =
  "https://images.unsplash.com/photo-1517783999520-f068d7431a60?w=1600&q=80&auto=format&fit=crop";
const facts = [
  "Antarctica has NO countries.",
  "Denman Glacier Trench is 3.5km BELOW sea level.",
  "Lake Vostok is hidden UNDER 4km of ice.",
  "Antarctica is a desert! Less rain than Sahara.",
  "90% of Earth's ice is in Antarctica.",
  "NO polar bears in Antarctica. Only penguins, seals, whales.",
  "Coldest ever: -89.2°C in Antarctica.",
  "Summer: sun never sets. Winter: sun never rises.",
  "Antarctica once had forests and dinosaurs.",
  "An iceberg once broke off bigger than Jamaica!",
];

const slider = document.getElementById("slider");
const dotsBox = document.getElementById("dots");
const counter = document.getElementById("counter");
const factText = document.getElementById("factText");

images.forEach((src, i) => {
  let div = document.createElement("div");
  div.className = "slide" + (i === 0 ? " active" : "");
  let img = document.createElement("img");
  img.src = src;
  img.alt = "Antarctica image " + (i + 1);
  img.onload = function () {
    if (this.naturalHeight > this.naturalWidth) {
      div.classList.add("portrait");
    }
  };
  img.onerror = function () {
    if (this.src !== fbImg) {
      this.src = fbImg;
    } else {
      this.style.display = "none";
      div.querySelector(".fallback").style.display = "flex";
    }
  };
  let label = document.createElement("div");
  label.className = "slide-label";
  label.textContent = "IMAGE SLIDER • " + (i + 1) + " / " + images.length;
  let cap = document.createElement("div");
  cap.className = "caption";
  cap.textContent = captions[i];
  let fb = document.createElement("div");
  fb.className = "fallback";
  fb.textContent = "Image could not load: " + src;
  img.onclick = openLightbox;
  div.appendChild(img);
  div.appendChild(label);
  div.appendChild(cap);
  div.appendChild(fb);
  slider.insertBefore(div, slider.querySelector(".arrow-left"));
  let dot = document.createElement("div");
  dot.className = "dot" + (i === 0 ? " active" : "");
  dot.onclick = () => showSlide(i);
  dotsBox.appendChild(dot);
});

const galleryGrid = document.getElementById("galleryGrid");
images.forEach((src, i) => {
  let g = document.createElement("img");
  g.src = src.replace("w=1600", "w=500");
  g.alt = "Gallery - Antarctica image " + (i + 1);
  g.onerror = function () {
    if (this.src !== fbImg) this.src = fbImg;
  };
  g.onclick = () => {
    showSlide(i);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  galleryGrid.appendChild(g);
});

let current = 0,
  factIndex = 0;
function showSlide(n) {
  let slides = document.querySelectorAll(".slide");
  let dots = document.querySelectorAll(".dot");
  slides[current].classList.remove("active");
  dots[current].classList.remove("active");
  current = n;
  slides[current].classList.add("active");
  dots[current].classList.add("active");
  counter.textContent = "Photo " + (current + 1) + " of " + images.length;
  factIndex = (factIndex + 1) % facts.length;
  factText.textContent = facts[factIndex];
  updateLightbox();
}
function nextSlide() {
  showSlide((current + 1) % images.length);
  resetTimer();
}
function prevSlide() {
  showSlide((current - 1 + images.length) % images.length);
  resetTimer();
}
document.getElementById("prevBtn").addEventListener("click", prevSlide);
document.getElementById("nextBtn").addEventListener("click", nextSlide);
factText.textContent = facts[0];
function autoNext() {
  if (!lightboxIsOpen()) showSlide((current + 1) % images.length);
}
let timer = setInterval(autoNext, 4000);
function resetTimer() {
  clearInterval(timer);
  timer = setInterval(autoNext, 4000);
}

const packItems = [
  ["🧥 Extreme Thermal Parka", "Windproof, rated to -40°C"],
  ["🥾 Waterproof Snow Boots", "For ice + zodiac boats"],
  ["🧤 Thermal Gloves x2", "One thin, one thick"],
  ["🕶️ UV Sunglasses", "Snow blindness is real"],
  ["🧴 Sunscreen SPF 50+", "You WILL burn, even when cold"],
  ["🧣 Balaclava", "Protects face from -30°C wind"],
  ["🔋 Power Bank", "Phone dies FAST in cold"],
  ["📷 Waterproof Camera", "For penguins + icebergs"],
];
const packList = document.getElementById("packList");
const packProgress = document.getElementById("packProgress");
const progressFill = document.getElementById("progressFill");
packItems.forEach((item) => {
  let label = document.createElement("label");
  label.className = "pack-item";
  label.innerHTML =
    '<input type="checkbox" onchange="updatePack(this)"><div><span>' +
    item[0] +
    "</span><small>" +
    item[1] +
    "</small></div>";
  packList.appendChild(label);
});
function updatePack(box) {
  let label = box.closest(".pack-item");
  if (box.checked) label.classList.add("checked");
  else label.classList.remove("checked");
  let checked = document.querySelectorAll("#packList input:checked").length;
  packProgress.textContent =
    "You packed " +
    checked +
    " / " +
    packItems.length +
    " items" +
    (checked === packItems.length ? " 🎉 Ready for Antarctica!" : "");
  progressFill.style.width = (checked / packItems.length) * 100 + "%";
}
function resetPack() {
  document.querySelectorAll("#packList input").forEach((c) => {
    c.checked = false;
    c.closest(".pack-item").classList.remove("checked");
  });
  packProgress.textContent = "You packed 0 / " + packItems.length + " items";
  progressFill.style.width = "0%";
}
function toggleTheme() {
  let body = document.body;
  let btn = document.getElementById("themeToggle");
  if (body.getAttribute("data-theme") === "light") {
    body.setAttribute("data-theme", "dark");
    btn.textContent = "☀️";
  } else {
    body.setAttribute("data-theme", "light");
    btn.textContent = "🌙";
  }
}
function toggleMenu() {
  let m = document.getElementById("mobileMenu");
  let b = document.getElementById("hamburger");
  let h = document.querySelector(".topbar").offsetHeight;
  m.style.top = h + "px";
  m.style.maxHeight = "calc(100vh - " + h + "px)";
  m.classList.toggle("open");
  b.textContent = m.classList.contains("open") ? "✕" : "☰";
}
function closeMenu() {
  let m = document.getElementById("mobileMenu");
  let b = document.getElementById("hamburger");
  m.classList.remove("open");
  b.textContent = "☰";
}
let startX = 0;
document.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});
document.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) nextSlide();
  if (endX - startX > 50) prevSlide();
});

function scrollToBottom() {
  window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
window.addEventListener("scroll", () => {
  const topBtn = document.getElementById("back-to-top-btn");
  if (topBtn) topBtn.style.display = window.scrollY > 400 ? "block" : "none";
});

// ---------- Full screen image viewer ----------
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
function lightboxIsOpen() {
  return lightbox.classList.contains("open");
}
function updateLightbox() {
  if (!lightboxIsOpen()) return;
  const slideImg = document.querySelectorAll(".slide img")[current];
  lightboxImg.src = slideImg.currentSrc || slideImg.src;
  lightboxImg.alt = slideImg.alt;
  lightboxCaption.textContent = captions[current];
}
function openLightbox() {
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  updateLightbox();
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  resetTimer();
}
document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
document.getElementById("lightboxPrev").addEventListener("click", prevSlide);
document.getElementById("lightboxNext").addEventListener("click", nextSlide);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (!lightboxIsOpen()) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") prevSlide();
  if (e.key === "ArrowRight") nextSlide();
});