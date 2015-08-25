'use strict';

module.exports = function (app) {
    // Routing logic

    var items = require('../../app/controllers/items.server.controller');

    app.route('/api/items').get(items.list);
    app.route('/api/item/:id').get(items.item);
};
