import React from 'react'
import axios from 'axios'
import PollCard from "./PollCard"
import { useEffect, useState } from 'react'

const PollList = () => {

    const [polls, setPolls] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:4000/api/polls')
        .then(res=>setPolls(res.data))
    },[])
    
  return (
    <div>
      {
        polls.map(poll=>(
            <PollCard key = {poll._id} poll = {poll}/>
        ))
      }
    </div>
  )
}

export default PollList
