// Retrieve the selected mode from storage or toggle state
var mode = 'mindful'; // Replace with the actual method to retrieve the selected mode
console.log("This is a log from background")

// Declare an object to store the tab IDs and their corresponding popup status

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.mode) {
        // Access the mode value received from togglescript.js
        console.log('Mode received in background:', request.mode);
        // Perform further actions with the mode value as needed
        mode = request.mode;
    }
});

let redirectUrl;
let originalUrl;


function handleBeforeNavigate(details) {
    console.log("This is the handle before navigate");

    if (mode === 'mindful' ) {


        chrome.storage.local.get(['targetUrl'],function(localData){
            console.log(localData)
            var urlList = localData.targetUrl||[];

            if(!localData.targetUrl){
                isUnproductiveSite(details.url, function (isUnproductive) {
                    if (isUnproductive) {
                        originalUrl = details.url;
                        // Open a webpage showing a reminder

                        chrome.tabs.create({ url: '/popup/popup.html' }, function(popupTab) {
                            // Once the popup tab is created, send the original URL to it
                            // sendOriginalUrlToPopup(popupTab.id);

                            chrome.storage.local.set({'targetUrl':details.url});

                        });

                        chrome.tabs.remove(details.tabId); // Close the original tab

                    }
                });
            }
        });


    } else if (mode === 'focus' ) {

        console.log("Background.js: this is focus mode. Start to redirect.")
        isUnproductiveSite(details.url, function (isUnproductive) {
            if (isUnproductive){
                getTopProductiveSite(function(topSite) {
                    if (topSite) {
                        console.log('Top productive site:', topSite);
                        // Perform actions with the top productive site
                        console.log('redirect Url: ', redirectUrl);
                        redirectUrl = formatUrlWithHttps(redirectUrl);

                        // redirectedTabs[details.tabId] = true; // Mark tab as redirected
                        console.log(details.tabId);
                        chrome.tabs.update(details.tabId, { url: redirectUrl });


                    } else {
                        console.log('No productive sites available. If you want to be rerouted for unproductive sites, ' +
                            'please add your target website in the productive site list. ');
                        // Handle the case when no productive sites are available
                    }
                });

            }
        });
    }
}



// Listener for messages from the popup or other parts of the extension
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'getOriginalUrl') {
        // Send the original URL to the popup
        sendResponse({ url: originalUrl });
    }
});

// Establish a dictionary, if url in this dictionary, no need to check?

// Register the event listener with proper unregistering
chrome.webNavigation.onBeforeNavigate.addListener(handleBeforeNavigate);


// Listener for messages from the popup or other parts of the extension

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'getOriginalUrl') {
        // Send the original URL to the popup
        sendResponse({ url: originalUrl });
    }  else if (message.action === 'removeListener') {
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

// Listener for new tab creation
chrome.tabs.onCreated.addListener(function(tab) {
    // Add the listener again for the newly created tab
    chrome.webNavigation.onBeforeNavigate.addListener(handleBeforeNavigate, { tabId: tab.id });
});



function formatUrlWithHttps(url) {
    // Check if the URL already starts with http:// or https://
    if (!/^https?:\/\//i.test(url)) {
        // If not, prepend the URL with https://
        url = "https://" + url;
    }
    return url;
}
