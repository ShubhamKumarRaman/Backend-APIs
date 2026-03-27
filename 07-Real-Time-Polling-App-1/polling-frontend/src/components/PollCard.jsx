import React from 'react'
import socket  from '../socket'
import { useEffect, useState } from 'react';
const PollCard = ({ poll }) => {

    const [data, setData] = useState(poll);

    useEffect(()=>{
        //Join poll room
        socket.emit("joinPoll", poll._id);

        //Listen for updates
        socket.on("pollUpdated", (updatedPoll)=>{
            if(updatedPoll._id===poll._id){
                setData(updatedPoll);
            }
        })

        return ()=>{
            socket.off("pollUpdated");
        }
    },[poll._id]);

    const handleVote = (index)=>{
        socket.emit("vote", {
            pollId:poll._id, 
            optionIndex:index
        })
    }

  return (
    <div style={{border:"1px solid black", margin:10, padding:10}}>
        <h3>{data.question}</h3>
        {
            data.options.map((opt,index)=>(
                <div key={index}>
                    <button onClick={()=>handleVote(index)}>
                    {opt.text}
                    </button>
                    <span>Votes: {opt.votes}</span>
                </div>   
            ))
        }
    </div>
  )
}

export default PollCard
