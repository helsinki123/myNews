const mongoose = require('mongoose')
const Schema = mongoose.Schema
//创建userSchema
const users = new Schema({
    user_type: {
        type: String,
        default: "normal"
    },
    head_portrait: {
        type: String,
        default: "https://img.zcool.cn/community/01bc8a59336f22a8012193a35e1821.jpg@1280w_1l_2o_100sh.jpg"
    },
    user_name: String,
    password: String,
    city: String,
    sex: String,
    short_des: String,
    phone: String,
    email: String,
    old_psw: String,
    new_psw: String
})
//发布模型
mongoose.model('users', users)