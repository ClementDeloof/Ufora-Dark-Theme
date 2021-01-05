/** @format */

chrome.runtime.onInstalled.addListener(() => {
  // In case the plugin has been installed before, use the value
  // that was set by the user previously instead of resetting
  let isActive = true;
  chrome.storage.sync.get(["active"], (res) => {
    if (Object.keys(res).length !== 0) {
      isActive = res.active;
    }
  });

  // Insert value into storage, nothing has to happen with it
  // so the function can be empty
  chrome.storage.sync.set({ active: isActive }, () => {});
});

// Only execute script when tab is updated (not every time a tab is opened)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // If extension is currently not active, do nothing
  chrome.storage.sync.get(["active"], (res) => {
    if (Object.keys(res).length === 0 || !res.active) {
      return;
    }
  });

  // Test the URL to avoid throwing errors (chrome:// pages!)
  const regex = RegExp("^https://ufora.ugent.be/*");
  if (regex.test(tab.url)) {
    chrome.tabs.insertCSS(null, { file: "./dark.css" });
    chrome.tabs.executeScript(null, { file: "./foreground.js" }, () => {});
  }
});
