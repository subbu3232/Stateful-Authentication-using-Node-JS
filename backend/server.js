const express=require('express');
const app=express();
const cors=require("cors");
const mongoose=require("mongoose")
const dotenv=require("dotenv");
const session=require('express-session')
const LoginModel=require('./model/Logindetail');
const MongoDBStore = require('connect-mongodb-session')(session);
const bcrypt=require('bcryptjs')
dotenv.config();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Update with your frontend URL
    credentials: true,
  }));
  




mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongodb connected successfully");
}).catch((err)=>{
    console.log("error",err)
})

const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'mySession'
});
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: 'this is secret key',
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true,
        secure: false, // Set to true in production if using HTTPS
    }
}));

// MiddleWare

const checkAutho = (req, res, next) => {
    console.log('isAuth:', req.session.isAuth);
    console.log('person:', req.session.person);

    if (req.session.isAuth === true) {
        next();
    } else {
        res.redirect('/login');
    }
};

    
app.get('/dashboard',checkAutho,(req,res)=>{
    res.render('welcome')
})
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    LoginModel.findOne({ email }).then((user) => {
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json('Internal Server Error');
                } else {
                    if (result) {
                        req.session.isAuth = true;
                        req.session.person = email;  // Set the user's email in the session
                        res.json('success');
                    } else {
                        res.json('password is incorrect');
                    }
                }
            });
        } else {
            res.json('No record existed');
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json('internal server error');
    });
});

app.post('/', async (req, res) => {
    const { email, password } = req.body;
  
    // Hash the password
    const hashedpassword = await bcrypt.hash(password, 12);
  
    LoginModel.create({ email, password: hashedpassword })
      .then((logins) => {
        req.session.person = email;
        res.json(logins);
      })
      .catch((err) => res.json(err));
  });
  

  app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.status(500).json('Internal Server Error');
        } else {
            res.clearCookie('connect.sid'); // Clear the session cookie
            res.json('Logout successful');
        }
    });
});


app.listen(4500,()=>{
    console.log("server running at port 4500")
})
