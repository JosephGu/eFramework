const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const staticPath = path.join(__dirname, '../client/dist/');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const csrfProtection = csrf({
    cookie: {
        httpOnly: false,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
    }
})

const users = [
    {
        username: 'Joseph',
        email: 'joseph@qq.com',
        title: 'dev 1',
        password: '123456'
    },
    {
        username: 'Kyle',
        email: 'kyle@qq.com',
        title: 'dev 2',
        password: '123456'
    }
]

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', express.static(staticPath));
app.use('/login', express.static(staticPath));


app.listen(port, () => {
    console.log(`Listening on ${port}`);
})

app.get('/initPortal', authenticate, csrfProtection, (req, res) => {

    console.log(req.csrfToken())
    res.cookie('csrfToken', req.csrfToken());
    res.status(200).send();
})

app.post('/loginReq', (req, res) => {

    const { email } = req.body;
    const { password } = req.body;
    const user = users.find((user) => user.email === email);

    if (user && user.password === password) {
        const accessToken = generateAccessToken(user);
        res.status(200).cookie('accessToken', accessToken).send();
    } else {
        res.status(401).send();
    }
})

function generateAccessToken(user) {
    return jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
}

function authenticate(req, res, next) {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        res.status(401).send();
    } else {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                res.status(401).send();
            } else {
                req.user = user;
                next();
            }
        })
    }
}

app.post('/add', function (req, res) {
    res.send('csrf was required to get here')
})
