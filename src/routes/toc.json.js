import { get_sections } from '@app/get_sections.js';

export async function get(req, res) {
	const toc = get_sections().map(({ html, ...section }) => section);

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(toc));
}
