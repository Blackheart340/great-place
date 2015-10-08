var dot = require('../model/dot');

exports.ping = function(req, res){
    res.send('pong');
};

exports.dot = {
    add: function(req, res){
        console.log(req.query);

        var data = {
            lat: req.query['f-lat'],
            long: req.query['f-long'],
            title: req.query['f-title'],
            description: req.query['f-desc'],
            author: req.query['f-author']
        };

        dot
            .add(data)
            .then(function(result){
                res.send({
                    status: 'OK',
                    data: result
                });
            })
            .catch(function(err){
                console.log(err, err.stack);
                res.send({ status: 'err', err: err.stack });
            })
    },

    get: function(req, res){
        var id = req.params.id;

        dot
            .get(id)
            .then(function(result){
                res.send({
                    status: 'OK',
                    data: result
                });
            })
            .catch(function(err){
                console.log(err, err.stack);
                res.send({ status: 'err', err: err.stack });
            })

    },

    getAll: function(req, res){
        dot
            .getAll()
            .then(function(result){
                res.send({
                    status: 'OK',
                    data: result
                });
            })
            .catch(function(err){
                console.log(err, err.stack);
                res.send({ status: 'err', err: err.stack });
            })

    },

    update: function(req, res){
        var id = req.params.id;

        dot
            .update(id, data)
            .then(function(result){
                res.send({
                    status: 'OK',
                    data: result
                });
            })
            .catch(function(err){
                console.log(err, err.stack);
                res.send({ status: 'err', err: err.stack });
            })

    },

    remove: function(req, res){
        var id = req.params.id;

        dot
            .remove(id)
            .then(function(result){
                res.send({
                    status: 'OK',
                    data: result
                });
            })
            .catch(function(err){
                console.log(err, err.stack);
                res.send({ status: 'err', err: err.stack });
            })
    }
};