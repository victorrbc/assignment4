const con = require('pg').Pool

const db = new con({
    user: 'root',
    host: 'localhost',
    database: 'db_assignment',
    password: 'root',
    port: 5432,
})

const getUsers = (request, response) => {
    db.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            response.status(error.status)
        }
        response.status(201).json(results.rows)
    })
}
const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
    db.query('SELECT * FROM users WHERE id = $1;', [id], (error, results) => {
        if (error) {
            response.status(error.status)
        }
        response.status(201).json(results.rows)
    })
}
const createUser = (request, response) => {
    const {
        name,
        email
    } = request.body
    db.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
        if (error) {
            response.status(error.status)
        }        
    })
    db.query('select max(id) from users', (error, results)=>{
        if (error) {
            response.status(error.status)
        }        
        response.status(201).send("User added : "+results.rows[0].max+','+name+','+email)
    })
}
const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const {
        name,
        email
    } = request.body
    db.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
        (error, results) => {
            if (error) {
                response.status(error.status)
            }
            else{
                response.status(201).send({"success": true})
            }
        }
    )
}
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
    db.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        console.log(error, results)
        if (error) {
            response.status(error.status)
        }
        else{
            response.status(201).send({"success": true})
        }
    })
}
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}