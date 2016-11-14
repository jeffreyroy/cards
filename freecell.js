const SUITS = ["spade"];
const RANKS = ["ace", "2", "3", "4", "5", "6", "7", "8",
                "9", "ten", "jack", "queen", "king"];

deck = Deck.generate(SUITS, RANKS);

gameBoard = Tableau.generate("freecell", 0, 100, 3, 13, 60, 20);
// gameBoard.appendStyle(0, 100);
// gameBoard.appendTable(3, 13, 60, 20);
deck.shuffle();
deck.deal(gameBoard);
