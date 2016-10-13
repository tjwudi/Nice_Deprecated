var Seq = require('sequelize');
var db = new Seq(process.env.DATABASE_URL, {
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

module.exports = db;
