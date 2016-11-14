// Game class
// Contains functions to allow cards to be dragged and dropped
// Functions must be customized for a particular game.

function Game() {
  // Used to hold card currently being manipulated
  this.activeCard = null;
}

// Redefine for particular game
// "this" will be bound to card being dragged
Game.prototype.dragstart = function(event) {
  console.log("This game does not yet allow dragging. ");
  // event.dataTransfer.setData("text", event.target.id);
};

// Redefine for particular game
// "this" will be bound to target div in DOM
Game.prototype.dragover = function(event) {
  console.log("This game does not yet allow dragging over. ");

  // Example:
  // if(this.validTarget(null, event.target)) {
  //   event.preventDefault();
  // }
};

// Redefine for particular game
// "this" will be bound to target div in DOM
Game.prototype.drop = function(event) {
  console.log("This game does not yet allow dropping. ");
  // Example:
  // var cell = event.target;
  // var data = event.dataTransfer.getData("text");
  // cell.appendChild(document.getElementById(data));
};

var game = new Game();