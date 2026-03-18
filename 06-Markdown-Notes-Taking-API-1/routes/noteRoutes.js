const express = require('express')
const router = express.Router()

const noteController = require('../controllers/noteController')
const upload = require('../middleware/uploadMiddleware')

//Create note with file upload
router.post(
    "/",
    upload.array("files"),
    noteController.createNote
);

//Get HTML rendered note
router.get('/:id/render', noteController.getRenderdNote)

//Grammar Check
router.post('/grammar-check', noteController.checkNoteGrammar)

//Get all notes
router.get('/', noteController.getAllNotes)

module.exports = router;