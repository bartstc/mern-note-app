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

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
};

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started on port ${port}`));