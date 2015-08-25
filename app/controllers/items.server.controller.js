'use strict';

/**
 * List of Champions
 */
exports.list = function (req, res) {
    var options = {
        root: __dirname + '/items/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    res.sendFile('list.json', options);
};

exports.item = function (req, res, next) {
    var id = req.params.id;

    var options = {
        root: __dirname + '/items/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    var filename = id + '.json';

    res.sendFile(filename, options);
};
