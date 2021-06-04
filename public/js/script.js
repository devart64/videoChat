const VideoContainer = document.getElementById('video-container');
const myVideo = document.getElementById('element-video');



navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
}).then((stream) => {
    console.log(stream)
    myVideo.srcObject = stream
    myVideo.addEventListener('loadmetadata', (e) => {
        myVideo.muted = true,
        myVideo.play()
    });
    VideoContainer.append(myVideo);
});