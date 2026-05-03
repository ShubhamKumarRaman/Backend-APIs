import redis from "../config/redis";

const LOCK_TTL = 300;//5 min

export const lockSeats = async (showId, seats, userId) => {
    const lockedSeats = [];

    try {
        for (const seat of seats) {
            const key = `lock:${showId}:${seat}`;

            const result = await redis.set(key, userId, 'NX', 'EX', LOCK_TTL);

            if (!result) {
                throw new Error(`Seat ${seat} already locked`);
            }

            lockedSeats.push(key);
        }
        return true;
    } catch (error) {
        //rollback locks
        for (const key of lockedSeats) {
            await redis.del(key);
        }
        throw error;
    }
}