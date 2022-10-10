var msgs = document.querySelectorAll("[data-i18n]");

for (var i = 0; i < msgs.length; i++) {
  var translated = chrome.i18n.getMessage(msgs[i].getAttribute("data-i18n"));
  if (msgs[i].value === "i18n") {
    msgs[i].value = translated;
  } else {
    msgs[i].innerText = translated;
  }
}
