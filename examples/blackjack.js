// Generate new game
var game = new Game();

// Card data for standard 52 card deck
const SUITS = ["spade", "heart", "diamond", "club"];
const RANKS = ["ace", "2", "3", "4", "5", "6", "7", "8",
                "9", "ten", "jack", "queen", "king"];

// Generate new deck
// Full deck for card lookup
fullDeck = Deck.generate(SUITS, RANKS);

// Current deck for use in game
// Need to use slice to return a new copy of array
initDeck = function() {
  deck = new Deck(fullDeck.list.slice());
  deck.shuffle();
}

var computerBoard = Tableau.generate("computer-board", 100, 0, 10, 1, 20, 80);
var playerBoard = Tableau.generate("player-board", 100, 250, 10, 1, 20, 80);


playerCards = [];
computerCards = [];

hide = function(id) {
  document.getElementById(id).style.visibility = "hidden";
}

show = function(id) {
  document.getElementById(id).style.visibility = "visible";
}

Deck.prototype.dealCard = function(tableau, cell) {
  var card = this.getNextCard();
  addCard(cell, card);
  if(tableau == playerBoard) {
    playerCards.push(card);
  }
  else {
    computerCards.push(card);
  }
}

Deck.prototype.deal = function(tableau) {
  row = 0
  // Deal cards onto tableau
  for(var column = 0; column < 2; column++) {
    var cell = tableau.cellByCoordinates(column, row);
    this.dealCard(tableau, cell);
  }
}

// Calculate score for player
score = function(player) {
  var total = 0;
  var aces = 0;
  cards = player == "computer" ? computerCards : playerCards;
  for (var i = 0; i < cards.length; i++) {
    // console.log(cards[i].rank.number);
    var t = Math.min(cards[i].rank.number, 10);
    total += t;
    // Check for aces
    if( t == 1 ) {
      aces ++;
    }
  }
  // Score aces as high as possible, keeping total under 21
  if(total < 21) {
    var maxAces = Math.floor( (21 - total) / 10 );
    total += 10 * Math.min(aces, maxAces)
  }
  return total;
}

updateScore = function() {
  document.getElementById("blackjack-score").innerHTML = score("player");
}

updateBlurb = function(blurb) {
  document.getElementById("blurb").innerHTML = blurb;
}

endGame = function(message) {
  updateBlurb(message);
  hide("blackjack-menu");
  show("blackjack-reset");
}

dealBoard = function() {
  playerBoard.clear();
  computerBoard.clear();
  playerCards = [];
  computerCards = [];
  deck.deal(computerBoard);
  deck.deal(playerBoard);
  updateScore();
  updateBlurb("Do you want to hit or stay?")
  hide("blackjack-reset");
  show("blackjack-menu");
}

hit = function(tableau) {
  var cell = tableau.firstEmptyCell();
  deck.dealCard(tableau, cell);
  updateScore();
}

computerMove = function() {
  while(score("computer") < 17) {
    hit(computerBoard);
  }
  compareScores();
}

compareScores = function() {
  var cs = score("computer");
  var ps = score("player");
  var blurb = "";
  if(cs == ps) { blurb = "Push!  We each have " + cs + "."; }
  else if(cs > ps) { blurb = "My " + cs + " beats your " + ps + "!"; }
  else { blurb = "Your " + ps + " beats my " + cs + "!"; }
  endGame(blurb);
}

document.getElementById("hit-button").addEventListener("click", function(){
  hit(playerBoard);
  if(score("player") > 21 ) {
    endGame("You're busted!")
  }
});

document.getElementById("stay-button").addEventListener("click", function(){
  computerMove();
});

document.getElementById("reset-button").addEventListener("click", function(){
  dealBoard();
});

// Start new game
initDeck();
dealBoard();