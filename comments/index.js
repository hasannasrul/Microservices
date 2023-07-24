const express = require('express');
const {randomBytes} = require('crypto')
const bodyparser = require('body-parser')

const app = express()
app.use(bodyparser.json())

commentsByPostId = {}

app.get("/posts/:id/comments", (req,res) => {
    const comments = commentsByPostId[req.params.id] || []
    res.send(comments)
})

app.post("/posts/:id/comments", (req,res) => {
    const commentsId = randomBytes(4).toString('hex')
    const { content } = req.body
    const comments = commentsByPostId[req.params.id] || []
    comments.push({id: commentsId, content})
    commentsByPostId[req.params.id] = comments
    res.status(201).send(comments)
})

app.listen(4001, () => {
    console.log('Server running at port 4001 ...')
})