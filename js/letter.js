const paragraphs = document.querySelectorAll(".letter-body p");
const letterScroll = document.querySelector(".letter-scroll");

function sleep(ms){
  return new Promise(r => setTimeout(r, ms));
}

// THIS is the part that must exist — without it, text typed past
// the visible box is invisible until typing ends.
function autoScrollIfNeeded(p){
  const boxRect = letterScroll.getBoundingClientRect();
  const pRect = p.getBoundingClientRect();
  const overflow = pRect.bottom - boxRect.bottom;

  if(overflow > 0){
    letterScroll.scrollTop += overflow + 10;
  }
}

async function typeEffect(p){
  const text = p.textContent;
  p.textContent = "";
  p.style.opacity = "1";

  const textNode = document.createTextNode("");
  const cursor = document.createElement("span");
  cursor.className = "cursor";
  cursor.textContent = "🖋";

  p.appendChild(textNode);
  p.appendChild(cursor);

  for(let i = 0; i < text.length; i++){
    textNode.textContent = text.substring(0, i + 1);
    autoScrollIfNeeded(p);   // ← must be called every letter, inside the loop
    await sleep(55);
  }

  cursor.style.display = "none";
}

const audio = document.getElementById("bgMusic");

async function startWriting() {
  audio.play().catch(() => console.log("Autoplay blocked"));

  await sleep(2000);

  for (const p of paragraphs) {
    await typeEffect(p);
    await sleep(600);
  }

  await sleep(300);

  letterScroll.style.overflowY = "auto";
  letterScroll.style.scrollBehavior = "smooth";
}

startWriting();

document.addEventListener("DOMContentLoaded", () => {
  if (!document.body.classList.contains("curtain-preclosed")) return;
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.body.classList.add("curtain-opening");
      document.body.classList.remove("curtain-preclosed");
    }, 350);
  });
});