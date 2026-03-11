const { client } = require('../config/redis')
const { getWeatherFromAPI } = require('../services/weatherService')

const getWeather = async (req, res) => {
    try {
        const city = req.params.city.toLowerCase();

        //Check cache
        const cacheData = await client.get(city);

        if (cacheData) {
            return res.json({
                source: "cache",
                data: JSON.parse(cacheData)
            });
        }

        //Fetch from api
        const weatherData = await getWeatherFromAPI(city);

        //Store in Redis
        await client.set(city, JSON.stringify(weatherData), {
            EX: 43200
        })

        return res.json({
            source: "api",
            data: weatherData
        })
    } catch (error) {
        return res.json({
            message: "Failed to fetch weather",
            error: error.message
        })
    }
}

module.exports = { getWeather }