const bookService = require('../services/book.service')

exports.getBooks = async (req, res) => {
    try {
        const data = await bookService.getBooks(req.query);
        res.json(data);
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.createBook = async (req, res) => {
    const book = await bookService.createBook(req.body);
    res.status(201).json(book);
}

exports.updateBook = async (req, res) => {
    const book = await bookService.updateBook(req.params.id, req.body);
    res.json(book);
}

exports.deleteBook = async (req, res) => {
    await bookService.deleteBook(req.params.id);
    res.json({ message: 'Deleted successfully' })
}