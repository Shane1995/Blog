const express = require('express')
const axios = require('axios')

const app = express()

app.use(express.json())

app.post('/events', async (req, res) => {
  console.log(req.body.type)
  const { type, data } = req.body

  if (type === 'CommentCreated') {
    const status = data.content.includes('oranges') ? 'rejected' : 'approved'
    console.log(data.content)
    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        content: data.content,
        status
      }
    })
  }

  res.send({ status: 'OK' })
})

app.listen(4003, () => {
  console.info('Listening on port 4003')
})
