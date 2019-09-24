const commandExists = require('command-exists');
const mngr = require('system-installer').installer;


console.log(process.platform);


// si no está instalado chrominium lo instalamos, dependencia de puppeter headless
installChrominium();


async function installChrominium() {
	commandExists('chromium-browser --version')
		.then(function (command) {
			console.log(command + " ya esta instalado");
			// proceed
		}).catch(function () {
			// command doesn't exist
			console.log('no funciona');
			mngr('chromium-browser')
				.then(function (data) {
					// returns installation output
					console.log(data);
					console.log('Se ha instalado Chrominium');
				})
				.catch(function (err) {
					console.log(err);
				});
		});
} //28 / 1783970 - 37
