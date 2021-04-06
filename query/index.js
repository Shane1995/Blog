const express = require('express')
const cors = require('cors')
const axios = require('axios').default

const app = express()

app.use(express.json())
app.use(cors())

const posts = {}

const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data

    posts[id] = { id, title, comments: [] }
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data

    const post = posts[postId]
    post.comments.push({ id, content, status })
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data

    const post = posts[postId]
    const comment = post.comments.find((cmt) => {
      return cmt.id === id
    })
    comment.status = status
    comment.content = content
  }
}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/events', (req, res) => {
  console.log(req.body.type)
  const { type, data } = req.body

  handleEvent(type, data)

  res.send({ status: 'OK' })
})

app.listen(4002, async () => {
  console.info('listening on port 4002')
  const response = await axios.get('http://event-bus-srv:4005/events').catch((err) => {
    console.warn(err)
  })

  if (response) {
    for (let event of response.data) {
      console.info('Processing event: ', event.type)

      handleEvent(event.type, event.data)
    }
  }
})
