
// chrome.runtime.onInstalled.addListener(function() {
//   chrome.notifications.create({
//     title: 'Transfer Complete',
//     message: 'Ether Transfer Successful',
//     iconUrl: '/logo192.png',
//     type: 'basic'
//   });
// });
// chrome.runtime.onMessage.addListener(data => {
//   console.log('MESSAGE RECEIVED ======')
//   if (data.type === 'notification') {
//     chrome.notifications.create('', data.options);
//   }
// });
var transactionHash;
chrome.runtime.onConnect.addListener(function (port) {
  console.log("Connected .....");
  port.onMessage.addListener(function (msg) {
    console.log("message recieved", msg);
    port.postMessage("Background: Hi Extension!");
    if (msg?.type === 'notification') {
      transactionHash = msg.transactionHash;
      chrome.notifications.create('', msg.options);
    }
  });
  chrome.notifications.onClicked.addListener(function (notifId) {
    chrome.tabs.create({ url: `https://goerli.etherscan.io/tx/${transactionHash}` })
  });
})