var app = function() {

	var self = {};

    self.initialize = function() {
		$("#app").show();
    };

    self.insert = function() {
        self.vue.ticker.splice(0, 0, Date.now());
        if (self.vue.ticker.length > 10) {
            self.vue.ticker.pop()
        }
    }

	self.vue = new Vue({
		el: "#app",
		data: {
            leaderboard: [],
            ticker: []
		},
		methods: {
            insert: self.insert
		}
	});

	return self;
};

var APP = null;

jQuery(function() {
	APP = app();
	APP.initialize();
});
