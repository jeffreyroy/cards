// Generate new game
game = new Game();


Deck.prototype.deal = function(tableau) {
  var cellList = tableau.cellList();
  var cardList = this.list;
  row = 0
  // Deal cards onto tableau
  for(var column = 0; column < 2; column++) {
    var cell = tableau.cellByCoordinates(column, row);
    var card = this.getNextCard();
    addDraggableCard(cell, card);

    
  }
}


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