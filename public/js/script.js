const VideoContainer = document.getElementById('video-container');
const myVideo = document.getElementById('element-video');
myVideo.muted = true;
const socket = io("/");
const myPeer = new Peer(undefined, {
    host: "peerjs-server.herokuapp.com",
    secure: true,
    port: 443,
})

const peers = {};


navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
}).then((stream) => {
    console.log(stream)

    addVisedoStream(myVideo, stream);

    myPeer.on('call', call => {
        call.answer(stream);
        const video = document.getElementById('element-video-exterieur');
        call.on('stream', (userVideoStream) => {
            addVisedoStream(video, userVideoStream);
        })
    })

    socket.on('user-connect', (userId) => {
        console.log('user ID: ' + userId)
        connectToNewUser(userId, stream);
    })

}); 

myPeer.on('open', id => {
    socket.emit("join-room", ROOM_ID, id); 
})






connectToNewUser = (userId, stream) => {
    const call = myPeer.call(userId, stream);
    const video = document.getElementById('element-video');
    call.on('stream', (userVideoStream) => {
        addVisedoStream(video, userVideoStream);
    })
}


addVisedoStream = (video, stream) => {
    video.srcObject = stream
    video.addEventListener('loadmetadata', (e) => {
        video.play()
    });
    VideoContainer.append(video);
}