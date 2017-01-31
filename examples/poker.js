/// Card data
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

/// Player data

// List of players and tableau locations
const PLAYERDATA = [
  { name: "Player", left: 200, top: 300 },
  { name: "Alice", left: 100, top: 0 },
  { name: "Bob", left: 300, top: 0 },
  { name: "Charlie", left: 0, top: 100 },
  { name: "Debra", left: 400, top: 100 },
  { name: "Ellen", left: 0, top: 200 },
  { name: "Frank", left: 400, top: 200 }
]

var playerList = []

// Player class
function Player(name) {
  this.name = name;
  this.tableau = null;
  this.nameArea = null;
  this.cardList = [];
}

// Generate list of players
var generatePlayers = function() {
  for(i=0; i<PLAYERDATA.length; i++) {
    data = PLAYERDATA[i];
    var player = new Player(data.name, data.left, data.top);
    // Create new tableau
    player.tableau = Tableau.generate("board-" + i, data.left, data.top, 5, 1, 20, 80);
    player.nameArea = NameArea.generate(data.name, data.left + 20, data.top + 82);
    player.nameArea.appendStyle
    // Add player to list
    playerList.push(player);
  }
}

hide = function(id) {
  document.getElementById(id).style.visibility = "hidden";
}

show = function(id) {
  document.getElementById(id).style.visibility = "visible";
}

Deck.prototype.dealCard = function(player, cell) {
  var card = this.getNextCard();
  addCard(cell, card);
  player.cardList.push(card);
}

// Deck.prototype.deal = function(tableau) {
//   row = 0
//   // Deal cards onto tableau
//   for(var column = 0; column < 2; column++) {
//     var cell = tableau.cellByCoordinates(column, row);
//     this.dealCard(tableau, cell);
//   }
// }

// clearBoard = function() { 
//   for(i=0; i<playerList.length; i++) {
//     player = playerList[i];
//     player.tableau.clear();
//     player.cardList = [];
//   }
// }

deal = function(player, hide) {
  console.log("Dealing " + player.name);
  var tableau = player.tableau;
  // Clear existing hand
  tableau.clear();
  player.cardList = [];
  // Deal two cards face down
  for(var i=0; i<2; i++) {
    var cell = tableau.cellByCoordinates(i, 0);
    var card = deck.getNextCard()
    if(hide) {
      var hidden = new HiddenCard(card);
      addCard(cell, hidden); 
    }
    else {
      addCard(cell, card); 
    }
    player.cardList.push(card);
  }
}

dealBoard = function() {
  // Deal two cards face up to human
  deal(playerList[0], false);
  // Deal two cards face down to each other player
  for(var i=1; i<playerList.length; i++) {
    deal(playerList[i], true);
  }
  hide("poker-menu");
  show("poker-bet");
}


document.getElementById("bet-button").addEventListener("click", function(){

});


// Start new game
initDeck();
generatePlayers();
dealBoard();