var express = require('express'),
  axios = require('axios');

var app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/api/messages/get', (req, res) => readMessages(req, res))
app.get('/api/messages/:messageId', (req, res) => readMessages(req, res))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


function readMessages(req, res) {
  if (req.params.messageId) {
    axios.get(`https://flatfilesvirual.blob.core.windows.net/flatfiles/${req.params.messageId}.json`)
      .then((response) => {
        res.json(response.data)
      })
      .catch((error) => res.send(error));
  } else {
    axios.get(`https://flatfilesvirual.blob.core.windows.net/flatfiles/get.json`).then((response) => {
      res.json(response.data)
    }).catch((err) => res.send(err));
  }
}