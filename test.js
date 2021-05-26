// Simple Express app to make some quick debug tests

const express = require('express')
const app = express()
const port = 3334

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
