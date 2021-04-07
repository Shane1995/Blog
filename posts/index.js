const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

const posts = {};

app.use(cors());

app.use(express.json());

app.post('/posts/create', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'PostCreated',
    data: {
      id,
      title,
    },
  });

  return res.send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log(req.body.type);
  res.send({ status: 'ok' });
});

app.listen(4000, () => {
  console.log('v55');
  console.info('Listening on Port 4000');
});
