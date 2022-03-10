// chrome.runtime.onInstalled.addListener(function() {
//   chrome.storage.sync.set({color: '#3aa757'}, function() {
//     console.log("The color is green.");
//   });
  // chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  //   chrome.declarativeContent.onPageChanged.addRules([{
  //     conditions: [new chrome.declarativeContent.PageStateMatcher({
  //       pageUrl: {hostEquals: 'developer.chrome.com'},
  //     })
  //     ],
  //         actions: [new chrome.declarativeContent.ShowPageAction()]
  //   }]);
  // });
// })

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.message === "getStatus") {
//     chrome.storage.sync.get("status", (r) => {
//       sendResponse({
//         status: r.status
//       });
//     });
//   }
// })
// browser.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
//   if (msg.text == "tab_id") {
//       sendResponse({tab: sender.tab.id});
//    }
// });