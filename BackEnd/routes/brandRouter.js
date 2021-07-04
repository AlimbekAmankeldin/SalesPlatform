const Router = require('express');
const router = new Router();
const brandCtrl = require('../controller/brandController');

router.post('/', brandCtrl.create);
router.get('/', brandCtrl.get);

module.exports = router;