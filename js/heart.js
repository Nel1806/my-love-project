const body = document.body;

function createHeart(){

    const heart = document.createElement("div");

    heart.classList.add("small-heart");

    heart.innerHTML = "❤";

    heart.style.left = Math.random()*100+"vw";

    heart.style.animationDuration =
    (4+Math.random()*5)+"s";

    heart.style.fontSize =
    (15+Math.random()*35)+"px";

    body.appendChild(heart);

    setTimeout(()=>{
        heart.remove();
    },9000);

}

setInterval(createHeart,200);

// autoplay fix for browsers
window.addEventListener("click",()=>{
    document.getElementById("bgMusic").play();
});