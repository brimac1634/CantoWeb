export const setupPlayBack = (context, audio) => {
    const playSound = context.createBufferSource();
    playSound.buffer = audio;
    playSound.connect(context.destination);
    return playSound
}

// export const playBack = (playSound) => {
//     const context = playSound.context;
//     if (playSound.start) {
//         playSound.start(context.currentTime);
//     } else if (playSound.play) {
//         playSound.play(context.currentTime);
//     } else if (playSound.noteOn) {
//         playSound.noteOn(context.currentTime);
//     }
// }

export const audioRequest = (entryID) => {
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();

    return Promise.race([fetch(`${process.env.REACT_APP_SERVER_URL}/stream-audio`, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({entryID})
	}),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), 20000)
        )
    ])
    	.then(data => data.arrayBuffer())
        .then(arrayBuffer => {
            return {context, arrayBuffer}
        })
    	.catch(() => {
            console.log('Failed to retrieve audio')
        })		
}
