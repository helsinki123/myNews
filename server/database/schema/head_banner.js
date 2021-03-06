const mongoose = require('mongoose')
const Schema = mongoose.Schema
//创建userSchema
const head_banner = new Schema({
       
    // head_banner: [
    //     {
    //         banner_name: String,
    //         src: String,
    //         headline: String,
    //         category: [
    //             {
    //                 title: String,
    //                 des: String,
    //                 src: String
    //             },
    //         ]
    //     }
    // ]
        
})

//发布模型
mongoose.model('head_banners',head_banner)