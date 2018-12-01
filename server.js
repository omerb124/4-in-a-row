const io = require('socket.io')();

let players = [];

io.on('connection', (client) => {
    client.on('subscribeToTimer', (interval, motek) => {
        console.log('client is subscribing to timer with interval ', interval, motek);
        setInterval(() => {
            client.emit("retValue",
                { hey: "motek" }
            );
        }, interval);

    });

    client.on("getRoomData", (interval, room_id) => {
        console.log("GETTING DATA FOR ", room_id , ":");
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

    client.on("playerJoined", (settings) => {
        console.log("Player has been joined with those settings: ", settings);
        
        players.push(settings);
        console.log("Current status of players in this room:", players);
        setTimeout(() => {
            client.emit("playerAdded", {status : 200, players: players });
        },1000);
    });


    client.on("createRoom", () => {
        console.log("Creating a room!");
        setTimeout(() => {
            client.emit("roomOpened", {
                roomId: '123123'
            });
        }, 1000);

    });
});

const port = 5000;
io.listen(port);
console.log('listening on port ', port);