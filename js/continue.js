// 🔧 the real anniversary start date
const START_DATE = new Date("2019-07-18T00:00:00");

// 🔧 the page only starts LIVE ticking on this date
const ACTIVATION_DATE = new Date("2026-07-18T00:00:00");

const counterEl = document.getElementById('counter');

function formatCount(diffMs){
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);

  return days.toLocaleString() + " Days and " +
         totalSeconds.toLocaleString() + " seconds";
}

function updateCounter(){
  const now = new Date();

  if(now < ACTIVATION_DATE){
    counterEl.textContent = formatCount(ACTIVATION_DATE - START_DATE);
    return;
  }

  counterEl.textContent = formatCount(now - START_DATE);
}

if (counterEl) {
  updateCounter();
  setInterval(updateCounter, 1000);
}

// ---------- Curtain close → navigate (forward links only) ----------

function goPage(event, element) {
  event.preventDefault();

  // Back button is explicitly excluded — just navigate, no curtain effect
  if (element.classList.contains("back-btn")) {
    window.location.href = element.getAttribute("href");
    return;
  }

  const link = element.getAttribute("href");
  const left = document.querySelector(".flower-curtain.left");
  const right = document.querySelector(".flower-curtain.right");

  element.classList.add("closing");

  // stagger = feels like a real stage curtain pull
  setTimeout(() => left.classList.add("active"), 80);
  setTimeout(() => right.classList.add("active"), 180);

  // wait for the close animation to finish, then leave the page
  setTimeout(() => {
    window.location.href = link;
  }, 1800);
}

// ---------- Curtain open (arrival pages only) ----------
// Any page whose <body> has class="curtain-preclosed" loads with the
// curtain already shut, waits a beat, then opens to reveal the page.
// Pages you navigate to via the back button simply don't carry this
// class, so they load normally with no curtain involved at all.

document.addEventListener("DOMContentLoaded", () => {
  if (!document.body.classList.contains("curtain-preclosed")) return;

  requestAnimationFrame(() => {
    setTimeout(() => {
      document.body.classList.add("curtain-opening");
      document.body.classList.remove("curtain-preclosed");
    }, 350); // brief pause so the shut curtain reads before it opens
  });
});