const mongoose = require('mongoose')
const Schema = mongoose.Schema
//创建userSchema
const user_contents = new Schema({
  user_name: String,
  user_collections: {
    type: Array,
    default: {
      article_id: String,
      newscoverurl: String,
      title: String,
      program: String
    }
  },
  user_subscriptions: []
})

//发布模型
mongoose.model('user_contents', user_contents)