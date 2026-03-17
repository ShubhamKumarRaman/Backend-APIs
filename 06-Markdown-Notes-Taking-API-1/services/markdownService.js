const {marked} = require('marked')

const convertMarkdownToHTML = (markdownText)=>{
    return marked(markdownText);
}

module.exports = convertMarkdownToHTML;