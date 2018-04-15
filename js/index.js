/*
 * index.js
 * 
 * Manages websockets and data
 */

var addr = "ws://localhost:8888/leaderboard_ws";
var socket;
var vue;

// Connected to onload event on <body>
function initialize() {

	// Vue object
	vue = new Vue({
		el: "#parent",
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
	document.getElementById("parent").style.display = "flex";
}

// Connect to WS
function ws_connect() {
	socket = new ReconnectingWebSocket(addr);
	// socket = new WebSocket(addr);
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
		var snd = new Audio('beep-07.mp3');
		snd.play();
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
	if (vue.ticker.arr.length > 15) {
		vue.ticker.arr.pop();
	}
}
