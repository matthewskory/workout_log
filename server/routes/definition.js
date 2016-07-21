var router = require('express').Router();
var sequelize = require('../db.js');
var Definition = sequelize.import('../models/definition');


router.post('/', function(req, res) {
    var description = req.body.definition.desc;
    var logType = req.body.definition.type;
    var owner = req.user.id;

    Definition.create({
        description: description,
        logType: logType,
        owner: owner

    }).then(
        function createSuccess(definition) {
            res.json({
                definition: definition,
                message: 'created'
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );

});

//fetch definitions by userID
//router.get('/', function(req, res) {


// });

module.exports = router;