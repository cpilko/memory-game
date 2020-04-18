const board = document.getElementById('game-board');
const max_cards = 12;
const card_faces = ['d', 'e', 'f', 'h', 'i', 'j'];
const card_colors = ['#ffeaa7', '#00b894', '#e17055', '#e84393', '#fd79a8', '#6c5ce7'];
const card_back = '?';

let has_flipped_card = false;
let lock_board = false;
let first_card, second_card;
let matched_cards = 0;

(function buildBoard() {
  for (let i = 0; i < max_cards; i++) {
    let j = Math.floor(i/2);
    let rand = Math.floor(Math.random() * max_cards);
    let card = document.createElement('div');
    card.setAttribute('class', 'card');
    card.setAttribute('data-face', card_faces[j]);
    card.style.order = rand;
    card.addEventListener('click', flipCard);
    board.append(card);
    let front = document.createElement('div');
    front.setAttribute('class', 'front-face');
    front.style.color = card_colors[j];
    front.innerHTML = card_faces[j];
    card.append(front);
    let back = document.createElement('div');
    back.setAttribute('class', 'back-face');
    back.innerHTML = card_back;
    card.append(back);
  }
})();


function flipCard() {
  if (lock_board) return;
  if (this === first_card) return;
  this.classList.toggle('flip');
  if (!has_flipped_card) {
    has_flipped_card = true;
    first_card = this;
    return;
  }
  second_card = this;
  lock_board = true;
  checkForMatch();
}

function checkForMatch () {
  if (first_card.dataset.face === second_card.dataset.face) {
    disableCards();
    matched_cards = matched_cards + 2;
    if (matched_cards == max_cards) {
      setTimeout(() => {
        alert("You Win!");
      }, 2000);
    }
    return;
  }
  unflipCards();
}

function disableCards() {
  first_card.removeEventListener('click', flipCard);
  second_card.removeEventListener('click', flipCard);
  setTimeout(() => {
    first_card.classList.toggle('matched');
    second_card.classList.toggle('matched');
    resetBoard();
  }, 1500);
}

function unflipCards(){
  setTimeout(() => {
    first_card.classList.remove('flip');
    second_card.classList.remove('flip');
    resetBoard();
  }, 1500);
}

function resetBoard(){
  first_card = null;
  second_card = null;
  has_flipped_card = false;
  lock_board = false;
}
