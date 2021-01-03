/** @format */

chrome.runtime.onInstalled.addListener(function () {
  // In case the plugin has been installed before, use the value
  // that was set by the user previously instead of resetting
  let isActive = true;
  chrome.storage.sync.get(["active"], function (res) {
    if (!(Object.keys(res).length === 0)) {
      isActive = res.active;
    }
  });

  // Insert value into storage, nothing has to happen with it
  // so the function can be empty
  chrome.storage.sync.set({ active: isActive }, function () {
    console.log(isActive);
  });
});
