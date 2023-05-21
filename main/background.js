// Retrieve the selected mode from storage or toggle state
var mode = 'mindful'; // Replace with the actual method to retrieve the selected mode

chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
    if (details.url.includes('www.youtube.com') && mode === 'mindful') {
        // Open a webpage showing a reminder
        chrome.tabs.create({ url: '/popup/popup.html' });
        chrome.tabs.remove(details.tabId); // Close the original tab
    }
});

