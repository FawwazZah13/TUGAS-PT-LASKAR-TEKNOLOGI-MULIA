const mysql = require('mysql2')
const koneksi = require('../config/database')
const pool = mysql.createPool(koneksi)

const {
    responseNotFound,
    responseSucces
} = require('../traits/ApiResponse')


const getAuthors = (req, res) => {
    const query = "SELECT * FROM author"

    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query(query, (err, result) => {
            if (err) throw err

            responseSucces(res, result, 'Author succesfully fetched')
        })
        connection.release()
    })
}

const getAuthor = (req, res) => {
    const id = req.params.id

    const query = `SELECT * FROM author WHERE id=${id}`
    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query(query, (err, result) => {
            if (err) throw err

            if (result.length == 0) {
                responseNotFound(res)
                return
            }

            responseSucces(res, result, 'Author succesfully fetched')
        })
        connection.release()
    })
}

const addAuthor = (req,res) => {
    const data = {
        nama: req.body.nama,
        email: req.body.email,
        alamat: req.body.alamat,
        umur: req.body.umur,
        media_sosial: req.body.media_sosial
    }

    const query = `INSERT INTO author SET ?`

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, [data], (err,result) => {
            if(err) throw err 

            responseSucces(res, result, 'Author succesfully added')
        })
        connection.release()
    })
}

const updateAuthor = (req,res) => {
    const id = req.params.id

    const data = {
        nama: req.body.nama,
        email: req.body.email,
        alamat: req.body.alamat,
        umur: req.body.umur,
        media_sosial: req.body.media_sosial
    }
    const query = `UPDATE author SET ? WHERE id=${id}`
    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, [data], (err, result) => {
            if(err) throw err

            if(result.affectedRows == 0){
                responseNotFound(res)
                return
            }
            responseSucces(res,result, 'Author succesfully update')
        })
        connection.release()
    })
}

const deleteAuthor = (req, res) => {
    const id = req.params.id

    const query = `DELETE FROM author WHERE id=${id}`
    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, (err, result) => {
            if(err) throw err

            if(result.affectedRows == 0){
                responseNotFound(res)
                return
            }
            responseSucces(res, result, 'Author successfully deleted')
        })
        connection.release()
    })
}


module.exports = {
    getAuthors,
    getAuthor,
    addAuthor,
    updateAuthor,
    deleteAuthor
}