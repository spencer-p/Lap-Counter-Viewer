/*
 * index.js
 * 
 * Manages websockets and data
 */

//var addr = "ws://localhost:8888/leaderboard_ws";
var addr = "ws://relay.local:8888/leaderboard_ws";
var socket;
var vue;

// Connected to onload event on <body>
function initialize() {

	// Vue object
	vue = new Vue({
		el: "#parent",
		data: {
			leaderboard: new List('last_updated_time'),
			ticker: new List('last_updated_time')
		},
	});

	// Connect to websocket
	ws_connect();

	// Show the webapp
	document.getElementById("parent").style.display = "flex";

	// Switch to the other view in five minutes
	setTimeout(function(){window.location.href='index2.html'},300000);
}

// Connect to WS
function ws_connect() {
	socket = new ReconnectingWebSocket(addr);
	// socket = new WebSocket(addr);
	socket.onopen = ws_onopen;
	socket.onclose = e => console.log(e);
	socket.onerror = e => console.log(e);
	socket.onmessage = ws_onmessage;
}

function ws_onopen(evt) {
	vue.leaderboard.clear();
	vue.ticker.clear();
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

	// Pop off the end of the ticker
	if (vue.leaderboard.arr.length > 3) {
		vue.leaderboard.arr.pop();
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
	if (vue.ticker.arr.length > 11) {
		vue.ticker.arr.pop();
	}
}
