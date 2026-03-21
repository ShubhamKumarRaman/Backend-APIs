const axios = require('axios')

exports.checkGrammar = async (text) => {
    const response = await axios.post(
        "https://api.languagetool.org/v2/check",
        new URLSearchParams({
            text,
            language: "en-US"
        })
    )

    return response.data.matches;
}