// Card data
const SUITS = ["spade"];
const RANKS = ["ace", "2", "3", "4", "5", "6", "7", "8",
                "9", "ten", "jack", "queen", "king"];

// Generate new game
game = new Game();

deck = Deck.generate(SUITS, RANKS);

// Functions for moving cards

// Check for win
won = function() {
  foundationTop = foundation.tableElement().firstChild.firstChild.firstChild.firstChild;
  return foundationTop && foundationTop.id == "SK";
}

// Check whether card is obstructed (i.e. is under another card)
obstructed = function(cardImage) {
  lowerCell = gameBoard.cellBelow(cardImage.parentElement);
  // console.log(lowerCell);
  return !cellEmpty(lowerCell);
}

// cardByImage = function(cardImage) {
//   id = cardImage.id;
//   return deck.findCardById(id);
// }

predecessor = function(card) {
  suit = card.suit;
  console.log(card.rank.number);
  rankNumber = card.rank.number - 1;
  return deck.findCard(suit, rankNumber)
}

// Run this function when user drags a card
game.dragstart = function(event) {
  card = event.target;
  if(gameBoard.contains(card)
    && (obstructed(card))) {
    alert("That card can't move.");
  }
  if(foundation.contains(card)) {
    alert("That card can't move.");
  }
  else {
    game.activeCard = this;
    // console.log(game.activeCard.name);
    event.dataTransfer.setData("text", event.target.id);
    
  }
};


// Find valid target cells for a card
validTarget = function(card, destination) {
  // First empty freecell
  if(destination == freeCells.firstEmptyCell()) { return true; }
  // Ace on empty foundation
  if(destination == foundation.firstEmptyCell()
    && card.rank.number == 1) { return true; }
  // Top of empty column
  if(destination == gameBoard.firstEmptyCell()) { return true; }
  // On foundation, counting upward
  if(foundation.contains(destination)
    && destination.tagName == "IMG") {
      targetCard = deck.findCardById(destination.id);
      if(targetCard == predecessor(card)) { return true; }

  }
  // Below card on board, counting downward
  if(gameBoard.contains(destination)
    && destination.tagName == "IMG"
    && !obstructed(destination)) {

    // && destination.id != card.id
    // && 
    // ) { return true; }
      targetCard = deck.findCardById(destination.id);
      // console.log(predecessor(targetCard));
      if(card == predecessor(targetCard)) { return true; }
  }

       
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
  // If building onto card on foundation, remove existing card
  if(foundation.contains(cell) && cell.tagName == "IMG") {
    cell = cell.parentElement;
    cell.removeChild(cell.firstChild);
  }
  // If cell is an image on the board, place card below it
  if(gameBoard.contains(cell) && cell.tagName == "IMG") {
    cell = gameBoard.cellBelow(cell.parentElement);
  }
  // Put card in new location
  var data = event.dataTransfer.getData("text");
  cell.appendChild(document.getElementById(data));
  if(won()) { alert("You win!!"); };
};

// Start the game!

gameBoard = Tableau.generate("board", 0, 100, 3, 13, 60, 20);
freeCells = Tableau.generate("freecell", 0, 0, 2, 1, 60, 80);
foundation = Tableau.generate("foundation", 126, 0, 1, 1, 60, 80);

deck.shuffle();
deck.deal(gameBoard);

