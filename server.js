const io = require('socket.io')();
// 
// Create new room data
function createRoomData(players) {
    return ({
        board: Array(9).fill(Array(9).fill("")),
        players: players,
        turn: true
    });
}

// Random String
function makeid(l) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < l; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

// rooms initial empty list
let rooms = [];

io.on('connection', (client) => {
    client.on("getRoomData", (interval, room_id) => {
        console.log("GETTING DATA FOR ", room_id, ":");
        setInterval(() => {
            client.emit("retRoomData",
                {
                    room_id: room_id,
                    players: players,
                    gameStart: false
                }
            );
        }, interval);
    });

    client.on("joinRoom", (newPlayer, roomId) => {

        let response;
        let ret = false;
        let warning;
        // The room with this ID is already active
        if (rooms[roomId].players.length === 2) {
            response = { error: "The players in this room are playing right now." };
            ret = true;
        }

        // There is no room with this ID
        if (!rooms[roomId]) {
            response = { error: "No such a room" };
            ret = true;
        }

        if (!ret) {
            // Add player to players list
            if (rooms[roomId].players.find((ele) => ele === newPlayer) === undefined) {

                // Check colors equality
                if (rooms[roomId].players.find((ele) => ele.color == newPlayer.color) !== undefined) {
                    // Same color
                    // Return warning
                    console.log("Player tried to join to ", roomId,"but with same color");
                    warning = true;
                    response = {
                        warning: "same color"
                    };
                }
                else {
                    // All is ok
                    // Add new player to room's players array
                    console.log("Player has been joined to room", roomId, ":", newPlayer);
                    rooms[roomId].players.push(newPlayer);
                }
            }

            if (!warning) {
                // 2 players are here, game is ready
                if (rooms[roomId].players.length === 2) {
                    const roomData = createRoomData(rooms[roomId].players);
                    console.log("Game is ready! Here's the data:", roomData);
                    response = {
                        roomData: roomData
                    };
                    rooms[roomId].data = roomData;
                }
                else {
                    // Unknown error
                    response = { error: "Unknown error." };
                }
            }


        }

        setTimeout(() => {
            io.emit("startGame", response);
        }, 1000);


    });


    client.on("createRoom", (player) => {

        const roomId = makeid(10);
        rooms[roomId] = {
            players: []
        };

        // Add owner to room's players list
        if (rooms[roomId].players.find((ele) => ele === player) === undefined) {
            console.log("Player has been opened room", roomId, "and joined with those settings: ", player);
            rooms[roomId].players.push(player);
        }

        setTimeout(() => {
            client.emit("roomOpened", {
                roomId: roomId
            });
        }, 1000);

    });

    client.on("doTurn", (roomId, playerId, newBoard) => {
        if (rooms[roomId]) {
            rooms[roomId].data.board = newBoard;
            rooms[roomId].data.turn = (playerId == 2);
            setTimeout(() => {
                io.emit("gameUpdate", {
                    updatedData: rooms[roomId].data
                });
                console.log("Sent.");
            }, 100);

            console.log(playerId, "has moved!");
            console.log("Updated Board:", newBoard);
        }
    });
});

const port = 5000;
io.listen(port);
console.log('listening on port ', port);