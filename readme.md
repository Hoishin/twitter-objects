# twitter-objects

> TypeScript type definition for [Twitter API JSON](https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/tweet-object.html)

## Example

```ts
import {TweetObject} from 'twitter-tweet-object'

export class Tweet {
	constructor(public tweet: TweetObject) {}

	get name() {
		return tweet.user.name
	}
}
```

## API

(WIP)
