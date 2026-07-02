  const paragraphs = document.querySelectorAll(".letter-body p");
  const letterPaper = document.querySelector(".letter-paper");

  function sleep(ms){
    return new Promise(r => setTimeout(r, ms));
  }

  function autoScrollIfNeeded(p){
    const paperRect = letterPaper.getBoundingClientRect();
    const pRect = p.getBoundingClientRect();
    const overflow = pRect.bottom - paperRect.bottom;

    if(overflow > 0){
      letterPaper.scrollTop = letterPaper.scrollTop + overflow + 20;
    }
  }

  async function typeEffect(p){

    const text = p.textContent;
    p.textContent = "";
    p.style.opacity = "1";

    // create cursor once, reuse it instead of rebuilding innerHTML each time
    const textNode = document.createTextNode("");
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    cursor.textContent = "🖋";

    p.appendChild(textNode);
    p.appendChild(cursor);

    for(let i = 0; i < text.length; i++){
      textNode.textContent = text.substring(0, i + 1);
      autoScrollIfNeeded(p);
      await sleep(55);
    }

    // hide cursor instead of removing it — no layout shift
    cursor.style.display = "none";
  }

 const audio = document.getElementById("bgMusic");

async function startWriting() {

  audio.play().catch(() => {
    console.log("Autoplay blocked");
  });

  letterPaper.style.overflowY = "hidden";

  await sleep(2000);

  for (const p of paragraphs) {
    await typeEffect(p);
    await sleep(600);
  }

  await sleep(300);

  letterPaper.style.overflowY = "auto";
  letterPaper.style.scrollBehavior = "smooth";
}

startWriting();