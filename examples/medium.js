// FreeCell game
// requires the following libraries:
// game, cards, tableau, freecellStuff
type = "freecell";

// Card data for standard 52 card deck
const SUITS = ["spade", "heart"];
const RANKS = ["ace", "2", "3", "4", "5", "6", "7", "8",
                "9", "ten", "jack", "queen", "king"];

// Generate new deck
deck = Deck.generate(SUITS, RANKS);

// Add tableaux to DOM
gameBoard = Tableau.generate("board", 0, 100, 5, 13, 60, 20);
freeCells = Tableau.generate("freecell", 0, 0, 3, 1, 60, 80);
foundation = Tableau.generate("foundation", 189, 0, 2, 1, 60, 80);

// Start the game!
deck.shuffle();
deck.deal(gameBoard);

