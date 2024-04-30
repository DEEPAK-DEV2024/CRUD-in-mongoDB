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
    res.render('read', { user })
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

app.get('/edit/:userId', async (req, res) => {
    const user = await users.findOne({ _id: req.params.userId })
    res.render('edit', { user })

})

app.post('/update/:userId', async (req, res) => {
    const { email, username, imgurl } = req.body
    const user = await users.findOneAndUpdate({ _id: req.params.userId }, { username, email, imgurl })



    res.redirect('/read')
})

app.get('/delete/:userId', async (req, res) => {
    const user = await users.findOneAndDelete({ _id: req.params.userId })
    res.redirect('/read')
})

app.listen(3000, () => {
    console.log('App Running On http://localhost:3000');
})
