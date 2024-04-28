const express = require('express')
const app = express();
const users = require('./models/users')

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('/public'))


app.get('/', (req, res) => {
    res.render('index')
})
app.get('/read', async (req, res) => {
    const user = await users.find()
    res.render('read',{user})
})
app.post('/create', async (req, res) => {

    const { username, email, imgurl } = req.body

    const createdUser = await new users({
        username,
        email,
        imgurl
    });

    await createdUser.save()

    res.redirect('/read')
})

app.listen(3000, () => {
    console.log('App Running On http://localhost:3000');
})
