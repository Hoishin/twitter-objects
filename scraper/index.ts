import axios from 'axios';
import * as cheerio from 'cheerio';
import TwitterObject, { TwitterObjectType } from './twitter-object';

const fetchHtml = (category: string) =>
	axios
		.get<string>(
			`https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/${category}-object.html`
		)
		.then(res => cheerio.load(res.data));

const constructTweetObject = async () => {
	const $ = await fetchHtml('tweet');
	const [attributes, deprecatedAttributes] = $('table.docutils > tbody')
		.toArray()
		.map(table =>
			$(table)
				.children('tr')
				.toArray()
				.slice(1)
				.map(tr =>
					$(tr)
						.children()
						.toArray()
						.map(th => $(th).text())
				)
		);

	const tweetObject = new TwitterObject(TwitterObjectType.TweetObject, 'An object that respresents a tweet')
	tweetObject.addAttributes(...attributes, ...deprecatedAttributes)
	console.log(tweetObject.toDefinition())
};

const main = () => {
	return Promise.all([constructTweetObject()])
};

main().catch(err => {
	console.error(err);
	process.exit(1);
});
