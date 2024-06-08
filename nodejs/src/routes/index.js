const router = require('express').Router();
const authRoutes = require('./auth.routes');
const articleRoutes = require('./article.routes');

router.use('/auth', authRoutes);
router.use('/article', articleRoutes);

module.exports = router;
