// Constructor function for tableau
// function Tableau(name, left, top, columns, rows, width, height) {
//   this.name = name;  // Must be unique
//   this.left = left;  // Location of left edge
//   this.top = top;   // Location of top edge
//   this.columns = columns;  // Number of columns
//   this.rows = rows;  // Number of rows
//   this.width = width;  // Width of cell (card is 60px)
//   this.height = height;  // Height of cell (card is 80px)
// }

function Tableau(name) {
  this.name = name;  // Must be unique
}

// Create style tag to position table
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
Tableau.prototype.appendTable = function(columns, rows, width, height) {
  // Create table
  var newTable = document.createElement("table");
  newTable.setAttribute("id", this.name);
  // Append table entries
  for(var row=0; row < rows; row ++) {
    var currentRow = document.createElement("tr");
    for(var column=0; column < columns; column ++) {
      // Create table entry
      var currentCell = document.createElement("td");
      // Create div within table entry
      var currentDiv = document.createElement("div");
      currentDiv.setAttribute("class", this.name);
      // Set dimensions of div
      currentDiv.style.height = height + "px";
      currentDiv.style.width = width + "px";
      currentDiv.addEventListener("drop", this.drop.bind(this));
      currentDiv.addEventListener("dragover", this.dragover.bind(this));

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

// Helper to determine whether a cell is a valid target
Tableau.prototype.validTarget = function(card, destination) {
  return destination.className == this.name;
};

Tableau.prototype.dragover = function(event) {
  console.log(event.target.className);
  if(this.validTarget(null, event.target)) {
    event.preventDefault();
  }
};

Tableau.prototype.drop = function(event) {
  var cell = event.target;
  // Clear the cell
  // cell.removeChild(cell.firstChild);
  var data = event.dataTransfer.getData("text");
  cell.appendChild(document.getElementById(data));
};

// Class method to generate tableau and place it on the DOM
Tableau.generate = function(name, left, top, columns, rows, width, height) {
  newTableau = new Tableau(name);
  newTableau.appendStyle(left, top);
  newTableau.appendTable(columns, rows, width, height);
  return newTableau
};
