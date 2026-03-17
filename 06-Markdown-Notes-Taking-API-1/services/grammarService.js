const axios = require('axios')

const checkGrammar = async (text) => {
    const response = await axios.post(
        "https://api.languagetool.org/v2/check",
        new URLSearchParams({
            text: text,
            language: "en-US"
        })
    )
    return response.data.matches;
}

module.exports = checkGrammar;