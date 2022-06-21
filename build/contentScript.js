console.log('content script working .... ');
console.log('DOCUMENT =====> ', document, window);
document.addEventListener('sent', (payload) => {
  console.log('event happened .... : ', payload)
})