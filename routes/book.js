const express = require('express')

const route = express.Router()

const {
    getBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook
} = require('../controllers/BookController')

//Route untuk menampilkan data
route.get('/', getBooks) 

//Route untuk mengirim data
route.post('/', addBook)

route.get('/:id', getBook)

//Route untuk memperabrui data / update data
route.put('/:id', updateBook)
//Route untuk menghapus data
route.delete('/:id', deleteBook)

module.exports = route