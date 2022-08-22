const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const port = 3000
const publisher  = require('./publisher');
const consumer  = require('./consumer');

app.post('/publisher', publisher)
app.get('/consumer', consumer)

app.listen(port, () => {
  console.log(`Rabbit-express app listening on port ${port}`)
})