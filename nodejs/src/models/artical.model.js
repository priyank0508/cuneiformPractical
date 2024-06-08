const mongoose = require('mongoose');
const options = require('../helper/option');

const ArticalSchema = new mongoose.Schema(
  {
    userId: {
      ref: 'Users',
      type: mongoose.Types.ObjectId,
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    slug: {
      type: String,
      trim: true,
      default: '',
    },
    category: {
      type: String,
      trim: true,
      default: '',
      enum: ['Food','Educations', 'Businessman', 'Positions']
    },
  },
  options
);
const Article = new mongoose.model('article', ArticalSchema);
module.exports = Article;
