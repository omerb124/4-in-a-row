import openSocket from 'socket.io-client';
import axios from 'axios';
const server = "http://192.168.2.115:5000";
const socket = openSocket(server);

/** ************** Sockets ***************/

// Create room 
function createRoom(Player, cb) {
    socket.on('roomOpened', (v) => {
        cb(null, v);
    });
    console.log("Creating a room...");
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
function doTurn(roomId, playerId, newBoard, gameEnded) {
    socket.emit("doTurn", roomId, playerId, newBoard, gameEnded);
}

// Listen to 'gameUpdate' event -> which tells the players that their friend has played
function getUpdate(cb) {
    socket.on("gameUpdate", (v) => {
        cb(null, v);
    });
}

// For viewers - sending 'getRoomData' event for getting board & players settings (color & name)
// Listening for 'roomView' event - which contains the wanted data
function getRoomData(roomId, cb) {
    socket.on("viewRoom", (v) => cb(null, v));
    socket.emit("getViewRoom", roomId);
}

// Offer new game
function offerNewGame(roomId,cb) {
    console.log("Offering new game...");
    socket.emit("offerNewGame", roomId);
    // Listening to offer result
    socket.on("offerResult", (v) => {
        console.log("The result is...", v);
        cb(null, v);
    });
}

// Listen to new game offering + New game starting
function listenToNewGameOffer(cb) {
    console.log("Listening to new game offer...");
    socket.on("newGameOffer", (v) => cb(null, v));
}

// Answer to name game offering
function answerOffer(roomId, response, cb) {
    console.log("The answer is... " , response);
    socket.emit("newGameOfferResponse", roomId, response);
    socket.on("offerResult", (v) => {
        cb(null, v);
    });
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

/* Get rooms data */
function getRoomsData(cb){
    axios({
        method:'GET',
        url : server + '/games-list'
    })
    .then((response) => {
        // Decode json and call callback
        console.log("Data1:");
        console.log(response);
        cb(null,response);
    })
    .catch((response) => {
        console.log("Error has been occured during sending request for getting rooms data:", response);
    });
}

export {
    getRoomData,
    createRoom,
    joinRoom,
    waitForGameToStart,
    doTurn,
    getUpdate,
    updateResultTableByRoomId,
    offerNewGame,
    listenToNewGameOffer,
    answerOffer,
    getRoomsData
};