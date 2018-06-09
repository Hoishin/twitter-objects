import axios from 'axios';
import * as cheerio from 'cheerio';

const fetchHtml = (category: string) =>
	axios
		.get<string>(
			`https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/${category}-object.html`
		)
		.then(res => cheerio.load(res.data));

const tweetObject = async () => {
	const $ = await fetchHtml('tweet');
	const hoge = $('table.docutils > tbody')
		.toArray()
		.map(table =>
			$(table)
				.children('tr')
				.slice(1)
				.toArray()
				.map(tr =>
					$(tr)
						.children()
						.toArray()
						.map(th => $(th).text())
				)
		);
	console.log(hoge);
	console.log(hoge[0].map(attr => attr[1]));
};

const main = () => {
	return Promise.all([tweetObject()]);
};

main().catch(err => {
	console.error(err);
	process.exit(1);
});
