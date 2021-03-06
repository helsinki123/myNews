const mongoose = require('mongoose')
const Schema = mongoose.Schema
//创建userSchema
const newsinfos = new Schema({
   content: String,
   program: String,
   title: String,
   writeTime:{type:Date,default:Date.now()},
   newscoverurl: String,
   
//    page:String,
//    agreeNum:{type:Number,default:1},
//    readNum:{type:Number,default:1},
//    page:String,
})

//发布模型
mongoose.model('newsinfos',newsinfos)