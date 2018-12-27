const ngrok = require('ngrok');
(async function() {
	try {
		const url = await ngrok.connect(80);
		await console.log("Connected!: "+url);
	} catch(e) {
		console.log("Error: "+e);
	}
})();
