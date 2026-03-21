const marked = require('marked')

exports.renderMarkdown = (markdown) => {
    return marked.parse(markdown);
}