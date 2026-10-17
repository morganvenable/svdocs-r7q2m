// One page per guide: the sidebar lists that page's sections as jump links.
// Highlight the sidebar link for the section in view, as the "On this page" list does.
(() => {
	const start = () => {
		const links = [...document.querySelectorAll('.sidebar-content a[href*="#"]')].filter(
			(a) => a.pathname === location.pathname && a.hash.length > 1
		);
		if (!links.length) return;
		const page = document.querySelector('.sidebar-content a[aria-current="page"]');
		const targets = links
			.map((a) => [a, document.getElementById(decodeURIComponent(a.hash.slice(1)))])
			.filter(([, h]) => h);
		let current = null;
		const update = () => {
			const line = window.innerHeight * 0.3;
			let hit = null;
			for (const [a, h] of targets) if (h.getBoundingClientRect().top <= line) hit = a;
			if (hit === current) return;
			if (current) current.removeAttribute('aria-current');
			if (hit) hit.setAttribute('aria-current', 'location');
			if (page) page.classList.toggle('spy-off', !!hit);
			current = hit;
		};
		let queued = false;
		addEventListener('scroll', () => {
			if (queued) return;
			queued = true;
			requestAnimationFrame(() => { queued = false; update(); });
		}, { passive: true });
		addEventListener('hashchange', update);
		update();
	};
	if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
	else start();
})();
