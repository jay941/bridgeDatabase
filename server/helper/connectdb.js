'use strict';
/**
 * define require modules
 */
let mongoose = require('mongoose'),
    state = {
        db: null,
    },
    url = process.env.MONGO_URI || 'mongodb://localhost:27017/bridgedb';
/**
 * @exports {connect,close}
 */
module.exports = {
    connect: function(cb) {
        if (state.db) {
            cb();
        } else {
           mongoose.Promise = global.Promise;
            state.db = mongoose.connect(url);
            cb();
        }
    },
    close: function(done) {
        if (state.db) {
            state.db.close(function(err, result) {
                state.db = null
                state.mode = null
                done(err)
            });
        }
    }
}
