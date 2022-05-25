const { rename } = require('fs');
const { join } = require('path');

rename(join(__dirname, '../stats.html'), join(__dirname, '../src/dist/stats.html'), (err) => {
	if (err) {
		console.log('ERROR: ' + err);
	}
	else {
		console.log('Successfully moved stats.html');
	}
});