const mongoose = require('mongoose')
const db = "mongodb://localhost/myNews"
const glob = require('glob')
const {resolve} = require('path')
exports.initSchemas = ()=>{
    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
}
mongoose.set('useCreateIndex', true) //加上这个
mongoose.Promise = global.Promise
exports.connect = ()=>{
    mongoose.connect(db,{ useNewUrlParser: true,useUnifiedTopology: true })
    mongoose.connection.on('disconnected',()=>{
        mongoose.connect(db)
    })
    mongoose.connection.on('error',err=>{
        console.log(err);
        mongoose.connect(db)
    })
    mongoose.connection.once('open',()=>{
        console.log('邹先生，您的数据库连接成功！！！');
    })
}
