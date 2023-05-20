const element1 = document.querySelector('.addTaskBtn');
const element2 = document.querySelector('.removeTaskBtn');

if (element1) {
  document.querySelector('.addTaskBtn').addEventListener('click', function() {
    addTaskItem();
  });
}

if (element2) {
  document.querySelector('.removeTaskBtn').addEventListener('click', function() {
    removeTaskItem();
  }); 
}

function addTaskItem () {  
  // Create new list item and append to the top
  var item = document.createElement("li");
  var x = document.getElementById("addTaskInput").value;
  
  if (!x) {
    return;
  }
  else {
    item.innerHTML = x;
 
    document.getElementById("taskList").insertAdjacentElement("afterbegin", item);
  
    // Alternate version for appending at the bottom (instead of top):
    // document.getElementById("toDoList").appendChild(item); 
  }
}

function removeTaskItem() {
  // Get the list and all of its items
  var list = document.getElementById("taskList");
  var allItems = document.querySelectorAll("#taskList li");
  
  // Remove item from top of list
  list.removeChild(allItems[0]);
  
  // Alternate version to remove item from bottom of list
  // var last = allItems.length - 1;
  // list.removeChild(allItems[last]);
}