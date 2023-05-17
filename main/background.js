chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [{
      'id': 1001,
      'priority': 1,
      'action': {
        'type': 'redirect',
        'redirect': {
          url: 'https://www.facebook.com'
        }
      },
      'condition': {
        'urlFilter': 'https://www.twitter.com',
        'resourceTypes': [
          'csp_report', 'font', 'image', 'main_frame', 'media', 'object', 'other', 'ping', 'script',
          'stylesheet', 'sub_frame', 'webbundle', 'websocket', 'webtransport', 'xmlhttprequest'
        ]
      }
    }],
   removeRuleIds: [1001]
  })