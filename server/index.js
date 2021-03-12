const express = require('express')
require('./db')

const app = express()
const PORT = process.env.PORT || 3030

app.get('/', (req, res) => res.send('Express server started successfully.'))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
