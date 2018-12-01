const io = require('socket.io')();

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
        console.log("GETTING DATA FOR ", room_id);
        setInterval(() => {
            client.emit("retRoomData",
                {
                    room_id: room_id,
                    name: "motek",
                    jogo: true,
                    bondi: { motek: "hey" }
                }
            );
        }, interval);
    });

    client.on("createRoom", (settings) => {
        console.log("Creating a room with settings: ", settings);
        setTimeout(() => {
            client.emit("roomOpened", {
                roomId: '123123'
            });
        }, 1000);

    });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);