const element1 = document.querySelector('.addTaskBtn');
const element2 = document.querySelector('.removeTaskBtn');
const element2a = document.querySelector('.clearTaskListBtn');

if (element1) {
  document.querySelector('.addTaskBtn').addEventListener('click', function() {
    addTaskItem();
  });
  document.getElementById('addTaskInput').addEventListener("keydown", function(event) {
    if (event.keyCode === 13 && document.getElementById('addTaskInput').value.length > 0) {
      addTaskItem();
    }
  });
}

if (element2) {
  document.querySelector('.removeTaskBtn').addEventListener('click', function() {
    removeTaskItemTop();
  });
}

if (element2a) {
  document.querySelector('.clearTaskListBtn').addEventListener('click', function() {
    clearTaskList();
  });
}


const element3 = document.querySelector('.addSiteBtn');
const element4 = document.querySelector('.removeSiteBtn');
const element4a = document.querySelector('.clearSiteListBtn');

if (element3) {
  document.querySelector('.addSiteBtn').addEventListener('click', function() {
    addSiteItem();
  });
  document.getElementById('addSiteInput').addEventListener("keydown", function(event) {
    if (event.keyCode === 13 && document.getElementById('addSiteInput').value.length > 0) {
      addSiteItem();
    }
  });
}

if (element4) {
  document.querySelector('.removeSiteBtn').addEventListener('click', function() {
    removeSitesItemTop();
  });
}

if (element4a) {
  document.querySelector('.clearSiteListBtn').addEventListener('click', function() {
    clearSitesList();
  });
}


// Productive sites
function addTaskItem () {
  // Create new list item and append to the top
  const taskInput = document.getElementById('addTaskInput');
  const task = taskInput.value.trim();

  if (!task) {
    return;
  }
  else {

    // Get the current unproductive sites list from storage
    getProductiveSites(function(taskList) {
      // Add the new site to the list
      taskList.push(task);

      // Save the updated list to storage
      saveProductiveSites(taskList);

      // Reset the input field
      taskInput.value = '';

      // Update the displayed list
      updateTaskList(taskList);
    });
  };
}

function removeTaskItem(event) {
  const listItem = event.target.parentNode;
  const list = listItem.parentNode;
  const siteToRemove = listItem.querySelector('span').textContent;

  // Get the current productive sites list from storage
  getProductiveSites(function (taskList) {
    // Find the index of the site to remove
    const index = taskList.indexOf(siteToRemove);

    if (index !== -1) {
      // Remove the site from the list
      taskList.splice(index, 1);

      // Save the updated list to storage
      saveProductiveSites(taskList);

      // Remove the item from the displayed list
      list.removeChild(listItem);
    }
  });
}

function removeTaskItemTop() {
  const list = document.getElementById('taskList');
  const allItems = document.querySelectorAll('#taskList li');

  if (allItems.length > 0) {
    const listItem = allItems[0];
    const siteToRemove = listItem.querySelector('span').textContent;

    // Get the current productive sites list from storage
    getProductiveSites(function (taskList) {
      // Find the index of the site to remove
      const index = taskList.indexOf(siteToRemove);

      if (index !== -1) {
        // Remove the site from the list
        taskList.splice(index, 1);

        // Save the updated list to storage
        saveProductiveSites(taskList);

        // Remove the item from the displayed list
        list.removeChild(listItem);
      }
    });
  }
}

function clearTaskList () {
  // Get the current productive sites list from storage
  getProductiveSites(function (taskList) {
    taskList = [];
    saveProductiveSites(taskList);

    // Remove all items from the displayed list
    updateTaskList(taskList);
  });
}



// Unproductive sites
function addSiteItem () {
  // Create new list item and append to the top
  const siteInput = document.getElementById('addSiteInput');
  const site = siteInput.value.trim();

  if (!site) {
    return;
  }
  else {

    // Get the current unproductive sites list from storage
    getUnproductiveSites(function(sitesList) {
      // Add the new site to the list
      sitesList.push(site);

      // Save the updated list to storage
      saveUnproductiveSites(sitesList);

      // Reset the input field
      siteInput.value = '';

      // Update the displayed list
      updateSitesList(sitesList);
    });
  };
}

