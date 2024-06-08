const router = require('express').Router();
const { validate } = require('../utils/validate');
const articleValidation = require('../validation/article.validation');
const { authMiddleware } = require('../middleware/auth.middleware');
const { getAllArticles, addArticle, updateArticle, deleteArticle } = require('../controller/article.controller');

router.get('/get-articles', authMiddleware, getAllArticles);
router.post('/add-article', validate(articleValidation.addArticleValidation), authMiddleware, addArticle);
router.patch('/update-article', validate(articleValidation.updateArticleValidation), authMiddleware, updateArticle);
router.delete('/delete-article/:id', validate(articleValidation.deleteArticleValidation), authMiddleware, deleteArticle);

module.exports = router;
