// Constructor function for tableau
// with specified number of rows and columns
function Tableau(name, columns, rows) {
  this.name = name;  // Must be unique
  this.columns = columns;
  this.rows = rows;
  this.activeCard = null;
}

// Create style tag to position tableau
// left, top indicate the location of the upper left corner
Tableau.prototype.appendStyle = function(left, top) {
  var tableauStyle = document.createElement("style");
  tableauStyle.type = "text/css";
  var styleText = "#" + this.name + " { ";
  styleText += "position: absolute; ";
  styleText += "left: " + left + "px; ";
  styleText += "top: " + top + "px; ";
  styleText += " }";
  // Append style to head of document
  var styleNode = document.createTextNode(styleText);
  tableauStyle.appendChild(styleNode);
  document.getElementsByTagName('head')[0].appendChild(tableauStyle);
};

// Append table to DOM
// cellWidth, cellHeight are dimensions of table cells
Tableau.prototype.appendTable = function(cellWidth, cellHeight) {
  // Create table
  var newTable = document.createElement("table");
  newTable.setAttribute("id", this.name);
  newTable.setAttribute("class", "tableau");
  // Append table entries
  for(var row=0; row < this.rows; row ++) {
    var currentRow = document.createElement("tr");
    for(var column=0; column < this.columns; column ++) {
      // Create table entry
      var currentCell = document.createElement("td");
      // Create div within table entry
      var currentDiv = document.createElement("div");
      currentDiv.setAttribute("class", this.name);
      // Set dimensions of div
      currentDiv.style.height = cellHeight + "px";
      currentDiv.style.width = cellWidth + "px";
      currentDiv.addEventListener("drop", game.drop.bind(this));
      currentDiv.addEventListener("dragover", game.dragover.bind(this));

      // Add images for testing purposes
      // var currentImg = document.createElement("img");
      // currentImg.setAttribute("src", "images/back.bmp");
      // Append to table
      // currentDiv.appendChild(currentImg);
      currentCell.appendChild(currentDiv);
      currentRow.appendChild(currentCell);
    }
    newTable.appendChild(currentRow);
  }
  // Append table to body of document
  document.body.appendChild(newTable);
};

// Class method to generate tableau and place it on the DOM
Tableau.generate = function(name, left, top, columns, rows, width, height) {
  newTableau = new Tableau(name, columns, rows);
  newTableau.appendStyle(left, top);
  newTableau.appendTable(width, height);
  return newTableau
};

Tableau.prototype.cellList = function() {
  return document.getElementsByClassName(this.name);
};

Tableau.prototype.indexOf = function(cell) {
  var cellList = this.cellList();
  for(i = 0; i < cellList.length; i++) {
    if(cellList[i] == cell) { return i; }
  }
  return -1;
};

Tableau.prototype.contains = function(cell) {
  return this.indexOf(cell) >= 0;
};

var cellEmpty = function(cell) {
  return cell.firstChild == null;
};

Tableau.prototype.firstEmptyCell = function() {
  var cellList = this.cellList();
  // Does this not work in Chrome?
  // return cellList.find(cellEmpty);
  for(var i in cellList) {
    if(cellEmpty(cellList[i])) {
      return cellList[i];
    }
  }
  return nil;
};

// Find cell below a given cell
Tableau.prototype.cellBelow = function(cell) {
  cellList = this.cellList();
  var index = this.indexOf(cell);
  return cellList[index + this.columns]
};
