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

// Adding Note
app.post('/api/v1/notes', async (req, res) => {
  try {
    const { title, copy, status, order_id } = req.body;
    if (!title) return res.status(422).json('Please provide a title, copy and status.');
    const notes = await database('notes').select();
    const id = await database('notes').insert({ title, copy, status, order_id }, 'id');
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Deleting Note
app.delete('/api/v1/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const matchingNotes = await database('notes').where({ id });
    if (!matchingNotes.length) return res.sendStatus(404);
    await database('notes')
      .where({ id })
      .del();
    res.status(204).json('Note Deleted');
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Updating Note
app.put('/api/v1/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, copy, status } = req.body;
    if (!title) return res.status(422).json('Please provide a title, copy and status.');
    const matchingNote = await database('notes').where({ id });
    if (!matchingNote.length) return res.status(404).json('Note not found.');
    await database('notes')
      .where({ id })
      .update({ title, copy, status });
    res.status(202).json('Title Updated Successfully');
  } catch (error) {
    res.status(500).json({ error });
  }
});



module.exports = app;
