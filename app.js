const express = require('express')
const cors = require('cors');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.json('Server Running!')
});

app.get('/api/v1/orders', (request, response) => {
  database('orders').select()
    .then((orders) => {
      response.status(200).json(orders);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/notes', (request, response) => {
  database('notes').select()
    .then((notes) => {
      response.status(200).json(notes);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});



module.exports = app;
