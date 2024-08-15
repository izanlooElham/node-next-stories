const fs=require("fs")
const express=require("express")

const app=express()

const videoFileMap = {
    'video1': {
      videoPath: "videos/video1.mp4",
      imagePath: "images/image1.jpg"
    },
    'video2': {
      videoPath: "videos/video2.mp4",
      imagePath: "images/image2.jpg"
    },
    'video3': {
      videoPath: "videos/video3.mp4",
      imagePath: "images/image3.jpg"
    },
    'video4': {
      videoPath: "videos/video4.mp4",
      imagePath: "images/image4.jpg"
    },
    'video5': {
      videoPath: "videos/video5.mp4",
      imagePath: "images/image5.jpg"
    },
    'video6': {
      videoPath: "videos/video6.mp4",
      imagePath: "images/image6.jpg"
    },
    'video7': {
      videoPath: "videos/video7.mp4",
      imagePath: "images/image7.jpg"
    }
  };

app.get("/videos/:filename", (req,res)=>{
    const fileName=req.params.filename
    const fileInfo=videoFileMap[fileName]
    if(!fileInfo){
        return res.status(404).send("the file in not available")
    }
    const { videoPath, imagePath } = fileInfo;
    const stat=fs.statSync(videoPath)
    const fileSize=stat.size
    const range=req.headers.range

    if(range){
        const parts=range.replace(/bytes=/, '').split('-')
        const start=parseInt(parts[0], 10)
        const end=parts[1] ? parseInt(parts[1], 10) : fileSize-1
        const chunkSize=end-start +1
        const videoFile=fs.createReadStream(videoPath , {start, end})
        const head={
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges':'bytes',
            'Content-Length':chunkSize,
            'Content-Type':'video/mp4'
        }
        res.writeHead(206,head)
        videoFile.pipe(res)
    }else{
        const head={
            'Content-Length':fileSize,
            'Content-Type':'video/mp4'
        }
        res.writeHead(200,head)
        fs.createReadStream(videoPath).pipe(res)

    }

})
app.get("/images/:id", (req, res) => {
    const fileName = req.params.id;
    const imagePath = videoFileMap[fileName].imagePath;
  
    if (!imagePath) {
      return res.status(404).send("The thumbnail is not available");
    }
  
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        return res.status(500).send("Error reading thumbnail file");
      }
      res.setHeader('Content-Type', 'image/jpg');
      res.send(data);
    });
  });

app.listen(5000, ()=>{
    console.log("server run on port 5000: http://localhost:5000")
})
