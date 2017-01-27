// Generate new game
var game = new Game();

playerCards = [];
computerCards = [];

Deck.prototype.deal = function(tableau) {
  var cellList = tableau.cellList();
  var cardList = this.list;
  row = 0
  // Deal cards onto tableau
  for(var column = 0; column < 2; column++) {
    var cell = tableau.cellByCoordinates(column, row);
    var card = this.getNextCard();
    addCard(cell, card);
    if(tableau == playerBoard) {
      playerCards.push(card);
    }
    else {
      computerCards.push(card);
    }
  }
}

score = function(player) {
  var total = 0;
  cards = player == "computer" ? computerCards : playerCards;
  for (var i = 0; i < cards.length; i++) {
    console.log(cards[i].rank.number);
    t = Math.min(cards[i].rank.number, 10);
    total += t;
  }
  return total;
}


clearBoard = function() {
  var playerCards = [];
  var computerCards = [];
}

document.getElementById("hit-button").addEventListener("click", function(){
    document.getElementById("blackjack-score").innerHTML = score("computer");
});

document.getElementById("stay-button").addEventListener("click", function(){
    document.getElementById("blackjack-score").innerHTML = score("player");
});

// Card data for standard 52 card deck
const SUITS = ["spade", "heart", "diamond", "club"];
const RANKS = ["ace", "2", "3", "4", "5", "6", "7", "8",
                "9", "ten", "jack", "queen", "king"];

// Generate new deck
// Full deck for card lookup
fullDeck = Deck.generate(SUITS, RANKS);

// Current deck for use in game
// Need to use slice to return a new copy of array
deck = new Deck(fullDeck.list.slice());

var computerBoard = Tableau.generate("computer-board", 100, 0, 10, 1, 20, 80);
var playerBoard = Tableau.generate("player-board", 100, 250, 10, 1, 20, 80);

deck.shuffle();
deck.deal(computerBoard);
deck.deal(playerBoard);