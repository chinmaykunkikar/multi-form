const express = require('express')
const useRouter = require('./routers/user')
const path = require('path')
require('./db')

const app = express()
const PORT = process.env.PORT || 3030

app.use(express.static(path.join(__dirname, '..', 'build')))
app.use(express.json())
app.use(useRouter)
// we've provided userRouter as amiddleware for the
// Express app so that we can make API requests to it.

app.get('/', (req, res) => res.send('Express server started successfully.'))

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
})
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
