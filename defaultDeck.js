const SUITS = ["spade", "heart", "diamond", "club"];
const RANKS = ["ace", "2", "3", "4", "5", "6", "7", "8",
                "9", "ten", "jack", "queen", "king"];
var currentCard;

function createDeck() {
  var deckList = [];
  var currentSuit, currentRank;
  // Loop through all suits
  for(suit in SUITS) {
    currentSuit = new Suit(SUITS[suit]);
    // Loop through all ranks
    for(rank in RANKS) {
      currentRank = new Rank(rank+1, RANKS[rank]);
      deckList.push(new Card(currentSuit, currentRank));
    }
  }
  return new Deck(deckList);
}

deck = createDeck();

// // Test for card images
// for(card in deck.list) {
//   currentCard = deck.list[card]
//   console.log(currentCard.image);
//   var cardImage = document.createElement("img");
//   cardImage.setAttribute("src", "images/" + currentCard.image);
//   document.body.appendChild(cardImage);
// }