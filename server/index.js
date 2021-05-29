const express = require('express'); //Requerimos express para programa-servidor
const socketIo = require('socket.io'); //Requerimos la biblioteca para enviar los datos al cliente
const http = require('http'); 

const app = express(); //Inicializamos express
const server = http.createServer(app); //Se inicializa el servidor
const io = require('socket.io')(server);
app.use(express.static('server'));
io.on('connection', function(socket){
    console.log('a new socket connected');
});

//Manejador de peticiones, envia el html.
app.get('/', (req, res, next) =>{
    res.sendFile(__dirname + '/index.html');
});

const SerialPort = require('serialport'); //Requerimos la biblioteca SerialPort
const Readline = SerialPort.parsers.Readline; //Nos permite leer las lineas de puerto serial
//Y almacenamos en una constante.
 //Hacemos uso.

//Definimos el puerto y la propiedad de baudios.
const mySerial = new SerialPort('COM4', { 
    baudRate: 9600
});

//Abrimos la conexión
mySerial.on('open', function(){
    console.log('Opened Serial Port');
});

//Cuando escuche los datos, los recibe y los imprime en la consola.
/*mySerial.on('data', function (data){
    let lpm = data.toString();
    console.log(lpm); //Convertimos los datos crudos en Strings.
    io.emit('lpm', data);
});*/

//En caso que ocurra un error se maneja con un mensaje.
mySerial.on('err', function(err){
    console.log(err.message);
});

const parser = mySerial.pipe(new Readline({ delimiter: '\r\n'}));

parser.on('open', function(){
    console.log('connection is opened');
});

parser.on('data', function(data){
    let lpm = parseInt(data, 10);
    console.log(lpm);
    io.emit('lpm', data);
})

//LocalHost del servidor
server.listen(3000, () => {
    console.log('server on port ', 3000);
});