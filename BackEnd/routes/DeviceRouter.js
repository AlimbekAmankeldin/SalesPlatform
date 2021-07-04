const Router = require('express');
const router = new Router();
const deviceCtrl = require('../controller/deviceController');

router.post('/', deviceCtrl.create);
router.get('/', deviceCtrl.getAll);
router.get('/:id', deviceCtrl.getOne);

module.exports = router;