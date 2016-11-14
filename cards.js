// Definition of playing cards and decks

// Suit class
function Suit(name, char = name[0].toUpperCase(), plural = name + "s") {
  this.name = name;
  this.char = char;
  this.plural = plural;
}

// Rank class
function Rank(number, name = number.toString(), char = name[0].toUpperCase()) {
  this.name = name;
  this.char = char;
  this.number = number;
}

// Cards class
function Card(suit, rank) {
  this.suit = suit;
  this.rank = rank;
  this.name = suit.name + " " + rank.name;
  // id is abbreviated name, e.g. "sa" for ace of spades
  this.id = suit.char + rank.char;
  // Use id for image name
  this.image = this.id + ".bmp";
}


// Deck class 
function Deck(cardList) {
  this.list = cardList;
}

// Class method to generate new deck using list of
// suit names and rank names, e.g.
// suits = ["spades", "hearts", ...]
// ranks = ["ace", "2", ...]
Deck.generate = function(suits, ranks) {
  var deckList = [];
  var currentSuit, currentRank;
  // Loop through all suits
  for(var suit in suits) {
    currentSuit = new Suit(SUITS[suit]);
    // Loop through all ranks
    for(var rank = 0; rank < ranks.length; rank++) {
      currentRank = new Rank(rank+1, RANKS[rank]);
      deckList.push(new Card(currentSuit, currentRank));
    }
  }
  return new Deck(deckList);
}

// Shuffle helper
shuffle = function(v){
    for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
    return v;
};

// Shuffle deck
Deck.prototype.shuffle = function() {
  this.list = shuffle(this.list);
}

// Deal deck into tableau
// Requires tableau.js
Deck.prototype.deal = function(tableau) {
  console.log(game);
  // Get list of cells from tableau
  var cellList = document.getElementsByClassName(tableau.name);
  var cardList = this.list;
  // Warning if cards don't fit into tableau
  if(cardList.length > cellList.length) {
    alert("Too many cards for tableau " + tableau.name);
  }
  // Deal cards
  for(var i in cardList) {
    card = cardList[i];
    var src = "images/" + card.image;
    var imageNode = document.createElement("img");
    imageNode.setAttribute("src", src);
    imageNode.setAttribute("id", card.id);
    imageNode.addEventListener("dragstart", game.dragstart.bind(card));
    // imageNode.addEventListener("dragover", game.dragstart.bind(imageNode));
    // imageNode.addEventListener("drop", game.dragstart.bind(imageNode));
    cellList[i].appendChild(imageNode);
  }
}

// Find a card within deck using suit and rank number
Deck.prototype.findCard = function(suit, rankNumber) {
  for(var i in this.list) {
    if(this.list[i].suit == suit && this.list[i].rank.number == rankNumber) {
      return this.list[i];
    }
  }
  return null;
}

// Find a card within deck using id
Deck.prototype.findCardById = function(id) {
  for(var i in this.list) {
    if(this.list[i].id == id) {
      return this.list[i];
    }
  }
  return null;
}
