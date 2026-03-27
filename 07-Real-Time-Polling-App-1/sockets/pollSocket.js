const Poll = require('../models/Poll')

const pollSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected: ", socket.id);

        // Join poll room
        socket.on("joinPoll", (pollId) => {
            socket.join(pollId);
        })

        //Vote event
        socket.on("vote", async ({ pollId, optionIndex }) => {
            try {
                const poll = await Poll.findById(pollId);

                if (!poll) return;

                poll.options[optionIndex].votes += 1;
                await poll.save();

                //Emit updated poll to all users in that room 
                io.to(pollId).emit("pollUpdated", poll);
            } catch (error) {
                console.error(error);
            }
        })

        socket.on("disconnect", () => {
            console.log("User disconnected");
        })
    })
}

module.exports = pollSocket;