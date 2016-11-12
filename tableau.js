// Tableau class
function createTableau(name, left, top, columns, rows, width, height) {
  var currentCell;
  // Create style tag to position table
  var tableauStyle = document.createElement("style");
  tableauStyle.type = "text/css";
  var styleText = "#" + "name" + " { ";
  styleText += "position: absolute; ";
  styleText += "left: " + left + "px; ";
  styleText += "top: " + width + "px; ";
  styleText += "border: 1px solid black; ";
  styleText += " }";
  // tableauStyle.styleSheet.cssText = styleText;
  var styleNode = document.createTextNode(styleText);
  tableauStyle.appendChild(styleNode);
  document.getElementsByTagName('head')[0].appendChild(tableauStyle);
  // Create table
  var newTable = document.createElement("table");
  newTable.setAttribute("id", name);
  // Append table entries
  for(var row=0; row < rows; row ++) {
    var currentRow = document.createElement("tr");
    for(var column=0; column < columns; column ++) {
      // Create table entry
      var currentCell = document.createElement("td");
      // Create div within table entry
      var currentDiv = document.createElement("div");
      // Set dimensions of div
      // currentDiv.setAttribute("height", height + "px");
      // currentDiv.setAttribute("width", width + "px");
      // "height:20px; width:60px"
      currentDiv.style.height = height + "px";
      currentDiv.style.width = width + "px";
      var currentImg = document.createElement("img");
      currentImg.setAttribute("src", "images/sa.bmp");
      // Append to table
      currentDiv.appendChild(currentImg);
      currentCell.appendChild(currentDiv);
      currentRow.appendChild(currentCell);
    }
    newTable.appendChild(currentRow);
  }
  // Append table to DOM
  document.body.appendChild(newTable);
}