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



exports.championItem = function (req, res) {
    var champ = req.params.champ;
    var item = req.params.item;

    var options = {
        root: __dirname + '/champions/items/' + champ + '/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    var filename = item + '.json';

    res.sendFile(filename, options);
};

exports.championStats = function (req, res) {
    var champ = req.params.champ;

    var options = {
        root: __dirname + '/champions/items/' + champ + '/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    var filename = 'average.json';

    res.sendFile(filename, options);
};