function removeSitesItem(event) {
  const listItem = event.target.parentNode;
  const list = listItem.parentNode;
  const siteToRemove = listItem.querySelector('span').textContent;

  // Get the current productive sites list from storage
  getUnproductiveSites(function (sitesList) {
    // Find the index of the site to remove
    const index = sitesList.indexOf(siteToRemove);

    if (index !== -1) {
      // Remove the site from the list
      sitesList.splice(index, 1);

      // Save the updated list to storage
      saveUnproductiveSites(sitesList);

      // Remove the item from the displayed list
      list.removeChild(listItem);
    }
  });
}

function removeSitesItemTop() {
  const list = document.getElementById('sitesList');
  const allItems = document.querySelectorAll('#sitesList li');

  if (allItems.length > 0) {
    const listItem = allItems[0];
    const siteToRemove = listItem.querySelector('span').textContent;

    // Get the current productive sites list from storage
    getUnproductiveSites(function (sitesList) {
      // Find the index of the site to remove
      const index = sitesList.indexOf(siteToRemove);

      if (index !== -1) {
        // Remove the site from the list
        sitesList.splice(index, 1);

        // Save the updated list to storage
        saveUnproductiveSites(sitesList);

        // Remove the item from the displayed list
        list.removeChild(listItem);
      }
    });
  }
}

function clearSitesList () {
  // Get the current unproductive sites list from storage
  getUnproductiveSites(function (sitesList) {
    sitesList = [];
    saveUnproductiveSites(sitesList);

    // Remove all items from the displayed list
    updateSitesList(sitesList);
  });
}



// ================ Supportive functions for the productive sites ================
// Save the productive sites list to Chrome storage
function saveProductiveSites(taskList) {
  chrome.storage.sync.set({ productiveSites: taskList }, function() {
    console.log('Productive sites list saved:', taskList);
  });
}

// Retrieve the productive sites list from Chrome storage
function getProductiveSites(callback) {
  chrome.storage.sync.get('productiveSites', function(result) {
    const taskList = result.productiveSites || [];
    console.log('Productive sites list retrieved:', taskList);
    callback(taskList);
  });
}

// Function to update the displayed list of productive sites
function updateTaskList(taskList) {
  const list = document.getElementById('taskList');

  // Clear the existing list
  list.innerHTML = '';

  // Add the sites to the list
  for (const site of taskList) {
    const listItem = document.createElement('li');
    const span = document.createElement('span');
    span.contentEditable = true;
    span.textContent = site;

    const anchor = document.createElement('a');
    anchor.textContent = '';
    anchor.addEventListener('click', function(event){
      removeTaskItem(event);
    });

    listItem.appendChild(span);
    listItem.appendChild(anchor);
    list.appendChild(listItem);
  }
}


document.addEventListener('DOMContentLoaded', function() {
  // Get the current productive sites list from storage
  getProductiveSites(function(taskList) {
    // Update the displayed list
    updateTaskList(taskList);
  });
});




// ================ Supportive functions for the unproductive sites ================
// Save the unproductive sites list to Chrome storage
function saveUnproductiveSites(sitesList) {
  chrome.storage.sync.set({ unproductiveSites: sitesList }, function() {
    console.log('Unproductive sites list saved:', sitesList);
  });
}

// Retrieve the unproductive sites list from Chrome storage
function getUnproductiveSites(callback) {
  chrome.storage.sync.get('unproductiveSites', function(result) {
    const sitesList = result.unproductiveSites || [];
    console.log('Unproductive sites list retrieved:', sitesList);
    callback(sitesList);
  });
}

// Function to update the displayed list of unproductive sites
function updateSitesList(sitesList) {
  const list = document.getElementById('sitesList');

  // Clear the existing list
  list.innerHTML = '';

  // Add the sites to the list
  for (const site of sitesList) {
    const listItem = document.createElement('li');
    const span = document.createElement('span');
    span.contentEditable = true;
    span.textContent = site;

    const anchor = document.createElement('a');
    anchor.textContent = '';
    anchor.addEventListener('click', function(event){
      removeSitesItem(event);
    });

    listItem.appendChild(span);
    listItem.appendChild(anchor);
    list.appendChild(listItem);
  }
}


document.addEventListener('DOMContentLoaded', function() {
  // Get the current unproductive sites list from storage
  chrome.storage.sync.get('unproductiveSites', function(result) {
    const sitesList = result.unproductiveSites || [];

    // Update the displayed list
    updateSitesList(sitesList);
  });

});


