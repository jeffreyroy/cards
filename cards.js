// Suit class
function Suit(name, char = name[0].toUpperCase(), plural = name + "s") {
  this.name = name;
  this.char = char;
  this.plural = plural;
}

// Rank class
function Rank(number, name = number.toString(), char = name[0].toUpperCase(), predecessor = number - 1, successor = number + 1) {
  this.name = name;
  this.char = char;
  this.number = number;
  predecessor = predecessor;
  successor = successor;
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
    for(var rank in ranks) {
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
  // Get list of cells from tableau
  var cellList = document.getElementsByClassName(tableau.name);
  var cardList = this.list;
  // Warning if cards don't fit into tableau
  if(cardList.length > cellList.length) {
    alert("Too many cards for tableau " + tableau.name);
  }
  // Deal cards
  for(var i in cardList) {
    var src = "images/" + cardList[i].image;
    var imageNode = document.createElement("img");
    imageNode.setAttribute("src", src);
    cellList[i].appendChild(imageNode);
  }
}


