
function NameArea(name) {
  this.name = name;
}

// Create style tag to position nameArea
// left, top indicate the location of the upper left corner
NameArea.prototype.appendStyle = function(left, top) {
  var nameStyle = document.createElement("style");
  nameStyle.type = "text/css";
  var styleText = "#" + this.name + " { ";
  styleText += "position: absolute; ";
  styleText += "left: " + left + "px; ";
  styleText += "top: " + top + "px; ";
  styleText += " }";
  // Append style to head of document
  var styleNode = document.createTextNode(styleText);
  nameStyle.appendChild(styleNode);
  document.getElementsByTagName('head')[0].appendChild(nameStyle);
};


// Append table to DOM
// cellWidth, cellHeight are dimensions of table cells
NameArea.prototype.appendElement = function() {
  // Create table
  var newDiv = document.createElement("div");
  newDiv.setAttribute("id", this.name);
  newDiv.setAttribute("class", "nameArea");
  newDiv.innerHTML = this.name;
  // Append table to body of document
  document.body.appendChild(newDiv);
};

// Class method to generate NameArea and place it on the DOM
NameArea.generate = function(name, left, top) {
  newNameArea = new NameArea(name);
  newNameArea.appendStyle(left, top);
  newNameArea.appendElement();
  return newNameArea
};
