// chrome.notifications.create('', {
//   title: 'Transfer Complete',
//   message: 'Ether Transfer Successful',
//   iconUrl: '/logo192.png',
//   type: 'basic'
// });
// chrome.runtime.sendMessage('', {
//   type: 'notification',
//   options: {
//     title: 'Transfer Complete',
//     message: 'Ether Transfer Successful',
//     iconUrl: '/logo192.png',
//     type: 'basic'
//   }
// });
window.addEventListener('transfer', (event) => {
  console.log('transfer event happened in listener', event);
  chrome.runtime.sendMessage('', {
    type: 'notification',
    options: {
      title: 'Transfer Complete',
      message: 'Ether Transfer Successful',
      iconUrl: '/logo192.png',
      type: 'basic'
    }
  });
})
