const SUITS = ["spade"];
const RANKS = ["ace", "2", "3", "4", "5", "6", "7", "8",
                "9", "ten", "jack", "queen", "king"];
game = new Game();

game.dragstart = function(event) {
  game.activeCard = this;
  console.log(game.activeCard.name);
  event.dataTransfer.setData("text", event.target.id);
};

validTarget = function(card, destination) {
  // Target is the first empty freecell
  if(destination == freeCells.firstEmptyCell()) { return true; }
  // Target is the foundation and foundation is empty
  if(destination == foundation.firstEmptyCell()) { return true; }
  // if(destination.tagName == "IMG" && gameBoard.contains(destination)) {
  //   var div = destination.parentElement;
  //   console.log(div);
  //   if(cellEmpty(gameBoard.cellBelow(div))) { return true; }
  if(gameBoard.contains(destination)) {
    // console.log(gameBoard.cellBelow(destination));
    if(cellEmpty(gameBoard.cellBelow(destination))) { return true; }
  }
       
  return false;
}

game.dragover = function(event) {
  // Redefine this for a particular game
  console.log(event.target);

  // Example:
  if(validTarget(null, event.target)) {
    event.preventDefault();
  }
};

game.drop = function(event) {
  // console.log("This game does not yet allow dropping. ");
  // Redefine this for a particular game
  // Example:
  var cell = event.target;
  var data = event.dataTransfer.getData("text");
  cell.appendChild(document.getElementById(data));
};

deck = Deck.generate(SUITS, RANKS);

gameBoard = Tableau.generate("board", 0, 100, 3, 13, 60, 20);
freeCells = Tableau.generate("freecell", 0, 0, 2, 1, 60, 80);
foundation = Tableau.generate("foundation", 126, 0, 1, 1, 60, 80);

deck.shuffle();
deck.deal(gameBoard);

