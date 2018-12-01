import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');

function getRoomData(cb) {
    socket.on('retRoomData', (v) => {
        // Client gets server response
        cb(null, v);
    });
    socket.emit('getRoomData', 1000, "2rfLFPs");
}

function createRoom(cb) {
    socket.on('roomOpened', (v) => {
        cb(null, v);
    });
    socket.emit('createRoom');
}

function addPlayer(settings, cb) {
    socket.on('playerAdded', (v) => {
        cb(null, v);
    });
    socket.emit('playerJoined', settings);
}

export { getRoomData, createRoom, addPlayer };