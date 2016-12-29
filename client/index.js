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


var app = new Vue({
    el: '#app'
});