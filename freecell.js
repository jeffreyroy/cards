const SUITS = ["spade"];
const RANKS = ["ace", "2", "3", "4", "5", "6", "7", "8",
                "9", "ten", "jack", "queen", "king"];
game = new Game();

// Check whether card is obstructed (i.e. is under another card)
obstructed = function(cardImage) {
  lowerCell = gameBoard.cellBelow(cardImage.parentElement);
  // console.log(lowerCell);
  return !cellEmpty(lowerCell);
}

// Run this function when user drags a card
game.dragstart = function(event) {
  card = event.target;
  if(obstructed(card)) {
    alert("That card can't move.");
  }
  else {
    game.activeCard = this;
    console.log(game.activeCard.name);
    event.dataTransfer.setData("text", event.target.id);
    
  }
};

// Find valid target cells for a card
validTarget = function(card, destination) {
  // First empty freecell
  if(destination == freeCells.firstEmptyCell()) { return true; }
  // Empty foundation
  if(destination == foundation.firstEmptyCell()) { return true; }
  // Top of empty column
  if(destination == gameBoard.firstEmptyCell()) { return true; }

  // Below card on board
  if(gameBoard.contains(destination)
    && destination.tagName == "IMG"
    && destination.id != card.id
    && !obstructed(destination)) { return true; }

       
  return false;
}

game.dragover = function(event) {
  // Redefine this for a particular game
  // console.log(event.target);

  // Example:
  if(validTarget(game.activeCard, event.target)) {
    event.preventDefault();
  }
};

game.drop = function(event) {
  // console.log("This game does not yet allow dropping. ");
  // Redefine this for a particular game
  // Example:
  var cell = event.target;
  // If cell is an image on the board, place card below it
  if(cell.tagName == "IMG") {
    cell = gameBoard.cellBelow(cell.parentElement);
  }
  var data = event.dataTransfer.getData("text");
  cell.appendChild(document.getElementById(data));
};

deck = Deck.generate(SUITS, RANKS);

gameBoard = Tableau.generate("board", 0, 100, 3, 13, 60, 20);
freeCells = Tableau.generate("freecell", 0, 0, 2, 1, 60, 80);
foundation = Tableau.generate("foundation", 126, 0, 1, 1, 60, 80);

deck.shuffle();
deck.deal(gameBoard);

