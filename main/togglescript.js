const toggleLabel = document.getElementById('toggle');
const el = document.querySelector('.toggle');

// Retrieve the mode from storage on extension load
chrome.storage.sync.get('mode', function(result) {
  const mode = result.mode;
  if (mode === 'focus') {
    toggleLabel.innerHTML = 'Focus Mode';
    el.checked = true;
  } else {
    toggleLabel.innerHTML = 'Mindful Mode';
    el.checked = false;
  }

  chrome.runtime.sendMessage({ mode: mode }), function(){
  console.log('Message sent to background:', mode);
  };


});

if (el) {
  console.log("This is a log in togglescript")
  document.querySelector('.toggle').addEventListener('click', function() {
    toggleFunction(handleToggleMode);
  });
}


function toggleFunction(callback) {
  var x = document.getElementById("toggle");
  if (x.innerHTML === "Mindful Mode") {
    x.innerHTML = "Focus Mode";
    if (typeof callback === 'function') {
      callback('focus');
    }
    console.log('Selected mode', x.innerHTML);
  } else {
    x.innerHTML = "Mindful Mode";
    if (typeof callback === 'function') {
      callback('mindful');
    }
    console.log('Selected mode', x.innerHTML);
  }

}


function handleToggleMode(mode) {
  // Do something with the mode value, such as updating the manifest.json
  console.log('Mode received:', mode);
  chrome.runtime.sendMessage({mode: mode});


  // Update the storage value for the mode
  chrome.storage.sync.set({ mode: mode }, function() {
    console.log('Mode saved:', mode);
  });

  // Update the toggle label
  const toggleLabel = document.getElementById('toggle');
  toggleLabel.innerHTML = mode === 'focus' ? 'Focus Mode' : 'Mindful Mode';

}
