/*
 * index.js
 * 
 * Manages websockets and data
 */

// Connected to onload event on <body>
initialize = function() {
	$("#app").show();
}

// Connected to button - maintains list of <= 10 timestamps
insert = function() {
	self.vue.ticker.splice(0, 0, Date.now());
	if (self.vue.ticker.length > 10) {
		self.vue.ticker.pop()
	}
}

// Vue object
vue = new Vue({
	el: "#app",
	data: {
		leaderboard: [1, 2, 3],
		ticker: []
	},
	methods: {
		insert: insert
	}
})
