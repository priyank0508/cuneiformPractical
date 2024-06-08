const articleService =  require('../services/article.services');
const { searchData } = require('../utils/queryHandler');

module.exports.getAllArticles = async (req, res, next) => {
    try {
      searchData(req.query);
      const allArticles = await articleService.getAllArticles(req.query, req.user._id);
      return res.send(successResponse(
        statusCode.OK, 
        message.article.articleGetSuccess, 
        allArticles[0]['payload'],
         allArticles[0]['count'][0]?.total
         ));
    } catch (err) {
      catchErrorHandler(err, req, res, next);
    }
};

module.exports.addArticle = async (req, res, next) => {
  try {
    const article = await articleService.addArticle(req.body, req.user._id);
    return res.send(successResponse(statusCode.OK, message.article.articleAddSuccess, article));
  } catch (err) {
    catchErrorHandler(err, req, res, next);
  }
};

module.exports.updateArticle = async (req, res, next) => {
  try {
    const article = await articleService.updateArticle(req.body, req.user._id);
    return res.send(successResponse(statusCode.OK, message.article.articleUpdated, article));
  } catch (err) {
    catchErrorHandler(err, req, res, next);
  }
};

module.exports.deleteArticle = async (req, res, next) => {
  try {
    const article = await articleService.deleteArticle(req.params.id);
    return res.send(successResponse(statusCode.OK, message.article.articleDeleted, article));
  } catch (err) {
    catchErrorHandler(err, req, res, next);
  }
};
