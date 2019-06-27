import { optionAlert } from '../Containers/OptionAlert/OptionAlert';

export default (entryID) => {
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();
    let audio;
    let playSound;

    function webAudioTouchUnlock(context) {
        if (context.state === 'suspended' && 'ontouchstart' in window) {
            var unlock = function() {
                context.resume().then(function() {
                    document.body.removeEventListener('touchstart', unlock);
                    document.body.removeEventListener('touchend', unlock);
                });
            };

            document.body.addEventListener('touchstart', unlock, false);
            document.body.addEventListener('touchend', unlock, false);
        }
    }

    function playBack() {
        playSound = context.createBufferSource();
        playSound.buffer = audio;
        playSound.connect(context.destination);
        if (playSound.start) {
            playSound.start(context.currentTime);
        } else if (playSound.play) {
            playSound.play(context.currentTime);
        } else if (playSound.noteOn) {
            playSound.noteOn(context.currentTime);
        }

        webAudioTouchUnlock(playSound.context)
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
        .then(arrayBuffer => {
            context.decodeAudioData(arrayBuffer, decodedAudio => {
                audio = decodedAudio;

                playBack()
            }, error => console.error(error))
        })
    	.catch(err=>{
            console.log(err)
            optionAlert({
                title: 'Audio Not Found',
                message: 'The audio clip for this entry could not be found.'
            })
        })		
}
