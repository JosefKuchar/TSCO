var User = function(id) {
    this.name = null;
    this.id = id;
    this.room = null;

}
User.list = [];

var Room = function(name) {
    this.name = name;
    this.players = [];
    /* 0 = Waiting for players
     * 1 = Starting
     * 2 = Ingame
     * 3 = End
     */
    this.status = 0;
}
Room.list = [];

module.exports = function(io) {
    io.sockets.on('connection', function(socket) {
        // Add player to player list
        User.list.push(new User(socket.id));

        // Send rooms on player connection
        socket.emit('update rooms', Room.list);

        console.log('[INFO] New player connected, uuid ' + socket.id)

        // Send name
        socket.on('set name', function(data) {
            User.list.find(findMe).name = data
        });

        // Join to existing room
        socket.on('join room', function(data) {
            //Remove me from current room if exists
            if(User.list.find(findMe).room) {
                Room.list.find(findRoom).players.splice(User.list.indexOf(User.list.find(findMe)), 1);
            }

            // Set socket room
            socket.room = data;
            // Set player room
            User.list.find(findMe).room = data;

            // Check if room already exists
            if(Room.list.find(findRoom)) {
                
            } else {
                // Create room
                Room.list.push(new Room(data));
            }

            // Add player to this room
            Room.list.find(findRoom).players.push(User.list.find(findMe));

            // Send room to players
            io.sockets.emit('update rooms', Room.list);
        });

        // Clean up on disconnect
        socket.on('disconnect', function() {
            // Check if i'm in room
            if(User.list.find(findMe).room) {
                // Remove me from current room
                Room.list.find(findRoom).players.splice(User.list.indexOf(User.list.find(findMe)), 1);

                // If room is alone, delete it
                if(Room.list.find(findRoom).players.length == 0) {
                    Room.list.splice(Room.list.indexOf(Room.list.find(findRoom)), 1);
                }
            }

            // Remove me from player list
            User.list.splice(User.list.indexOf(User.list.find(findMe)), 1);
            
        });

        // Helping functions
        function findMe(user) {
            return user.id === socket.id;
        }

        function findRoom(room) {
            return room.name == socket.room;
        }
    });
}

/*
setInterval(function() { 
    console.log('Users:', User.list);
    console.log('Rooms:', Room.list);
}, 2000);*/