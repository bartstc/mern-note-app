const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const notes = require('./routes/notes');

app.use(cors());
app.use(bodyParser.json());

const db = require('./config/keys').mongoURL;
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected ...'))
  .catch(err => console.log(err));

app.use('/notes', notes);

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started on port ${port}`));