const express = require('express');
const {randomBytes} = require('crypto')
const bodyparser = require('body-parser')

const app = express();
app.use(bodyparser.json())

posts = {}

app.get("/posts", (req,res) => {
    res.status(200)
    res.send(posts)
})

app.post("/posts", (req,res) => {
    const postId = randomBytes(8).toString('hex')
    posts[postId] = {
        postId: postId,
        name: req.body.name
    }
    res.status(201)
    res.send("Post Created")
})

app.listen(4000, () => {
    console.log('Server running at port 4000 ...')
})