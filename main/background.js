// Retrieve the selected mode from storage or toggle state
var mode = 'mindful'; // Replace with the actual method to retrieve the selected mode

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.mode) {
        // Access the mode value received from togglescript.js
        console.log('Mode received in background:', request.mode);
        // Perform further actions with the mode value as needed
        mode = request.mode;
    }
});


chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
    if (details.url.includes('www.youtube.com') && mode === 'mindful') {
        // Open a webpage showing a reminder
        chrome.tabs.create({ url: '/popup/popup.html' });
        chrome.tabs.remove(details.tabId); // Close the original tab
    }
});

