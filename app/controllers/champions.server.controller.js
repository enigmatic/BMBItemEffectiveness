'use strict';

/**
 * List of Champions
 */
exports.list = function (req, res) {
    var options = {
        root: __dirname + '/champions/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    res.sendFile('list.json', options);
};