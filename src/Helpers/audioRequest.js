export const setupPlayBack = (context, audio) => {
    const playSound = context.createBufferSource();
    playSound.buffer = audio;
    playSound.connect(context.destination);
    return playSound
}

export const audioRequest = (entryID) => {
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();
    // ${process.env.REACT_APP_SERVER_URL}
    return Promise.race([fetch(`http://localhost:3000/stream-audio`, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({entryID})
	}),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), 20000)
        )
    ])
    	.then(data => {
            if (data.status === 404) {
                throw new Error()
            } else {
                return data.arrayBuffer()
            }
        })
        .then(arrayBuffer => {
            return {context, arrayBuffer}
        })
    	.catch()		
}
