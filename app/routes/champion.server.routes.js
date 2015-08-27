'use strict';

module.exports = function (app) {
    // Routing logic

    var champions = require('../../app/controllers/champions.server.controller');
    app.route('/api/champions').get(champions.list);
    app.route('/api/champion/:id').get(champions.champion);
    app.route('/api/champion/:champ/item/:item').get(champions.championItem);
    app.route('/api/champion/:champ/stats').get(champions.championStats);
};
