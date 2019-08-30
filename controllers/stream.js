const { AudioNotFound } = require('../errorCodes');
const AWS = require('aws-sdk');


const s3 = new AWS.S3();

const handleStream = (req, res) => {
	const { entryID } = req.body;
	const key = `entryID_${entryID}.mp3`;
	const params = {
	    Bucket: 'cantotalk-audio-clips',
	    Key: key
	}
	const downloadStream = s3.getObject(params).createReadStream();

	downloadStream.on('error', error => {
	    res.status(404).send(new AudioNotFound());
	});

	res.set({ 
		'Content-Type': 'audio/mp3',
		'Transfer-Encoding': 'chunked' 
	});
	downloadStream.pipe(res);
}


module.exports = {
	handleStream,
}