import Show from '../models/show.model'

export const createShow = async (data) => {
    const { screenId, startTime, endTime } = data;

    //Check overlapping
    const conflict = await Show.findOne({
        screenId,
        $or: [
            {
                startTime: { $lt: endTime },
                endTime: { $gt: startTime }
            }
        ]
    });

    if (conflict) {
        throw new Error('Show timing overlaps with existing show');
    }
    return Show.create(data);
}

export const getShowByMovie = async (movieId) => {
    return Show.find({ movieId })
        .populate('theaterId')
        .populate('screenId');
}