const element = document.querySelector('.addItemBtn');

if (element) {
  document.querySelector('.addItemBtn').addEventListener('click', function() {
    addItem();
  });
}

function addItem () {  
  // Create new list item and append to the top
  var item = document.createElement("li");
  var x = document.getElementById("addItemInput").value;
  item.innerHTML = x;
 
  document.getElementById("toDoList").insertAdjacentElement("afterbegin", item);
  
  // Alternate version for appending at the bottom (instead of top):
  // document.getElementById("toDoList").appendChild(item);
}

