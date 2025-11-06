require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');


const Blog = require('./models/blog');

const UserRoute = require('./routes/user');
const BlogRoute = require('./routes/blog');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');

const app = express();
const PORT = 8004;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));
app.use(express.static(path.resolve('./public')));

app.use('/user', UserRoute);
app.use('/blog', BlogRoute);
app.get('/', async(req, res)=>{

    const allBlogs = await Blog.find({});

    res.render('home', {
        user : req.user,
        blogs : allBlogs,
    });
});

mongoose.connect(process.env.MONGO_URI).then(()=> console.log("MongoDB connected!"));
app.listen(PORT, ()=>console.log(`Server Started at Port: ${PORT}`));

