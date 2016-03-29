$(function(){
  var hash = window.location.hash.split('#')[1];
  if(hash){
    //https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/btoa#Unicode_strings
    var url = decodeURIComponent(unescape(window.atob(hash)));
    $('webview').attr('src',url);
  }
});
