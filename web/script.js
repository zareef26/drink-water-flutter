var serviceWorkerVersion = null;
var scriptLoaded = false;
function loadMainDartJs() {
	if (scriptLoaded) {
		return;
	}
	scriptLoaded = true;
	var scriptTag = document.createElement('script');
	scriptTag.src = 'main.dart.js';
	scriptTag.type = 'application/javascript';
	document.body.append(scriptTag);
}

if ('serviceWorker' in navigator) {
	window.addEventListener('load', function () {
		var serviceWorkerUrl = 'flutter_service_worker.js?v=' + serviceWorkerVersion;
		navigator.serviceWorker.register(serviceWorkerUrl)
			.then((reg) => {
				function waitForActivation(serviceWorker) {
					serviceWorker.addEventListener('statechange', () => {
						if (serviceWorker.state == 'activated') {
							console.log('Installed new service worker.');
							loadMainDartJs();
						}
					});
				}
				if (!reg.active && (reg.installing || reg.waiting)) {
					waitForActivation(reg.installing || reg.waiting);
				} else if (!reg.active.scriptURL.endsWith(serviceWorkerVersion)) {
					console.log('New service worker available.');
					reg.update();
					waitForActivation(reg.installing);
				} else {
					console.log('Loading app from service worker.');
					loadMainDartJs();
				}
			});
		setTimeout(() => {
			if (!scriptLoaded) {
				console.warn(
					'Failed to load app from service worker. Falling back to plain <script> tag.',
				);
				loadMainDartJs();
			}
		}, 4000);
	});
} else {
	loadMainDartJs();
}