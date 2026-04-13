const express = require('express');
const router = express.Router();

const bookController = require('../controllers/book.controller')
const { authMiddleware } = require('../middlewares/auth.middleware')
const { validate } = require('../middlewares/validate.middleware')
const { bookSchema } = require('../validators/book.validator')

router.get('/', bookController.getBooks);
router.post('/', authMiddleware, validate(bookSchema), bookController.createBook);
router.put('/:id', authMiddleware, bookController.updateBook);
router.delete('/:id', authMiddleware, bookController.deleteBook);

module.exports = router;