/*
 * colors.js
 *
 * defines an object which manages assigning colors to strings
 */


var Colors = {}

// Object mapping name to color
Colors.map = {};

// All available colors
Colors.all_colors = [ 'navy', 'red', 'blue', 'gray', 'orange', 'teal', 'olive', 
	'purple', 'green', 'yellow', 'fuchsia', 'maroon', 'white', 'aqua',
	'silver', 'black', 'lime' ];

Colors.get = function(team_id) {
	Colors.set(team_id);
	return Colors.map[team_id];
};

Colors.set = function(team_id) {
	if (!Colors.map[team_id]) {
		Colors.map[team_id] = Colors.all_colors[team_id % Colors.all_colors.length];
	}
};
