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
    // before July 18, 2026: show the fixed total from 2019 up to 2026, frozen
    counterEl.textContent = formatCount(ACTIVATION_DATE - START_DATE);
    return;
  }

  // from July 18, 2026 onward: count live, continuing from 2019
  counterEl.textContent = formatCount(now - START_DATE);
}

updateCounter();
setInterval(updateCounter, 1000);


function goPage(event, element) {
    event.preventDefault();

    const link = element.getAttribute("href");

    document.querySelector(".flower-curtain.left").classList.add("active");
    document.querySelector(".flower-curtain.right").classList.add("active");

    element.classList.add("closing");

    // Wait for curtain to completely close
    setTimeout(() => {
        window.location.href = link;
    }, 900); // Match the CSS transition time
}
