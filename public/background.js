chrome.runtime.onMessage.addListener(data => {
  console.log('MESSAGE RECEIVED ======')
  if (data.type === 'notification') {
    if (data.)
    chrome.notifications.create('', data.options);
  }
});