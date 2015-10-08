var Promise = require('bluebird');
var mongoose = require('mongoose');
var _ = require('lodash');

mongoose.connect('mongodb://localhost/test');

var DB = mongoose.connection;

DB.on('error', function (err) {
    console.log('connection error:', err.message);
});
DB.once('open', function callback () {
    console.log('Connected to DB!');
});

var Schema = mongoose.Schema;

var DOT = new Schema({
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
    title: { type: String, required: true },
    description: String,
    author: String,
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    moderated: { type: Boolean, default: false }
});

var DotModel = mongoose.model('Dot', DOT);

var dot = {
    add: function(data){
        var newDot = new DotModel(data);

        return new Promise(function(resolve, reject){
            newDot.save(function(err){
                if(err){
                    reject(err);
                }

                resolve(newDot);
            });
        });
    },

    get: function(id){
        return new Promise(function(resolve, reject){
            DotModel.findOne({ _id: id }, function(err, res){
                console.log(id, res);

                if(err){
                    reject(err);
                }

                resolve(res);
            });
        });
    },

    getAll: function(){
        return new Promise(function(resolve, reject){
            DotModel.find({}, function(err, res){
                if(err){
                    reject(err);
                }

                resolve(res);
            });
        });
    },

    update: function(id, data){
        return new Promise(function(resolve, reject){
            dot
                .get(id)
                .then(function(res){
                    res = _.assign(res, data);

                    res.save(function(err){
                        if(err){
                            reject(err);
                        }

                        resolve(res);
                    });
                })
                .catch(function(err){
                    reject(err);
                });
        });
    },

    remove: function(id){
        return new Promise(function(resolve, reject){
            dot
                .get(id)
                .then(function(res){
                    res.remove(function(err){
                        if(err){
                            reject(err);
                        }

                        resolve(res);
                    });
                })
                .catch(function(err){
                    reject(err);
                });
        })
    }
};

module.exports = dot;