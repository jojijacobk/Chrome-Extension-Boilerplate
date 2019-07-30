// Called when the user clicks on the browser action.
//  Browser action - aka extension icon next to address bar.
chrome.browserAction.onClicked.addListener(tab => {
  // Send a message to the content script in active tab
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { message: 'clicked_browser_action' });
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Received a message from the content script
  if (request.message === 'open_new_tab') {
    chrome.tabs.create({ url: request.url });
  }
});
