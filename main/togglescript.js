const el = document.querySelector('.toggle');

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

}
