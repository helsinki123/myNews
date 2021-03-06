const Koa = require("koa2")
const app = new Koa()
var Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors');
const { connect, initSchemas } = require('./database/index.js')
const mongoose = require('mongoose')
const admin = require('./appApi/backAdmin.js')
const jwt = require('jsonwebtoken');
let payload = { name: '张三', admin: true };
let secret = 'I_LOVE_JING';
let token = jwt.sign(payload, secret);
let router = new Router();
    ; (async () => {
        await connect()
        initSchemas()
    })()
router.use('/admin', admin.routes())
//加载路由中间件
app.use(bodyParser())
app.use(cors())
//引入formidable模块
var formidable = require('formidable');
//引入文件操作模块
var fs = require('fs');
var path = require('path')
const serve = require('koa-static');
// 1.主页静态网页 把静态页统一放到public中管理
const home = serve(path.join(__dirname) + '/');
app.use(home)
var myurl = ''
router.post('/test',async(ctx) => {
    var form = new formidable.IncomingForm();
    form.encoding = "utf-8";
    form.uploadDir = './static/uploads'
    form.multiples = true;
    form.keepExtensions = true;
   
    form.parse(ctx.req, await function(name, fields,files) {
        myurl = files.file.path
        console.log(files.file.path);
        
    })
})
router.post('/test2',async (ctx)=>{
    const users = mongoose.model("users")
    let old_name = ctx.request.body.user_name;
    console.log(old_name);
    console.log(myurl);
    if(myurl){
        await users.update({ "user_name":  old_name},
        {
            $set: {
                head_portrait: myurl
            }
        })
    }
    const saveUser = mongoose.model("users")
    const result = await saveUser.findOne({ user_name: old_name});
    ctx.body = { code: 200, message: result }
})
//获取head_banner数据
router.get('/api/news_head_banner', async (ctx) => {
    try {
        const tags = mongoose.model("head_banners")
        const result = await tags.find()
        ctx.body = { code: 200, message: result }
    }
    catch (error) {
        console.log(error);
    }
})
//添加时事新闻
router.post('/post_current_affairs', async (ctx) => {
    try {
        const publish = mongoose.model("current_affairs")
        const program = ctx.request.body.program;
        const content = ctx.request.body.content;
        const result = await publish.update({ "category_lists.sub_category_name": { $eq: program } }, { $push: { "category_lists.$.sub_category_lists": { "content": content } } })
        ctx.body = { code: 200, message: ctx.request.body }
    }
    catch (error) {
        console.log(error);
    }
})
//添加财金新闻
router.post('/post_finances', async (ctx) => {
    try {
        const publish = mongoose.model("current_affairs")
        const program = ctx.request.body.program;
        const content = ctx.request.body.content;
        const result = await publish.update({ "category_lists.sub_category_name": { $eq: program } }, { $push: { "category_lists.$.sub_category_lists": { "content": content } } })
        ctx.body = { code: 200, message: ctx.request.body }
    }
    catch (error) {
        console.log(error);
    }
})
//发布新闻
router.post('/public_news', async (ctx) => {
    try {
        const current_affairs = mongoose.model("current_affairs")
        const finances = mongoose.model("finances")
        const lifes = mongoose.model("lifes")
        const thoughts = mongoose.model("thoughts")
        const videos = mongoose.model("videos")
        let result = {}
        let like_num = 0
        let watch_num = 0
        let date = new Date()
        //这里时间格式化需要掌握
        let date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        let category_name = ctx.request.body.category_name
        let sub_category_name = ctx.request.body.sub_category_name
        let newscoverurl = ctx.request.body.newscoverurl
        let title = ctx.request.body.title
        let content = ctx.request.body.content
        console.log(ctx.request.body);
        switch (category_name) {
            case "时事":
                const save_current_affairs = new current_affairs({
                    category_name: category_name,
                    sub_category_name: sub_category_name,
                    newscoverurl: newscoverurl,
                    title: title,
                    content: content,
                    writeTime: date_value,
                    like_num: like_num,
                    watch_num: watch_num,
                })
                result = await save_current_affairs.save()
                break;

            case "财经":
                const save_finances = new finances({
                    category_name: category_name,
                    sub_category_name: sub_category_name,
                    newscoverurl: newscoverurl,
                    title: title,
                    content: content,
                    writeTime: date_value,
                    like_num: like_num,
                    watch_num: watch_num,
                })
                result = await save_finances.save()

                break;

            case "生活":
                const save_lifes = new lifes({
                    category_name: category_name,
                    sub_category_name: sub_category_name,
                    newscoverurl: newscoverurl,
                    title: title,
                    content: content,
                    writeTime: date_value,
                    like_num: like_num,
                    watch_num: watch_num,
                })
                result = await save_lifes.save()
                break;

            case "思想":
                const save_thoughts = new thoughts({
                    category_name: category_name,
                    sub_category_name: sub_category_name,
                    newscoverurl: newscoverurl,
                    title: title,
                    content: content,
                    writeTime: date_value,
                    like_num: like_num,
                    watch_num: watch_num,
                })
                result = await save_thoughts.save()
                break;
            case "视频":
                const save_videos = new videos({
                    category_name: category_name,


                    title: title,
                    content: content,
                    writeTime: date_value,
                    like_num: like_num,
                    watch_num: watch_num,
                })
                result = await save_videos.save()
                break;
        }
        ctx.body = { code: 200, message: result }
    }
    catch (error) {
        console.log(error);
    }
})
//发布视频
router.post('/public_videos', async (ctx) => {
    try {
        const videos = mongoose.model("videos")
        let result = {}
        let like_num = 0
        let watch_num = 0
        let date = new Date()
        //这里时间格式化需要掌握
        let date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        let category_name = ctx.request.body.category_name
        let title = ctx.request.body.title
        let content = ctx.request.body.content
        let video_des = ctx.request.body.video_des
        const save_videos = new videos({
            program: category_name,
            title: title,
            video_des: video_des,
            content: content,
            writeTime: date_value,
            like_num: like_num,
            watch_num: watch_num,
        })
        result = await save_videos.save()
        ctx.body = { code: 200, message: result }
    }
    catch (error) {
        console.log(error);
    }
})
//删除新闻
router.post('/delete_news', async (ctx) => {
    try {
        const current_affairs = mongoose.model("current_affairs")
        const finances = mongoose.model("finances")
        const lifes = mongoose.model("lifes")
        const thoughts = mongoose.model("thoughts")
        let result = {}
        let category_name = ctx.request.body.category_name
        let sub_category_name = ctx.request.body.sub_category_name
        let title = ctx.request.body.title
        switch (category_name) {
            case "时事":
                result = await current_affairs.deleteOne({ title: title })
                break;

            case "财经":
                result = await finances.deleteOne({ title: title })

                break;

            case "生活":
                result = await lifes.deleteOne({ title: title })
                break;

            case "思想":
                result = await thoughts.deleteOne({ title: title })
                break;

        }
        ctx.body = { code: 200, message: result }
    }
    catch (error) {
        console.log(error);
    }
})
//用户注册
router.post('/register', async (ctx) => {
    try {
        const users = mongoose.model("users")
        const user_contents = mongoose.model("user_contents")
        const user_name = ctx.request.body.user_name;
        const password = ctx.request.body.password;
        const save_user = new users({ "user_name": user_name, "password": password })
        const save_user_contents = new user_contents({ "user_name": user_name })
        let result = await save_user.save()
        await save_user_contents.save()
        ctx.body = { code: 200, message: result }
    }
    catch (error) {
        console.log(error);
    }
})
//用户登录
router.post('/login', async (ctx) => {
    try {
        const saveUser = mongoose.model("users")
        const loginUser = ctx.request.body
        const result = await saveUser.findOne({ user_name: loginUser.user_name, password: loginUser.password });
        ctx.body = { code: 200, message: result }
    }
    catch (error) {
        ctx.body = { code: 200, message: "登录失败,未注册" }
    }
})
//获取sub_category的内容
router.post('/to_sub_category', async (ctx) => {
    try {
        const videos = mongoose.model("videos")
        const current_affairs = mongoose.model("current_affairs")
        const finances = mongoose.model("finances")
        const lifes = mongoose.model("lifes")
        const thoughts = mongoose.model("thoughts")
        const home_pages = mongoose.model("home_pages")
        let result = {}
        let program = ctx.request.body.program
        let sub_category = ctx.request.body.sub_category
        if (sub_category === "") {
            switch (program) {
                case "时事":
                    result = await current_affairs.findOne({ program: program });
                    break;

                case "财经":
                    result = await finances.findOne({ program: program });
                    break;

                case "生活":
                    result = await lifes.findOne({ program: program });
                    break;

                case "思想":
                    result = await thoughts.findOne({ program: program });
                    break;
                case "首页":
                    result = await home_pages.findOne({ program: program });
                    break;
                case "视频":
                    result = await videos.find({ program: program });
                    break;
            }
        } else {
            switch (program) {
                case "时事":
                    result = await current_affairs.find({ "sub_category_name": sub_category });
                    break;

                case "财经":
                    result = await finances.find({ "sub_category_name": sub_category });
                    break;

                case "生活":
                    result = await lifes.find({ "sub_category_name": sub_category });
                    break;

                case "思想":
                    result = await thoughts.find({ "sub_category_name": sub_category });
                    break;

                case "首页":
                    result = await home_pages.find({ "sub_category_name": sub_category });
                    break;
            }
        }
        ctx.body = { code: 200, message: result }
    }
    catch (error) {
        console.log(error);
    }
})
//获取文章的评论
router.post('/get_comments_by_article_id', async (ctx) => {
    try {
        const comments = mongoose.model("comments")
        const title = ctx.request.body.title
        const result = await comments.find({ title: title })
        ctx.body = { code: 200, message: result }
    }
    catch (error) {
        console.log(error);
    }
})
//保存文章评论
router.post('/save_comments', async (ctx) => {
    ctx.body = "有了"
    try {
        const comments = mongoose.model("comments")
        let date = new Date()
        //这里时间格式化需要掌握
        let date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        const article_id = ctx.request.body.article_id
        const user_name = ctx.request.body.user_name
        const remark = ctx.request.body.remark
        const head_portrait = ctx.request.body.head_portrait
        const title = ctx.request.body.title
        const saveComment = new comments({
            article_id: article_id,
            user_name: user_name,
            remark: remark,
            write_time: date_value,
            head_portrait: head_portrait,
            title: title
        })
        const result = await saveComment.save()
        ctx.body = { code: 200, message: result }
    }
    catch (error) {
        console.log(error);
    }
})
//获取用户记录
router.post('/user_contents', async (ctx) => {
    try {
        const user_contents = mongoose.model("user_contents")
        const user_name = ctx.request.body.user_name
        const result = await user_contents.findOne({ user_name: user_name });
        ctx.body = { code: 200, message: result }
    }
    catch (error) {
        console.log(error);
    }
})
//订阅
router.post('/subscribe', async (ctx) => {
    try {
        const user_contents = mongoose.model("user_contents")
        const user_name = ctx.request.body.user_name
        const title = ctx.request.body.title
        const src = ctx.request.body.src
        const program_name = ctx.request.body.program
        result = await user_contents.update({ user_name: user_name },
            { $push: { user_subscriptions: { title: title, src: src, program: program_name } } });
        ctx.body = { code: 200, message: result }
    }
    catch (error) {
        console.log(error);
    }
})
//取消订阅
router.post('/canclel_subscribe', async (ctx) => {
    try {
        const user_contents = mongoose.model("user_contents")
        const user_name = ctx.request.body.user_name
        const title = ctx.request.body.title
        const src = ctx.request.body.src
        const program_name = ctx.request.body.program
        result = await user_contents.update({ user_name: user_name },
            { $pull: { user_subscriptions: { title: title} } });
        ctx.body = { code: 200, message: result }
    }
    catch (error) {
        console.log(error);
    }
})
//添加收藏
router.post('/addto_collections', async (ctx) => {
    try {
        let date = new Date()
        //这里时间格式化需要掌握
        let date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        const user_contents = mongoose.model("user_contents")
        const title = ctx.request.body.title
        const user_name = ctx.request.body.user_name
        const newscoverurl = ctx.request.body.newscoverurl
        const video_src = ctx.request.body.content


        let res = await user_contents.find({ "user_collections.title": title });
        let result = ""
        if (res) {
            result = "重复了"
        }
        result = await user_contents.update({ user_name: user_name },
            {
                $push: {
                    user_collections:
                    {
                        title: title,
                        newscoverurl: newscoverurl,
                        collection_time: date_value,
                        video_src: video_src
                    }
                }
            });
        ctx.body = { code: 200, message: result }
    }

    catch (error) {
        console.log(error);
    }
})
//获取文章的评论
router.post('/get_comments_by_article_id', async (ctx) => {
    try {
        const comments = mongoose.model("comments")
        const article_id = ctx.request.body.article_id
        const result = await comments.find({ article_id: article_id })
        ctx.body = { code: 200, message: result }
    }
    catch (error) {
        console.log(error);
    }
})
//保存详情页面的点赞
router.post('/save_like', async (ctx) => {
    try {
        const current_affairs = mongoose.model("current_affairs")
        const finances = mongoose.model("finances")
        const home_pages = mongoose.model('home_pages')
        const lifes = mongoose.model('lifes')
        const thoughts = mongoose.model('thoughts')
        let like_num = ctx.request.body.like_num
        let _id = ctx.request.body._id
        const program = ctx.request.body.program
        const title = ctx.request.body.title
        let result = {}
        switch (program) {
            case "时事":
                result = await current_affairs.updateOne({ "title": title }, { $set: { "like_num": like_num } })
                break;

            case "财经":
                result = await finances.updateOne({ "title": title }, { $set: { "like_num": like_num } })
                break;
            case "首页":
                result = await home_pages.updateOne({ "title": title }, { $set: { "like_num": like_num } })
                break;
            case "生活":
                result = await lifes.updateOne({ "title": title }, { $set: { "like_num": like_num } })
                break;
            case "思想":
                result = await thoughts.updateOne({ "title": title }, { $set: { "like_num": like_num } })
                break;
        }
        ctx.body = { code: 200, message: result }
    }
    catch (error) {
        console.log(error);
    }
})
//保存详情页面的浏览次数
router.post('/save_watch_num', async (ctx) => {
    try {
        const current_affairs = mongoose.model("current_affairs")
        const finances = mongoose.model("finances")
        const home_pages = mongoose.model('home_pages')
        const lifes = mongoose.model('lifes')
        const thoughts = mongoose.model('thoughts')
        let watch_num = ctx.request.body.watch_num
        let title = ctx.request.body.title
        let _id = ctx.request.body._id
        const program = ctx.request.body.program
        let result = {}
        switch (program) {
            case "时事":
                result = await current_affairs.updateOne({ "title": title }, { $set: { "watch_num": watch_num } })
                break;
            case "财经":
                result = await finances.updateOne({ "title": title }, { $set: { watch_num: watch_num } })
                break;
            case "首页":
                result = await home_pages.updateOne({ "title": title }, { $set: { "watch_num": watch_num } })
                break;
            case "生活":
                result = await lifes.updateOne({ "title": title }, { $set: { "watch_num": watch_num } })
                break;
            case "思想":
                result = await thoughts.updateOne({ "title": title }, { $set: { "watch_num": watch_num } })
                break;
        }
        ctx.body = { code: 200, message: result }
    }
    catch (error) {
        console.log(error);
    }
})
//热门新闻排序
router.get('/sort_hot_news', async (ctx) => {
    try {
        const current_affairs = mongoose.model("current_affairs")
        const finances = mongoose.model("finances")
        const lifes = mongoose.model("lifes")
        const thoughts = mongoose.model("thoughts")
        const videos = mongoose.model("videos")
        let result = []
        result.push(await current_affairs.find())
        result.push(await finances.find())
        result.push(await lifes.find())
        result.push(await thoughts.find())
        result.push(await videos.find())
        ctx.body = { code: 200, message: result }
    }
    catch (error) {
        console.log(error);
    }
})
//更新个人信息
router.post('/update_user_info', async (ctx) => {
    try {
        const users = mongoose.model("users")
        let user_name = ctx.request.body.user_name
        let old_name = ctx.request.body.old_name
        let city = ctx.request.body.city
        let sex = ctx.request.body.sex
        let short_des = ctx.request.body.short_des
        let phone = ctx.request.body.phone
        let email = ctx.request.body.email
        let old_psw = ctx.request.body.old_psw
        let new_psw = ctx.request.body.new_psw
        let result = await users.update({ "user_name": old_name },
            {
                $set: {
                    user_name: user_name,
                    sex: sex,
                    city: city,
                    short_des: short_des,
                    email: email,
                    phone: phone,
                    old_psw: old_psw,
                    new_psw: new_psw
                }
            })
        ctx.body = { code: 200, message: result }
    }
    catch (error) {
        console.log(error);
    }
})
//更新头像
router.post('/update_head_portrait', async (ctx) => {
    try {
        console.log('111');
        var form = new formidable.IncomingForm();
        form.encoding = "utf-8";
        form.uploadDir = './static/uploads';
        form.keepExtensions = true;
        form.parse(ctx.req, function (err, field, files) {
            console.log(files);
            console.log(field);
        })
    }
    catch (error) {
        console.log(error);
    }
})
router.post('/update_user_info_by_back', async (ctx) => {
    try {
        const users = mongoose.model("users")
        let user_name = ctx.request.body.user_name
        let old_name = ctx.request.body.old_name
        // let type = ctx.request.body.type
        // let city = ctx.request.body.city
        // let sex = ctx.request.body.sex
        let result = await users.update({ "user_name": old_name },
            {
                $set: {
                    user_name: user_name,
                    // sex: sex,
                    // city: city,
                    // type: type
                }
            })
        ctx.body = { code: 200, message: result }
    }
    catch (error) {
        console.log(error);
    }
})
//查找文章评论
router.post('/get_comments_num', async (ctx) => {
    try {
        const comments = mongoose.model("comments")
        let article_id = ctx.request.body.article_id
        let result = await comments.find({ "article_id": article_id })
        ctx.body = { code: 200, message: result.length }
    }
    catch (error) {
        console.log(error);
    }
})
//后台获取所有用户信息
router.get('/get_all_users', async (ctx) => {
    try {
        const comments = mongoose.model("users")
        let result = await comments.find()
        ctx.body = { code: 200, message: result }

    }
    catch (error) {
        console.log(error);
    }
})
//获取用户评论
router.get('/get_user_comments', async (ctx) => {
    try {
        const comments = mongoose.model("comments")
        let result = await comments.find().sort({ "user_name": 1 })
        ctx.body = { code: 200, message: result }
    }
    catch (error) {
        console.log(error);
    }
})
//删除用户
router.post('/delete_users', async (ctx) => {
    try {
        const del_user = mongoose.model("users")
        const del_user_comments = mongoose.model("comments")
        const del_user_contents = mongoose.model("user_contents")
        const user_name = ctx.request.body.user_name
        await del_user.deleteOne({ "user_name": user_name })
        //将来可能会有bug，注意
        await del_user_comments.remove({ "user_name": user_name })
        let result = await del_user_contents.deleteOne({ "user_name": user_name })
        ctx.body = { code: 200, message: result }
    }
    catch (error) {
        console.log(error);
    }
})
//删除用户评论
router.post('/delete_users_comments', async (ctx) => {
    try {
        const del_user = mongoose.model("comments")
        const id = ctx.request.body.id
        let result = await del_user.deleteOne({ "_id": id })
        ctx.body = { code: 200, message: result }
    }
    catch (error) {
        console.log(error);
    }
})
//获取视频
router.get('/get_videos', async (ctx) => {
    try {
        const videos = mongoose.model("videos")
        let result = await videos.find()
        ctx.body = { code: 200, message: result }
    }
    catch (error) {
        console.log(error);
    }
})
//搜索文章
router.post('/search_articles', async (ctx) => {
    try {
        const current_affairs = mongoose.model("current_affairs")
        const finances = mongoose.model("finances")
        const home_pages = mongoose.model('home_pages')
        const lifes = mongoose.model('lifes')
        const thoughts = mongoose.model('thoughts')
        let search_text = ctx.request.body.search_text;
        let result = [];
        result.push(await current_affairs.find({title:{$regex:search_text}}))
        result.push(await finances.find({title:{$regex:search_text}}))
        result.push(await home_pages.find({title:{$regex:search_text}}))
        result.push(await lifes.find({title:{$regex:search_text}}))
        result.push(await thoughts.find({title:{$regex:search_text}}))
        ctx.body = { code: 200, message: result }
    }
    catch (error) {
        console.log(error);
    }
})
app.use(router.routes())
app.use(router.allowedMethods())
// 处理跨域
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    await next()
})
app.listen(3002)
console.log("demo is run");