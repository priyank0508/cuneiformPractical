const Article = require("../models/artical.model");
const { getQueryOptions } = require("../utils/queryHandler");

const getAllArticles = async (query, userId) => {
    const { search, ...restQuery } = query;
    const { limit, skip, sort } = getQueryOptions(restQuery);
    let searchFilter = { userId };
    if (search) {
      const searchFields = ['title', 'description', 'slug', 'category'];
      searchFilter['$or'] = searchFields.map((field) => ({
        [field]: { $regex: search.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'), $options: 'i' },
      }));
    }

    const pipline = [
      { $match: searchFilter },
      { $sort: sort },
      { $skip: skip },
      { $limit: limit },
    ]
    const articles = await Article.aggregate([
      {
        $facet: {
          payload: pipline,
          count: [{ $match: searchFilter }, { $count: 'total' }]
        }
      }]);
    return articles
  };

  const addArticle = async (data, userId) => {
    const articles = await Article.create({ userId, ...data})
    return articles
  };

  const updateArticle = async (data, userId) => {
    const { _id, ...restData} = data

    const article = await Article.findOneAndUpdate({_id: _id, userId }, restData, { new: true })
    if(!article) {
      throw {
        statusCode: statusCode.BAD_REQUEST,
        message: message.article.articleNotFound,
      }
    } else {
      return article
    }
  };

  const deleteArticle = async (id) => {

    const isArticleExist = await Article.findOne({_id:id})
    if(!isArticleExist) {
      throw {
        statusCode: statusCode.BAD_REQUEST,
        message: message.article.articleNotFound,
      }
    }
    const article = await Article.findOneAndDelete({_id: id})
    return article
  };

  module.exports = { getAllArticles, addArticle, updateArticle, deleteArticle }