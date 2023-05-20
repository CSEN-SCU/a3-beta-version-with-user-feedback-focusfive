const element1 = document.querySelector('.addItemBtn');
const element2 = document.querySelector('.removeItemBtn');

if (element1) {
  document.querySelector('.addItemBtn').addEventListener('click', function() {
    addItem();
  });
}

if (element2) {
  document.querySelector('.removeItemBtn').addEventListener('click', function() {
    removeItem();
  }); 
}

function addItem () {  
  // Create new list item and append to the top
  var item = document.createElement("li");
  var x = document.getElementById("addItemInput").value;
  
  if (!x) {
    return;
  }
  else {
    item.innerHTML = x;
 
    document.getElementById("toDoList").insertAdjacentElement("afterbegin", item);
  
    // Alternate version for appending at the bottom (instead of top):
    // document.getElementById("toDoList").appendChild(item); 
  }
}

function removeItem() {
  // Get the list and all of its items
  var list = document.getElementById("toDoList");
  var allItems = document.querySelectorAll("#toDoList li");
  
  // Remove item from top of list
  list.removeChild(allItems[0]);
  
  // Alternate version to remove item from bottom of list
  // var last = allItems.length - 1;
  // list.removeChild(allItems[last]);
}