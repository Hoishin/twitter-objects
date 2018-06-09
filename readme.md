# twitter-tweet-object

> TypeScript type definition for Twitter's [tweet object](https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/tweet-object.html)

## Usage

```ts
import TweetObject from 'twitter-tweet-object'

export class Tweet {
	constructor(public tweet: TweetObject) {}

	get name() {
		return tweet.user.name
	}
}
```
