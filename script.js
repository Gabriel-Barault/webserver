// Horloge
const clock = document.getElementById("clock");
const dateEl = document.getElementById("date");
function tick() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString("fr-FR");
  dateEl.textContent = now.toLocaleDateString("fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}
tick();
setInterval(tick, 1000);

// Compteur (sauvegardé dans le navigateur)
const counter = document.getElementById("counter");
let count = 0;
try { count = Number(localStorage.getItem("launches")) || 0; } catch {}
counter.textContent = count;

function setCount(n) {
  count = n;
  counter.textContent = count;
  try { localStorage.setItem("launches", count); } catch {}
  counter.classList.remove("bump");
  void counter.offsetWidth; // relance l'animation
  counter.classList.add("bump");
}
document.getElementById("launch").addEventListener("click", () => setCount(count + 1));
document.getElementById("reset").addEventListener("click", () => setCount(0));

// Citations
const quotes = [
  "Le serveur répond, donc il existe.",
  "Un 200 OK vaut mieux que deux 404.",
  "Il n'y a pas de cloud, juste l'ordinateur de quelqu'un d'autre.",
  "Ça marche sur ma machine. 🤷",
  "Avant de redémarrer, as-tu essayé de redémarrer ?",
  "Le cache est la racine de tous les mystères.",
  "Toute requête mérite une réponse.",
];
const quoteEl = document.getElementById("quote");
let lastQuote = -1;
function newQuote() {
  let i;
  do { i = Math.floor(Math.random() * quotes.length); } while (i === lastQuote);
  lastQuote = i;
  quoteEl.textContent = "« " + quotes[i] + " »";
}
newQuote();
document.getElementById("newQuote").addEventListener("click", newQuote);

// Infos
document.getElementById("host").textContent = location.host || "(fichier local)";
document.getElementById("proto").textContent = location.protocol;
document.getElementById("ua").textContent = navigator.userAgent;
document.getElementById("ua").title = navigator.userAgent;
document.getElementById("screen").textContent = `${screen.width}×${screen.height}`;
document.getElementById("year").textContent = new Date().getFullYear();

// Fond étoilé
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];
function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  stars = Array.from({ length: Math.floor((innerWidth * innerHeight) / 6000) }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.4 + 0.2,
    s: Math.random() * 0.3 + 0.05,
  }));
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  for (const st of stars) {
    st.y += st.s;
    if (st.y > canvas.height) { st.y = 0; st.x = Math.random() * canvas.width; }
    ctx.globalAlpha = 0.4 + st.r / 2;
    ctx.beginPath();
    ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(draw);
}
addEventListener("resize", resize);
resize();
draw();
