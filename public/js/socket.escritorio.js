/**
 * 
 * 
 */

// Comando para establecer la conexión
var socket = io();

var searchParams = new URLSearchParams(window.location.search); // Obtenemos todos los parámetros que vienen por la URL

if (!searchParams.has('escritorio')) {
    window.location = index.html;
    throw new Error('El escritorio es necesario'); //Al usar throw new Error, conseguimos que no se siga ejecutando el resto del js, no se puede usario return por que no estmaos dentro de una función.

}


var escritorio = searchParams.get('escritorio');
var label = $('small');

console.log(escritorio);

$('h1').text('Escritorio ' + escritorio);



$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        if (resp === 'No hay tickets') {
            alert(resp);
            return;
        }

        label.text('Ticket ' + resp.numero);

    });

});