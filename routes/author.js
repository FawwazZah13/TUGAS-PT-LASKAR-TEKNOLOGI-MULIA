const express = require('express')

const route = express.Router()

const {
    getAuthors,
    getAuthor,
    addAuthor,
    updateAuthor,
    deleteAuthor
} = require('../controllers/AuthorController')

//Route untuk menampilkan data
route.get('/', getAuthors) 

//Route untuk mengirim data
route.post('/', addAuthor)

route.get('/:id', getAuthor)

//Route untuk memperabrui data / update data
route.put('/:id', updateAuthor)
//Route untuk menghapus data
route.delete('/:id', deleteAuthor)

module.exports = route