const mongoose = require('mongoose')
const Schema = mongoose.Schema
//创建userSchema
const comments = new Schema({
    article_id : String,
    user_name : String,
    remark : String,
    write_time: String,
    head_portrait:String,
    title:String
})

//发布模型
mongoose.model('comments',comments)