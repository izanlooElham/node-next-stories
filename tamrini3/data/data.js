"use client"

async function videoFaetching(){
    const res=await fetch("http://localhost:3000")
    const video=await res.json()
    return video
}

export default videoFaetching