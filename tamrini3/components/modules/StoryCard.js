"use client"


import styles from "./StoryCard.module.css"
import Image from "next/image";



function StoryVideo({videoId , onClick , videoRef, showVideoModal,id}) {
  
 
 

  return (
    <>
    <div className={styles.container} onClick={onClick}>
      <div className={styles.circle}>
         <Image width={400} height={400} src={`http://localhost:5000/images/${id}`} style={{borderRadius:"50%"}}/>
      </div>
    </div>
    {showVideoModal && (
        <div className={styles.videoModal}>
          <div className={styles.videoModalContent}>
            <video  ref={videoRef} controls autoPlay>
              <source
                src={`http://localhost:5000/videos/${videoId}`}
                type="video/mp4"
              ></source>
            </video>
          </div>
        </div>
      )}

    </>
  )
}

export default StoryVideo