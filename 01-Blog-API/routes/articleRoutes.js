const express = require('express');
const router = express.Router();

const {
    getArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle
} = require('../controllers/articleControllers')

router.get('/', getArticles);

router.get('/:id', getArticleById);

router.post('/', createArticle);

router.put('/:id', updateArticle);

router.delete('/:id', deleteArticle);

module.exports = router;