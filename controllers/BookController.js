const mysql = require('mysql2')
const koneksi = require('../config/database')
const pool = mysql.createPool(koneksi)

const {
    responseNotFound,
    responseSucces
} = require('../traits/ApiResponse')


const getBooks = (req, res) => {
    const query = "SELECT * FROM books"

    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query(query, (err, result) => {
            if (err) throw err

            responseSucces(res, result, 'Books succesfully fetched')
        })
        connection.release()
    })
}

const getBook = (req, res) => {
    const id = req.params.id

    const query = `SELECT * FROM books WHERE id=${id}`
    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query(query, (err, result) => {
            if (err) throw err

            if (result.length == 0) {
                responseNotFound(res)
                return
            }

            responseSucces(res, result, 'Book succesfully fetched')
        })
        connection.release()
    })
}

const addBook = (req,res) => {
    const data = {
        nama: req.body.nama,
        author: req.body.author,
        publisher: req.body.publisher,
        year: req.body.year,
        page_count: req.body.page_count
    }

    const query = `INSERT INTO books SET ?`

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, [data], (err,result) => {
            if(err) throw err 

            responseSucces(res, result, 'Book succesfully added')
        })
        connection.release()
    })
}

const updateBook = (req,res) => {
    const id = req.params.id

    const data = {
        nama: req.body.nama,
        author: req.body.author,
        publisher: req.body.publisher,
        year: req.body.year,
        page_count: req.body.page_count
    }
    const query = `UPDATE books SET ? WHERE id=${id}`
    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, [data], (err, result) => {
            if(err) throw err

            if(result.affectedRows == 0){
                responseNotFound(res)
                return
            }
            responseSucces(res,result, 'Book succesfully update')
        })
        connection.release()
    })
}

const deleteBook = (req, res) => {
    const id = req.params.id

    const query = `DELETE FROM books WHERE id=${id}`
    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, (err, result) => {
            if(err) throw err

            if(result.affectedRows == 0){
                responseNotFound(res)
                return
            }
            responseSucces(res, result, 'Book successfully deleted')
        })
        connection.release()
    })
}


module.exports = {
    getBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook
}