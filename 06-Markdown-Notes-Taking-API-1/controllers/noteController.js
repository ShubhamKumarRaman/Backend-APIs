const Note = require('../models/Note')
const convertMarkdownToHTML = require('../services/markdownService')
const checkGrammar = require('../services/grammarService')

// Create Note
exports.createNote = async (req, res) => {
    try {
        const { title, markdown } = req.body;

        const html = convertMarkdownToHTML(markdown)

        const files = req.files?.map((file) => ({
            filename: file.filename,
            path: file.path
        }));

        const note = await Note.create({
            title,
            markdown,
            html,
            attachments: files
        })

        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// get HTML version
exports.getRenderdNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" })
        }

        res.json({
            html: note.html
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Grammar Check
exports.checkNoteGrammar = async (req, res) => {
    try {
        const { text } = req.body;

        const result = await checkGrammar(text);

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//Get all note
exports.getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find();

        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}