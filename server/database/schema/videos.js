const mongoose = require('mongoose')
const Schema = mongoose.Schema
//创建userSchema
const videos = new Schema({
    write_time: String,
    program: String,
    title: String,
    video_des:String,
    content: String,
    writeTime: String,
    like_num: Number,
    watch_num: Number
})

//发布模型
mongoose.model('videos',videos)