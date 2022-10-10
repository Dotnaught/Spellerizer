function $(id) {
  return document.getElementById(id);
}

function saveOptions() {
  chrome.storage.sync.set({ checkbox: $("checkbox").checked });
}

function getOptions() {
  chrome.storage.sync.get(["checkbox"], function (items) {
    if (items["checkbox"] == true) $("checkbox").checked = true;
  });

  // scan for all input elements
  var inputs = document.querySelectorAll("input");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("change", saveOptions);
  }
}

document.addEventListener("DOMContentLoaded", getOptions);
document.querySelector("button").addEventListener("click", (event) => {
  window.close();
});
