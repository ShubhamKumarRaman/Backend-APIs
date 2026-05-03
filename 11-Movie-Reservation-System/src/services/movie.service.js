import Movie from '../models/movie.model'
import redis from '../config/redis'

const CACHE_TTL = 60;//seconds

export const createMovie = async (data) => {
    const movie = await Movie.create(data);

    //invalid cache
    await redis.del('movies:list');

    return movie;
}

export const getMovies = async (query) => {
    const cacheKey = 'movies:list';

    const cached = await redis.get(cacheKey);

    if (cached) {
        return JSON.parse(cached);
    }

    const movies = await Movie.find(query);

    await redis.set(cacheKey, JSON.stringify(movies), 'EX', CACHE_TTL);

    return movies;
}

export const searchMovies = async (search) => {
    return Movie.find({
        $text: { $search: search }
    })
}