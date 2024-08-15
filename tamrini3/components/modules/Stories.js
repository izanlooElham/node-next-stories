"use client"

import { useEffect, useRef, useState } from "react"
import StoryCard from "./StoryCard"
import styles from "./Stories.module.css"


const videoFileMap=[
  {'video1':"videos/video1.mp4"},
  {'video2':"videos/video2.mp4"},
  {'video3':"videos/video3.mp4"},
  {'video4':"videos/video4.mp4"},
  {'video5':"videos/video5.mp4"},
  {'video6':"videos/video6.mp4"},
  {'video7':"videos/video7.mp4"}
]



function Stories() {

const [videoId, setVideoId]=useState(null)
const videoRef = useRef(null)
const [showVideoModal, setShowVideoModal] = useState(false);


function palyVideo(e, id){
  e.preventDefault()
  setVideoId(id)
  setShowVideoModal(true);
}

useEffect(() => {
  if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute("src");
      videoRef.current.load();
      videoRef.current.addEventListener("ended", () => {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    });
  }
  document.addEventListener("click", handleDocumentClick);

  // Clean up event listener when component unmounts
  return () => {
    document.removeEventListener("click", handleDocumentClick);
  };
}, [videoId]);


// close the video when click on another where
const handleDocumentClick = (e) => {
  if (videoRef.current && !videoRef.current.contains(e.target)) {
    setShowVideoModal(false)
  }
};

  return (
    <div className={styles.container}>
       {  videoFileMap.map((fileName)=>{
          const id=Object.keys(fileName)[0]
          return(
            <StoryCard 
            id={id}
            key={id} 
            onClick={(e) => palyVideo(e, id)}
             showVideoModal={showVideoModal} 
             videoId={videoId} 
             videoRef={videoRef}/>
          )
        })}
        
       
    </div>
  )
}

export default Stories