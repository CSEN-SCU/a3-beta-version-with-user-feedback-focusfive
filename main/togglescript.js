document.querySelector('.toggle').addEventListener('click', function() {
  toggleFunction();
});

function toggleFunction() {
  var x = document.getElementById("toggle");
  if (x.innerHTML === "Mindful Mode") {
    x.innerHTML = "Focus Mode";
  } else {
    x.innerHTML = "Mindful Mode";
  }
}