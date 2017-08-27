/*
 * index.js
 * 
 * Manages websockets and data
 */

var addr = "ws://10.0.1.20:8889/leaderboard_ws";
var socket;
var vue;

// Connected to onload event on <body>
function initialize() {
	
	// Connect to websocket
	ws_connect();

	// Vue object
	vue = new Vue({
		el: "#app",
		data: {
			leaderboard: new List('laps'),
			ticker: []
		},
		methods: {
			get_team_color: Colors.get

		}
	});

	// Show the webapp
	document.getElementById("app").style.display = "";
}

// Connect to WS
function ws_connect() {
	socket = new WebSocket(addr);
	socket.onopen = e => console.log(e);
	socket.onclose = e => console.log(e);
	socket.onerror = e => console.log(e);
	socket.onmessage = ws_onmessage;
}

function ws_onmessage(message) {
	// Parse data
	var message = JSON.parse(message.data);
	var data = message.data;
	var type = message.type;


	if (type == 'leaderboard') {

		// Remove old value if necessary
		if (data.old_val) {
			vue.leaderboard.remove(data.old_val.id, 'id');
		}

		// Insert new value if necessary
		if (data.new_val) {
			vue.leaderboard.insert(data.new_val);
		}
	}
	else if (type == 'ticker') {
		ticker(data.new_val);
	}

}

// Add to ticker
function ticker(data) {
	vue.ticker.splice(0, 0, data);
	if (vue.ticker.length > 10) {
		vue.ticker.pop();
	}
}

// Clear data
function reset() {
	vue.leaderboard = new List('laps');
	vue.ticker = [];
}
