const Joi = require('@hapi/joi');

const addArticleValidation = {
  body: Joi.object().keys({
    title: Joi.string().label('Title').required(),
    description: Joi.string().label('Description').required(),
    category: Joi.string().label('Category').valid('Food','Educations', 'Businessman', 'Positions').required(),
    slug: Joi.string().label('Slug').required(),
  }),
};

const updateArticleValidation = {
  body: Joi.object().keys({
    _id: Joi.string().label('Id').min(24).max(24).required(),
    title: Joi.string().label('Title').required(),
    description: Joi.string().label('Description').required(),
    category: Joi.string().label('Category').valid('Food','Educations', 'Businessman', 'Positions').required(),
    slug: Joi.string().label('Slug').required(),
  }),
};

const deleteArticleValidation = {
  params: Joi.object().keys({
    id: Joi.string().label('Id').min(24).max(24).required(),
  }),
};

module.exports = { addArticleValidation, updateArticleValidation, deleteArticleValidation };
