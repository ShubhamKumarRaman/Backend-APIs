const Version = require('../models/Version')

exports.createVersion = async (noteId, markdown) => {
    await Version.create({
        noteId,
        markdown
    })
}