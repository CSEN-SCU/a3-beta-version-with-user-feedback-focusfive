let originalUrl;

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the "No" and "Yes" buttons
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');

    // Add click event listener to the "No" button
    noBtn.addEventListener('click', function() {
        // Close the popup window
        window.close();
    });

    // Add click event listener to the "Yes" button
    yesBtn.addEventListener('click', function() {
        // Send a message to background.js to remove the listener
        chrome.runtime.sendMessage({ action: 'removeListener' });

        // Call the function to retrieve the original URL
        getOriginalUrlFromBackground(function(originalUrl) {
            console.log('Original URL:', originalUrl);
            let url = formatUrlWithHttps(originalUrl);


            // Open the URL in a new tab
            chrome.tabs.create({ url: url }, function() {
                // Close the popup window after the new tab is opened
                window.close();
            });


            // Send a message to background.js to add the listener again
            chrome.runtime.sendMessage({ action: 'addListener' });
        });

x
    });
});



// Function to send a message to the background script to get the original URL
function getOriginalUrlFromBackground(callback) {
    chrome.runtime.sendMessage({ action: 'getOriginalUrl' }, function(response) {
        const originalUrl = response.url;
        // Use the originalUrl value as needed
        console.log('Original URL:', originalUrl);
       callback(originalUrl);
    });
}

function formatUrlWithHttps(url) {
    // Check if the URL already starts with http:// or https://
    if (!/^https?:\/\//i.test(url)) {
        // If not, prepend the URL with https://
        url = "https://" + url;
    }
    return url;
}
