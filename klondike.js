// Generate new game
game = new Game();
var drawPileCard = null;
var discardList = [];

Deck.prototype.deal = function(tableau) {
  var cellList = tableau.cellList();
  var cardList = this.list;
  // Deal cards onto tableau
  for(var column = 0; column < 7; column++) {
    for(var row = 0; row <= column; row++) {
      var cell = tableau.cellByCoordinates(column, row);
      var card = this.getNextCard();
      // Deal bottom card face up
      if(row == column) {
        addDraggableCard(cell, card);
      }
      // Deal other cards face down
      else {
        var hidden = new HiddenCard(card);
        addClickableCard(cell, hidden);
      }
    }
  }
  // Put next card onto top of draw pile
  refreshDrawPile();
}

refreshDrawPile = function() {
  clearCell(drawCell);
  var card = deck.getNextCard();
  drawPileCard = card;
  if(card) {
    var hidden = new HiddenCard(card);
    addClickableCard(drawCell, hidden);
  }
}

drawNextCard = function(cardImage) {
  var card = drawPileCard;
  discardList.push(card);
  clearCell(discardCell);
  addDraggableCard(discardCell, card);
  refreshDrawPile();
}

// This seems like a hack.  Is there a better way?
hidden = function(cardImage) {
  return card.src == "images/back.bmp";
}

// This is run when user clicks a card
game.click = function(event) {
  var card = event.target;
  // Check to make sure card can be moved
  if(drawPile.contains(card)) {
    drawNextCard(card);
  }
  else {
    alert("That card can't be moved yet. ");
  }
};

// Card data for standard 52 card deck
const SUITS = ["spade", "heart", "diamond", "club"];
const RANKS = ["ace", "2", "3", "4", "5", "6", "7", "8",
                "9", "ten", "jack", "queen", "king"];

// Generate new deck
deck = Deck.generate(SUITS, RANKS);

// Add tableaux to DOM
gameBoard = Tableau.generate("board", 0, 100, 7, 13, 60, 20);
drawPile = Tableau.generate("drawpile", 0, 0, 1, 1, 60, 80);
discardPile = Tableau.generate("discardpile", 63, 0, 1, 1, 60, 80);
foundation = Tableau.generate("foundation", 189, 0, 4, 1, 60, 80);

var drawCell = drawPile.firstCell();
var discardCell = discardPile.firstCell();


// Start the game!
deck.shuffle();
deck.deal(gameBoard);

