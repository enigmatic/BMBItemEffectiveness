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

exports.champion = function (req, res) {
    var id = req.params.id;

    var options = {
        root: __dirname + '/champions/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    var filename = id + '.json';

    res.sendFile(filename, options);
};
