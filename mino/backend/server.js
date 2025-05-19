const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Testing for the backend of Mino');
});

app.listen(port, () => {
    console.log(`Example for testing which is on port ${port}`);
})