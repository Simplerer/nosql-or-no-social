const router = require('express').Router();
const apiRoutes = require('./apis');

router.use('/api', apiRoutes);
router.use((req, res) => res.send('This route is not here friend!'));

module.exports = router;