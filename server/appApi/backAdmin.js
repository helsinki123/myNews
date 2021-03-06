const Router = require('koa-router')
const router = new Router()
const mongoose = require('mongoose')

//后台写博客接口
router.post('/publish',async(ctx)=>{
    ctx.body = "这是publish页面"
    try{
     const publish = mongoose.model("newsinfos")
     const info = new publish(ctx.request.body)
     await info.save()
     ctx.body = {code:200,message:"存入数据库成功"}    
    }
    catch(error){
        console.log(error);    
    }
 })
 module.exports = router