const Router = require('express');
const router = new Router();
const typeCtrl = require('../controller/typeController');


router.post('/', typeCtrl.create);
router.get('/', typeCtrl.get);

module.exports = router;