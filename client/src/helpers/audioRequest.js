import axios from 'axios';

export const setupPlayBack = (context, audio) => {
    const playSound = context.createBufferSource();
    playSound.buffer = audio;
    playSound.connect(context.destination);
    return playSound
}

export const audioRequest = (entryID, playNow) => {
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();
    return axios({
        method: 'POST',
        url: '/stream-audio',
        data: {entryID},
        headers: {'Content-Type': 'application/json'}
    }).then(({ data }) => {
        console.log(data.arrayBuffer())
        if (data.status === 404) {
            throw new Error()
        } else {
            return data.arrayBuffer()
        }
    }).then(arrayBuffer => {
        console.log(arrayBuffer)
        if (playNow) {
            context.decodeAudioData(arrayBuffer, decodedAudio => {
                const playSound = setupPlayBack(context, decodedAudio)
                playSound.start(0);
            }, ()=>new Error())
        } else {
            return {context, arrayBuffer}
        }
    }).catch()		
}
