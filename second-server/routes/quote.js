const router = require('express').Router();
const controller = require('../controllers/quoteController');

router.post('', controller.addQuote);
router.get('/getSingleQuote', controller.getQuote)
// router.get('/:userId', controller.getUser);

// router.post('', controller.addUser);

// router.put('/:userId', controller.updateUser);
// router.delete('/:userId', controller.deleteUser);

module.exports = router;
