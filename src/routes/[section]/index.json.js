import { get_sections } from '@app/get_sections.js';

export async function get(req, res) {
	const section = get_sections().find(({ slug }) => slug === req.params.section);

	if (section) {
		const { title, slug, html, next } = section;

		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ title, slug, html, next }));
	} else {
		res.statusCode = 404;
		res.end(JSON.stringify({ message: 'not found' }));
	}
}
