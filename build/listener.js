// chrome.runtime.sendMessage('', {
//     type: 'notification',
//     options: {
//       title: 'Transfer Complete',
//       message: 'Ether Transfer Successful',
//       iconUrl: '/logo192.png',
//       type: 'basic'
//     }
//   })
console.log('WINDOW FOR LISTENER ======>', window);
var port = chrome.runtime.connect();
window.addEventListener('transfer', (event) => {
  console.log('transfer event happened in listener', event);
  port.postMessage({
    type: 'notification',
    transactionHash: event.detail.transactionHash,
    options: {
      title: 'Transfer Complete',
      message: 'Ether Transfer Successful',
      iconUrl: '/logo192.png',
      type: 'basic',
      priority: 2,
      isClickable: true
    }
  })
})
// port.postMessage("Hi BackGround");
port.onMessage.addListener(function(msg) {
  console.log("message recieved" + msg);
});