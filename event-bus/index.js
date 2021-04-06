const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()

app.use(express.json())

const events = []

app.post('/events', (req, res) => {
  const event = req.body

  events.push(event)

  axios.post('http://posts-clusterip-srv:4000/events', event).catch((err) => {
    console.log('POSTS')
    console.log(err)
    console.log('--------------------------------------------------------')
  })
  axios.post('http://comments-srv:4001/events', event).catch((err) => {
    console.log('COMMENTS')
    console.log(err)
    console.log('--------------------------------------------------------')
  })
  axios.post('http://query-srv:4002/events', event).catch((err) => {
    console.log('QUERY')
    console.log(err)
    console.log('--------------------------------------------------------')
  })
  axios.post('http://moderation-srv:4003/events', event).catch((err) => {
    console.log('MODERATION')
    console.log(err)
    console.log('--------------------------------------------------------')
  })
  res.send({ status: 'OK' })
})

app.get('/events', (req, res) => {
  res.send(events)
})

app.listen(4005, () => {
  console.info('Listening on port 4005')
})
