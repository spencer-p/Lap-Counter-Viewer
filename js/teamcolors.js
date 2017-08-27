/*
 * colors.js
 *
 * defines an object which manages assigning colors to strings
 */


var Colors = {}

// Object mapping name to color
Colors.map = {};

// All available colors
Colors.all_colors = [ 'navy', 'blue', 'aqua', 'teal', 'olive', 'green', 'lime',
	'yellow', 'orange', 'red', 'fuchsia', 'purple', 'maroon', 'white',
	'silver', 'gray', 'black' ];
Colors.all_colors_index = 0;

Colors.get = function(team_id) {
	Colors.set(team_id);
	return Colors.map[team_id];
};

Colors.set = function(team_id) {
	if (!Colors.map[team_id]) {
		Colors.map[team_id] = Colors.all_colors[Colors.all_colors_index%Colors.all_colors.length];
		Colors.all_colors_index++;
	}
};
