console.log('content script working .... ');
document.addEventListener('sent', (payload) => {
  console.log('event happened .... : ', payload)
})