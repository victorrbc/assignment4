const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const path = require('path');
const port = 3000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

//serving public file
app.use(express.static("views"));

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname,"/views/html/home.html"));
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})