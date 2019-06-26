import { optionAlert } from '../Containers/OptionAlert/OptionAlert';

export default (entryID) => {
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();
    let audio;
        
    function playBack() {
        const playSound = context.createBufferSource();
        playSound.buffer = audio;
        playSound.connect(context.destination);
        playSound.start(context.currentTime);
    }

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
        .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
        .then(decodedAudio => {
            audio = decodedAudio;
            playBack()
        })
    	.catch(()=>{
            optionAlert({
                title: 'Audio Not Found',
                message: 'The audio clip for this entry could not be found.'
            })
        })		
}