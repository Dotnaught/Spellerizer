var replamentCount = 0;
var words = chrome.runtime.getURL("data/spelling_data.json");

function matchCase(text, source) {
  var result = "";

  for (var i = 0; i < text.length; i++) {
    var t = text.charAt(i);
    var s = source.charCodeAt(i);

    if (s >= 65 && s < 65 + 26) {
      result += t.toUpperCase();
    } else {
      result += t.toLowerCase();
    }
  }
  return result;
}

function scanWords(str, words) {
  return str
    .split(" ")
    .map((item) => {
      if (item !== "") {
        for (let k = 0; k < words.length; k++) {
          if (item.toLowerCase() === words[k][1]) {
            console.log(`Replaced ${words[k][1]} with ${words[k][0]}`);
            replamentCount++;
            return matchCase(words[k][0], item);
          }
        }
        return item;
      }
    })
    .join(" ");
}

async function getWords() {
  try {
    const response = await fetch(words);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function checkParent(parent, child) {
  if (parent.contains(child)) {
    return true;
  } else {
    return false;
  }
}

getWords().then((data) => {
  replamentCount = 0;
  var el = document.querySelector("article");
  var elements = document.getElementsByTagName("*");

  for (let i = 0; i < elements.length; i++) {
    var e = elements[i];

    for (let j = 0; j < e.childNodes.length; j++) {
      var node = e.childNodes[j];

      if (node.nodeType === 3 && checkParent(el, node)) {
        var text = node.nodeValue;
        var replacedText = null;
        if (text.length > 0) {
          replacedText = scanWords(text, data["data"]);
        }

        if (replacedText !== text && replacedText !== null) {
          e.replaceChild(document.createTextNode(replacedText), node);
        }
      }
    }
  }
  chrome.runtime.sendMessage({ message: replamentCount });
});
