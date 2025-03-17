const mongConnect = require('./db')
let cors = require('cors')
const user = require('./models/User')
const express = require('express')
const app = express()
const port = 5000


app.use(cors())
app.use(express.json())
// Available Routes
app.use('/api/auth',require('./routes/auth'))



app.get('/', (req, res) => {
  res.send('Hello World!')
})
mongConnect();

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})

