const mongoose = require('mongoose')
const Schema = mongoose.Schema
//创建userSchema
const user_collections = new Schema({
            user_name : String,
          newscoverurl: String,
          title: String,
          content:String,
          _id: String,
          collection_time:Date,
          video_src:String
})

//发布模型
mongoose.model('user_collections',user_collections)