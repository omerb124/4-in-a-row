import openSocket from 'socket.io-client';
const socket = openSocket('http://89.139.198.130:5000');

function getRoomData(cb) {
    socket.on('retRoomData', (v) => {
        // Client gets server response
        cb(null, v);
    });
    socket.emit('getRoomData', 1000, "2rfLFPs");
}

function createRoom(Player,cb) {
    socket.on('roomOpened', (v) => {
        cb(null, v);
    });
    socket.emit('createRoom',Player);
}

function waitForGameToStart(cb){
    socket.on('startGame',(v) => {
        cb(null,v);
    });
}

function joinRoom(player,roomId, cb) {
    socket.on('startGame', (v) => {
        console.log(v);
        cb(null, v);
    });
    socket.emit('joinRoom', roomId,player);
}

function doTurn(roomId,playerId,newBoard){
    socket.emit("doTurn", roomId,playerId, newBoard);
}

function getUpdate(cb){
    socket.on("gameUpdate", (v) => {
        console.log("...!!!");
        cb(null,v);
    });
}

export { getRoomData, createRoom, joinRoom, waitForGameToStart, doTurn, getUpdate };