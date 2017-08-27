/*
 * index.js
 * 
 * Manages websockets and data
 */

var addr = "ws://10.0.1.20:8888/leaderboard_ws";
var socket;
var vue;

// Connected to onload event on <body>
function initialize() {

	// Vue object
	vue = new Vue({
		el: "#app",
		data: {
			leaderboard: new List('laps'),
			ticker: new List('last_updated_time')
		},
		methods: {
			get_team_color: Colors.get

		}
	});

	// Connect to websocket
	ws_connect();

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
		update_leaderboard(data);
	}
	else if (type == 'ticker') {
		update_ticker(data);
	}

}

function update_leaderboard(data) {
	// Remove old value if necessary
	if (data.old_val) {
		vue.leaderboard.remove(data.old_val.id, 'id');
	}

	// Insert new value if necessary
	if (data.new_val) {
		vue.leaderboard.insert(data.new_val);
	}
}

function update_ticker(data) {
	// Remove old ticker item
	// TODO do we want this?
	if (data.old_val) {
		vue.ticker.remove(data.old_val.id, 'id');
	}

	// Insert new
	if (data.new_val) {
		vue.ticker.insert(data.new_val);
	}

	// Pop off the end of the ticker
	if (vue.ticker.arr.length > 10) {
		vue.ticker.arr.pop();
	}
}
