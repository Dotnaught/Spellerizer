document.querySelector("button").addEventListener("click", (event) => {
  // Permissions must be requested from inside a user gesture, like a button's
  // click handler.
  window.close();
});
