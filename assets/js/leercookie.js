// JavaScript Document
//Función para encontrar el valor de una cookie
function readCookie(valor) {
var nombreIgual = valor + "=";
var numeroCookies = document.cookie.split(';');
for(var i=0;i < numeroCookies.length;i++) { //Recorremos todas las cookies
	var valorCookie = numeroCookies[i]; //Analizamos la cookie actual
	while (valorCookie.charAt(0)==' ') {
		valorCookie = valorCookie.substring(1,valorCookie.length); 
	} //Eliminamos espacios
	if (valorCookie.indexOf(nombreIgual) == 0) {
		return valorCookie.substring(nombreIgual.length,valorCookie.length);} //Devolvemos el valor
}
return null; //Si numeroCookies es cero se devuelve null
}

jQuery.event.special.touchmove = {
  setup: function( _, ns, handle ){
    if ( ns.includes("noPreventDefault") ) {
      this.addEventListener("touchmove", handle, { passive: false });
    } else {
      this.addEventListener("touchmove", handle, { passive: true });
    }
  }
};