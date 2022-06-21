chrome.runtime.onMessage.addListener(data => {
    console.log('MESSAGE RECEIVED ======')
    if (data.type === 'notification') {
      chrome.notifications.create('', data.options);
    }
  });