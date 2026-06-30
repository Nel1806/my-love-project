const CODE = "0718"; // your monthsary date

let entered = "";
const displayText = document.getElementById('display-text');
const hint = document.getElementById('hint');
const card = document.querySelector('.card');

function renderDisplay(){
  displayText.textContent = entered.length ? entered : '\u00A0';
}

function press(num){
  if(entered.length >= 4) return;
  entered += num;
  renderDisplay();
  hint.textContent = '\u00A0';
}

function deleteLast(){
  entered = entered.slice(0, -1);
  renderDisplay();
  hint.textContent = '\u00A0';
}

function submitCode(){
  if(entered.length === 0) return;

  if(entered === CODE){
    unlock();
  }else{
    hint.textContent = "Wrong date, try again 💔";
    card.classList.add('shake');
    setTimeout(() => {
      card.classList.remove('shake');
      entered = "";
      renderDisplay();
    }, 400);
  }
}

function unlock(){
  document.getElementById('lockScene').classList.add('hidden');
  document.getElementById('successScene').classList.remove('hidden');
}

// allow keyboard typing too
document.addEventListener('keydown', (e) => {
  if(/^[0-9]$/.test(e.key)) press(e.key);
  if(e.key === 'Backspace') deleteLast();
  if(e.key === 'Enter') submitCode();
});