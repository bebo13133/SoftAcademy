const router = require('express').Router();
const controller = require('../controllers/user');

router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/logout', controller.logout)
// router.put('/:userId', controller.updateUser);
// router.delete('/:userId', controller.deleteUser);

module.exports = router;
