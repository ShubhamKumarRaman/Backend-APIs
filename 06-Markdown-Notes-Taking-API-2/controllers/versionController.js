const Version = require("../models/Version")

// ger version history
exports.getVersions = async (req, res) => {
    const versions = await Version.find({
        noteId: req.params.noteId
    })

    res.json(versions)
}