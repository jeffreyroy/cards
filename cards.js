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
  this.code = suit.char + rank.char;
  this.image = this.code + ".bmp";
}

// Deck class 
function Deck(cardList) {
  this.list = cardList;
}


