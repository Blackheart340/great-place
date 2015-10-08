var dot = require('../model/dot');

exports.index = function(req, res) {
    var data = {
        title: 'Express',
        static: __dirname + '/../public'
    };

    dot
        .getAll()
        .then(function(result){
            data.dots = result;

            res.render('home', data);
        })
        .catch(function(err){
            console.log(err.stack);
            res.send(err.stack);
        });
};