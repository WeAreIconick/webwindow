/**
 * Adds scale-to-fit for embedded pages on the frontend.
 */
(function () {
	const IDEAL_SITE_WIDTH = 1440;
	const IDEAL_SITE_HEIGHT = 900;
	const blocks = document.querySelectorAll('.wp-block-w0-webwindow[data-src]');
	blocks.forEach(block => {
		const src = block.getAttribute('data-src');
		const scaleToFit = block.getAttribute('data-scale-to-fit') === '1';
		if (block.querySelector('.webwindow-js-iframe')) return;
		if (!src) return;
		const outer = block.querySelector('.webwindow-block-embed');
		if (!outer) return;
		const iframeContainer = outer.querySelector('.webwindow-iframe-outer');

		function updateScaleAndCenter(iframe, container) {
			if (!iframe || !container) return;
			var parentWidth = container.offsetWidth || 600;
			var scale = Math.min(1, parentWidth / IDEAL_SITE_WIDTH);
			iframe.style.transform = 'scale(' + scale + ')';
			iframe.style.transformOrigin = 'top left';
			container.style.height = (IDEAL_SITE_HEIGHT * scale) + 'px';
			iframe.style.display = 'block';
			iframe.style.overflow = 'hidden';
		}

		function loadIframe(src) {
			let wrapper = iframeContainer || outer;
			const iframe = document.createElement('iframe');
			iframe.className = 'webwindow-js-iframe';
			iframe.title = 'Embedded Web Page';
			iframe.src = src;
			if (scaleToFit) {
				iframe.style.width = IDEAL_SITE_WIDTH + 'px';
				iframe.style.height = IDEAL_SITE_HEIGHT + 'px';
				iframe.style.border = '1px solid #ddd';
				iframe.style.display = 'block';
				iframe.style.overflow = 'hidden';
				setTimeout(function () {
					updateScaleAndCenter(iframe, wrapper);
				}, 10);
			} else {
				iframe.style.width = '100%';
				iframe.style.minHeight = '400px';
				iframe.style.border = '1px solid #ddd';
				iframe.style.overflow = 'auto';
			}
			iframe.sandbox = 'allow-scripts allow-forms allow-same-origin allow-popups';
			iframe.onerror = function () {
				const warning = document.createElement('div');
				warning.className = 'webwindow-notice';
				warning.style.background = '#fffbe5';
				warning.style.borderLeft = '4px solid #ffb900';
				warning.style.margin = '8px 0';
				warning.style.padding = '8px 12px';
				warning.style.fontSize = '0.95em';
				warning.innerText = 'Could not display this page (site does not allow embedding, or it is unavailable).';
				outer.appendChild(warning);
				setTimeout(function () { try { outer.removeChild(warning); } catch(e){} }, 3500);
			};
			wrapper.appendChild(iframe);
			if (scaleToFit) {
				window.addEventListener('resize', function scaledResizeHandler() {
					if (document.body.contains(iframe)) {
						updateScaleAndCenter(iframe, wrapper);
					} else {
						window.removeEventListener('resize', scaledResizeHandler);
					}
				});
			}
		}
		loadIframe(src);
	});
})();
/* eslint-enable no-console */
