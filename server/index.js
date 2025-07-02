const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname,'/client/dist/index.html')
// })

const staticPath = path.join(__dirname, '../client/dist/');

const csrfProtection = csrf({
    cookie: {
        httpOnly: false,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production' 
    }
})

app.use(cookieParser());

app.use('/', express.static(staticPath));


app.listen(port, () => {
    console.log(`Listening on ${port}`);
})

app.get('/initPortal', csrfProtection, (req, res) => {
    console.log(req.csrfToken())
    res.cookie('csrfToken', req.csrfToken());
    res.status(200).send();
})

app.post('/add', function (req, res) {
    res.send('csrf was required to get here')
})
