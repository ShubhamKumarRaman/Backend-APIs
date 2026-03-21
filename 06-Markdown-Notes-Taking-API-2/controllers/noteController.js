const Note = require('../models/Note')
const { renderMarkdown } = require('../services/markdownService')
const { createVersion } = require('../services/versionService')


//Create a new note
exports.createNote = async (req, res) => {
    const { title, markdown } = req.body;

    const html = renderMarkdown(markdown);

    const note = await Note.create({
        title,
        markdown,
        html,
        owner: req.user.id
    })

    res.status(201).json(note)
}

//Get all notes
exports.getNotes = async (req, res) => {
    const notes = await Note.find({ owner: req.user.id })
    res.json(notes)
}

//Update note with version history
exports.upldateNote = async (req, res) => {
    const note = await Note.findById(req.params.id);

    await createVersion(note._id, note.markdown)

    note.markdown = req.body.markdown
    note.html = renderMarkdown(req.body.markdown)

    await note.save();
    res.json(note)
}