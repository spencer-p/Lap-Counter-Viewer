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
			leaderboard: [],
			ticker: []
		},
		methods: {
			insert: insert,
			close: socket.close,
			connect: ws_connect,
			reset: reset

		}
	});

	// Show the webapp
	$("#app").show();
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
	var data = JSON.parse(message.data);
	console.log(data);

	// Send it to the ticker too
	insert(data);
}

// Connected to button - maintains list of <= 10 timestamps
function insert(data) {
	vue.ticker.splice(0, 0, data);
	if (vue.ticker.length > 10) {
		vue.ticker.pop();
	}
}

// Clear data
function reset() {
	vue.leaderboard = [];
	vue.ticker = [];
}
