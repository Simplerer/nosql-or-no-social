const router = require('express').Router();
const apiRoutes = require('./apis');

router.use('/api', apiRoutes);

module.exports = router;