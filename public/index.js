var socket = io();

Vue.component('direction', {
    template: '#direction-template',
    
    data: function() {
        return {
            right: true,
            classString: ""
        };
    },
    watch: {
        right: function(val) {
            if(val) {
                this.classString = "";
            } else {
                this.classString = "fa-flip-horizontal";
            }
        }
    }
    
});

Vue.component('resource', {
    template: '#resource-template',
    props: {
        name: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
    },
    
});

Vue.component('login', {
    template: '#login-template',
    data: function() {
        return {
            text: "",
            visible: ""
        };
    },
    methods: {
        send: function() {
            socket.emit('set name', this.text)
            this.visible = "hidden"
        }
    }  
});

Vue.component('user', {
    template: '#user-template',
    props: {
        name: {
            type: String,
            required: true
        }
    },
    data: function() {
        return {
            specials: [
                "Road",
                "Road",
                "Village"
            ]
        };
    }
});

Vue.component('special', {
    template: '#special-template',
    props: {
        name: {
            type: String,
            validator: function(value) {
                return value == "Road" || value == "Knight" || value == "Village" || value == "Town" || value == "Town upgrade"
            },
            required: true
        }
    }
});

Vue.component('rooms', {
    template: '#rooms-template',
    data: function() {
        return {
            text: '',
            visible: '',
            rooms: []
        };
    },
    created: function() {
        socket.on('update rooms', function(data) {
            this.rooms = data;
            console.log(data);
        }.bind(this));
    },
    methods: {
        send: function() {
            socket.emit('join room', this.text);
            this.visible = 'hidden';
        },
        joinRoom: function(room) {
            socket.emit('join room', room)
            this.visible = 'hidden';
        }
    }
});


var app = new Vue({
    el: '#app'
});