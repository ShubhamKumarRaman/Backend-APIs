const Book = require('../models/book.model')

exports.getBooks = async (query) => {
    const { page = 1, limit = 10, genre, search } = query;

    const filter = {};

    if (genre) {
        filter.genre = genre;
    }

    if (search) {
        filter.title = { $regex: search, $options: 'i' }
    }

    const books = await Book.find(filter)
        .skip((page - 1) * limit)
        .limit(Number(limit));

    const total = await Book.countDocuments(filter);

    return { books, total };
}

exports.createBook = (data) => Book.create(data);

exports.updateBook = (id, data) => {
    Book.findByIdAndUpdate(id, data, { new: true });
}

exports.deleteBook = (id) => Book.findByIdAndDelete(id);