import axios from 'axios';
import * as cheerio from 'cheerio';
import TwitterObject, {TwitterObjectType} from './twitter-object';

const fetchHtml = (category: string) =>
	axios
		.get<string>(
			`https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/${category}-object.html`
		)
		.then(res => cheerio.load(res.data));

const constructTweetObject = async () => {
	const $ = await fetchHtml('tweet');
	const attributes = $('table > tbody > tr')
		.toArray()
		.map(tr =>
			$(tr)
				.children()
				.toArray()
				.map(th => $(th).text().trim())
		);

	const tweetObject = new TwitterObject(
		TwitterObjectType.TweetObject,
		'An object that represents a tweet'
	);
	tweetObject.addAttributes(...attributes).define();
};

const constructUserObject = async () => {
	const $ = await fetchHtml('user');
	const attributes = $('table > tbody > tr')
		.toArray()
		.map(tr =>
			$(tr)
				.children()
				.toArray()
				.map(th => $(th).text())
		);
	const userObject = new TwitterObject(
		TwitterObjectType.TweetObject,
		'An object that represents a user'
	);
	userObject.addAttributes(...attributes).define()
};

const main = async () => {
	await Promise.all([constructTweetObject(), constructUserObject()]);
	await TwitterObject.outputDefinitions();
};

main().catch(err => {
	console.error(err);
	process.exit(1);
});
