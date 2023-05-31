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

let redirectUrl;

function handleBeforeNavigate(details) {
    console.log("This is the handle before navigate");
    if (mode === 'mindful') {
        isUnproductiveSite(details.url, function (isUnproductive) {
            if (isUnproductive) {
                // Open a webpage showing a reminder
                chrome.tabs.update({url: '/popup/popup.html'});
            }
        });
    } else if (mode === 'focus') {

        console.log("Background.js: this is focus mode. Start to redirect.")
        isUnproductiveSite(details.url, function (isUnproductive) {
            if (isUnproductive){
                console.log("This is a test log in background.js");

                getTopProductiveSite(function(topSite) {
                    if (topSite) {
                        console.log('Top productive site:', topSite);
                        // Perform actions with the top productive site
                        console.log('redirect Url: ', redirectUrl);
                    } else {
                        console.log('No productive sites available. If you want to be rerouted for unproductive sites, ' +
                            'please add your target website in the productive site list. ');
                        // Handle the case when no productive sites are available
                    }
                });

                // redirectedTabs[details.tabId] = true; // Mark tab as redirected
                console.log(details.tabId);
                chrome.tabs.update(details.tabId, { url: redirectUrl });

            }
        });
    }
}


// Establish a dictionary, if url in this dictionary, no need to check?

// Register the event listener with proper unregistering
chrome.webNavigation.onBeforeNavigate.addListener(handleBeforeNavigate);


// Function to handle messages from the popup.js script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'removeListener') {
        // Remove the listener
        chrome.webNavigation.onBeforeNavigate.removeListener(handleBeforeNavigate);
    } else if (message.action === 'addListener') {
        // Add the listener again
        chrome.webNavigation.onBeforeNavigate.addListener(handleBeforeNavigate);
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


// Function to retrieve the productive sites list from Chrome storage
function getProductiveSites(callback) {
    chrome.storage.sync.get('productiveSites', function(result) {
        const taskList = result.productiveSites || [];
        callback(taskList);
    });
}

// Function to get the top element of the productive sites list
function getTopProductiveSite(callback) {
    getProductiveSites(function(taskList) {
        const topSite = taskList.length > 0 ? taskList[0] : null;
        redirectUrl = topSite;
        callback(topSite);
    });
}




