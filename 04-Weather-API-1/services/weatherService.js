const axios = require('axios')

const getWeatherFromAPI = async (city) => {
    const API_KEY = process.env.WEATHER_API_KEY;

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${API_KEY}`

    const response = await axios.get(url);

    return response.data;
}

module.exports = { getWeatherFromAPI };