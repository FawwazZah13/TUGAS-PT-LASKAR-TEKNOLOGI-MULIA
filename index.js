//Bikin express janlup instal express nya npm int -y dan npm i express
const express = require('express')
const mysql = require('mysql2')
const bookRoute = require('./routes/book')
const authorRoute = require('./routes/author')
const koneksi = require('./config/database')
const pool = mysql.createPool(koneksi)


pool.on('error', (err) => {
    console.log(err)
})

const app = express()
const port = 2000

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// //Membuat parameter " : "
// app.get ('/contohparameter/:username/:jurusan/:kelas', (req,res) => {
//     res.json(req.params)
// })

// app.get('/contohparam', (req,res) => {
//     res.json(req.query)
// })

app.get('/', (req,res) => {
    res.write('Hello World')
    res.end()
})

//Manggil
app.use('/book', bookRoute)
app.use('/author', authorRoute)

app.listen(port, () => {
    console.log(`server berajalan di http://localhost:${port}`)
})