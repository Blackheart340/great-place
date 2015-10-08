var express = require('express');
var router = express.Router();
var index = require('./controllers/index');
var api = require('./controllers/api');

router.get('/', index.index);

router.get('/api/v1', api.ping);
router.get('/api/v1/dot/add', api.dot.add);
router.get('/api/v1/dot/get/', api.dot.getAll);
router.get('/api/v1/dot/get/:id', api.dot.get);
router.get('/api/v1/dot/update/:id', api.dot.update);
router.get('/api/v1/dot/remove/:id', api.dot.remove);

module.exports = router;
