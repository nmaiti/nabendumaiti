

let sr = null;
if (typeof window !== 'undefined') {
	// Only import and initialize ScrollReveal on the client
	// eslint-disable-next-line global-require
	const ScrollReveal = require('scrollreveal').default;
	sr = ScrollReveal();
}

export default sr;
