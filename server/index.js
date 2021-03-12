const express = require('express')
const cors = require('cors')
const useRouter = require('./routers/user')
require('./db')

const app = express()
const PORT = process.env.PORT || 3030

app.use(express.json())
app.use(cors())
app.use(useRouter)
// we've provided userRouter as amiddleware for the
// Express app so that we can make API requests to it.

app.get('/', (req, res) => res.send('Express server started successfully.'))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
