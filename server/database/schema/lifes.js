const mongoose = require('mongoose')
const Schema = mongoose.Schema
//创建userSchema
const lifes = new Schema({
    category_name: String,
    sub_category_name: String,
    newscoverurl: String,
    title: String,
    content: String,
    writeTime: String,
    like_num: Number,
    watch_num: Number
})

//发布模型
mongoose.model('lifes',lifes)