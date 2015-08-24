'use strict';

module.exports = function(app) {
	// Routing logic

	var champions = require('../../app/controllers/items.server.controller');
	app.route('/api/items').get(champions.list);
};
