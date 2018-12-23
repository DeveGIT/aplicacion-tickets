/**
 * 

 */
const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');


const ticketControl = new TicketControl();

// Para evitar que el servidor se reinicie cada vez que recibe una petición,
// escribiremos este comando para que solo esté pendiente de los cambios de js y html y así evitar que se reinicie cuando detecte un cambio en data.json
// "nodemon server/server -e js,html"

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {

        console.log('Respuesta del servidor');

        let siguiente = ticketControl.siguiente();

        console.log(siguiente);

        callback(siguiente);

    });

    // emitir un evento
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }


        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        // actualizar/ notificar cambios en los ULTIMOS 4
        client.broadcast.emit('ActualizaLosUltimos4', {
            ultimos4: ticketControl.getUltimos4()
        });

        console.log(ticketControl.getUltimos4());


    });

});