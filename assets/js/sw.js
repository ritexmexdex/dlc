// JavaScript Document
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('assets/js/serviceWorker.js').then(function(registration) {
      // Registration was successful
      console.log('Registro de servicio:', registration.scope);
    }).catch(function(err) {
      // registration failed :(
      console.log('Fallo de registro de servicio: ', err);
    });
  });
}