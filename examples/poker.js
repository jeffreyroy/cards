/// Card data
// Generate new game
var game = new Game();

// Card data for standard 52 card deck
const SUITS = ["spade", "heart", "diamond", "club"];
const RANKS = ["2", "3", "4", "5", "6", "7", "8",
                "9", "ten", "jack", "queen", "king", "ace"];

// Generate new deck
// Full deck for card lookup
fullDeck = Deck.generate(SUITS, RANKS);

/// Global variables for current hand
const INCREMENT = 100;  // Bet increment
totalBet = 0;
pot = 0;
bettingRound = 0;
commonList = [];

// Current deck for use in game
// Need to use slice to return a new copy of array
initDeck = function() {
  deck = new Deck(fullDeck.list.slice());
  deck.shuffle();
}

// Common cards
var commonCards = Tableau.generate("player-board", 180, 150, 5, 1, 20, 80);


/// Player data

// List of players and tableau locations
const PLAYERDATA = [
  { name: "Player", left: 200, top: 300, firstBet: 0 },
  { name: "Alice", left: 400, top: 200, firstBet: 0 },
  { name: "Bob", left: 400, top: 100, firstBet: 0 },
  { name: "Charlie", left: 300, top: 0, firstBet: 0 },
  { name: "Debra", left: 100, top: 0, firstBet: 0 },
  { name: "Ellen", left: 0, top: 100, firstBet: 50 },
  { name: "Frank", left: 0, top: 200, firstBet: 100 }
]

var playerList = []

// Player class
function Player(name) {
  this.name = name;
  this.tableau = null;
  this.nameArea = null;
  this.cardList = [];
  this.bet = 0;
}

// Get full hand, including common cards
Player.prototype.fullHand = function() {
  var hand = this.cardList.concat(commonList);
  hand.sort(deck.compareRank).reverse();
  return hand;
}


// Choose bet for player based on round (number of community cards dealt)
Player.prototype.getBet = function(round) {
  console.log("Getting bet for " + this.name);
  switch(round) {
    case 0:
      this.firstRoundBet();
      break;
    default:
      this.fold();
  }
}

Player.prototype.firstRoundBet = function() {
  var hand = this.fullHand();
  console.log(hand[0].id + " " + hand[1].id);
  // Get value of opening hand
  var value = chenValue(hand);

  console.log("Value: " + value);
  // Raise with good hand
  if( value >= 9) { this.raise(); }
  // Call with okay hand
  else if(value >= 6) { this.call(); }
  // Otherwise fold
  else { this.fold(); }
}

// Use Bill Chen's formula to value opening hand
chenValue = function(hand) {
  var high = hand[0].rank.number
  var low = hand[1].rank.number
  // Get value of high card
  const HIGHCARDVALUE = [0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8, 10]
  var value = HIGHCARDVALUE[high]
  // Multiply by two if pair
  if(high == low) {
    value = Math.max(value * 2, 5);
  }
  // Add 2 if suited
  if(hand[0].suit == hand[1].suit) {
    value += 2;
  }
  // Reduce value if gapped
  const GAPVALUE = [1, 1, -1, -2, -4];
  var gap = high - low;
  if(gap <= 4) { value += GAPVALUE[gap]; }
  else { value -= 5; }
  return value;
}


// Methods to change bet
Player.prototype.makeBet = function(n) {
  this.bet += n;
  pot += n;
  this.nameArea.appendText(" - $" + totalBet);
}

Player.prototype.raise = function() {
  console.log(this.name + " raises.");
  totalBet += INCREMENT;
  this.call();
}

Player.prototype.call = function() {
  console.log(this.name + " calls.");
  this.makeBet(totalBet - this.bet);
}

Player.prototype.fold = function(n) {
  this.bet = -1;
  this.nameArea.appendText(" - fold");
}


// Generate list of players
var generatePlayers = function() {
  for(i=0; i<PLAYERDATA.length; i++) {
    data = PLAYERDATA[i];
    var player = new Player(data.name, data.left, data.top);
    // Create new tableau
    player.tableau = Tableau.generate("board-" + i, data.left, data.top, 5, 1, 20, 80);
    player.nameArea = NameArea.generate(data.name, data.left + 20, data.top + 82);
    player.nameArea.appendStyle;
    // Add player to list
    playerList.push(player);
    player.makeBet(300);
  }
}

// Get bets for all players
getPlayerBets = function() {
  var n = PLAYERDATA.length - 1;
  for(i=1; i<=n; i++) {
    var currentPlayer = playerList[i];
    if (currentPlayer.bet > -1) {
      currentPlayer.getBet(bettingRound);
    }
  }
}

/// Methods to deal cards to tableau

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

// Add card to community cards
dealCommon = function() {
  // Draw next card from deck
  var card = deck.getNextCard();
  // Add it to the DOM
  var cell = commonCards.firstEmptyCell();
  if(cell) {
    addCard(cell, card);
  }
  // Add it to the list
  commonList.push(card);
}

/// Event listeners

document.getElementById("bet-button").addEventListener("click", function(){
  // Make bet for player
  playerList[0].raise();
  console.log("Total bet: " + totalBet);
  // Get bets for other players
  getPlayerBets();
});

document.getElementById("check-button").addEventListener("click", function(){
  // Make bet for player
  playerList[0].call();
  hide("poker-bet");
  show("poker-menu");
  dealCommon();
});

document.getElementById("call-button").addEventListener("click", function(){
  dealCommon();
});


/// Start new game
initDeck();
generatePlayers();
dealBoard();