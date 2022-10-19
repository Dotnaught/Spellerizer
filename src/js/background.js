chrome.runtime.onInstalled.addListener((r) => {
  if (r.reason === "install") {
    showReadme();
  }
});

function showReadme() {
  let url = chrome.runtime.getURL("html/onboarding-page.html");
  chrome.tabs.create({ url });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message >= 0) {
    chrome.action.setBadgeText({ text: request.message.toString(), tabId: sender.tab.id });
  } else {
    chrome.action.setBadgeText({ text: "", tabId: sender.tab.id });
  }
});

chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.includes("chrome://") && tab.url.includes("theregister")) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        files: ["js/content-script.js"],
      },
      async () => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        }
      }
    );
  }
});
