// Retrieve the selected mode from storage or toggle state
var mode = 'mindful'; // Replace with the actual method to retrieve the selected mode
console.log("This is a log from background")

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.mode) {
        // Access the mode value received from togglescript.js
        console.log('Mode received in background:', request.mode);
        // Perform further actions with the mode value as needed
        mode = request.mode;
    }
});


chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
    if (mode === 'mindful') {
        if (isUnproductiveSite(details.url)) {
            // Open a webpage showing a reminder
            chrome.tabs.create({ url: '/popup/popup.html' });
            chrome.tabs.remove(details.tabId); // Close the original tab
        }
    } else if (mode === 'focus') {
        console.log("Background.js: this is focus mode. Start to redirect.")
        isUnproductiveSite(details.url, function (isUnproductive) {
            if (isUnproductive){
                console.log("This is a test log in background.js");
                const redirectUrl = 'https://www.scu.edu';
                chrome.tabs.update(details.tabId, { url: redirectUrl });
            }

        });
    }
});


// Function to check if the URL belongs to an unproductive site
function isUnproductiveSite(url, callback) {
    getUnproductiveSites(function(sitesList) {
        const isUnproductive = sitesList.some(site => url.includes(site));
        callback(isUnproductive);
    });
}


// Function to retrieve the unproductive sites list from Chrome storage
function getUnproductiveSites(callback) {
    chrome.storage.sync.get('unproductiveSites', function(result) {
        const sitesList = result.unproductiveSites || [];
        callback(sitesList);
    });
}




