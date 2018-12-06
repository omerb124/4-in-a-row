import openSocket from 'socket.io-client';
import axios from 'axios';
const server = "http://192.168.43.38:5000";
const socket = openSocket(server);

/** ************** Sockets ***************/

// Create room 
function createRoom(Player, cb) {
    socket.on('roomOpened', (v) => {
        cb(null, v);
    });
    socket.emit('createRoom', Player);
}

// Listen for 'startGame' event - responsible for game starting (2 players are online, time to start)
function waitForGameToStart(cb) {
    socket.on('startGame', (v) => {
        cb(null, v);
    });
}

// Emitting 'joinRoom' for the player who joins to an existing room
// Listen to 'startGame' event also
function joinRoom(player, roomId, cb) {
    socket.on('startGame', (v) => {
        console.log(v);
        cb(null, v);
    });
    socket.emit('joinRoom', roomId, player);
}

// Emitting 'doTurn' -> sending the current turn to the server
function doTurn(roomId, playerId, newBoard) {
    socket.emit("doTurn", roomId, playerId, newBoard);
}

// Listen to 'gameUpdate' event -> which tells the players that their friend has played
function getUpdate(cb) {
    socket.on("gameUpdate", (v) => {
        console.log("...!!!");
        cb(null, v);
    });
}

// For viewers - sending 'getRoomData' event for getting board & players settings (color & name)
// Listening for 'roomView' event - which contains the wanted data
function getRoomData(roomId, cb) {
    socket.on("viewRoom", (v) => cb(null, v));
    socket.emit("getViewRoom", roomId);
}

/** ************** HTTP ***************/

// Sending a new result table for specific room id
function updateResultTableByRoomId(roomId, newBoard) {
    axios({
        method: 'POST',
        url: server + "/updateResults/" + roomId,
        data: { newBoard: newBoard },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
        .then((response) => {
            console.log(response);
            switch (response.status) {
                case 200:
                    console.log("Results table has been updated successfully");
                    break;
                default:
                    console.log("An error has been occured during results table update:", response);
            }
        })
        .catch((response) => {
            console.log("Error has been occured during sending request for updating Results Table:", response);
        });
}

export { getRoomData, createRoom, joinRoom, waitForGameToStart, doTurn, getUpdate, updateResultTableByRoomId };