const Router = require('express');
const router = new Router();
const userCtrl = require('../controller/userController');
const checkMidleware = require('../middleware/checkMidleware');


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/check', checkMidleware, userCtrl.check);


module.exports = router;