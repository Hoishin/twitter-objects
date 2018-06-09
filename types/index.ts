/**
 * An object that respresents a tweet
 */
export interface TweetObject {

	/**
	 * UTC time when this Tweet was created. Example: "created_at":"Wed Aug 27 13:08:45 +0000 2008"
	 */
	created_at?: string;

	/**
	 * The integer representation of the unique identifier for this Tweet. This number is greater than 53 bits and some programming languages may have difficulty/silent defects in interpreting it. Using a signed 64 bit integer for storing this identifier is safe. Use id_str for fetching the identifier to stay on the safe side. See Twitter IDs, JSON and Snowflake . Example: "id":114749583439036416
	 */
	id?: number;

	/**
	 * The string representation of the unique identifier for this Tweet. Implementations should use this rather than the large integer in id. Example: "id_str":"114749583439036416"
	 */
	id_str?: string;

	/**
	 * The actual UTF-8 text of the status update. See twitter-text for details on what characters are currently considered valid. Example: "text":"Tweet Button, Follow Button, and Web Intents"
	 */
	text?: string;

	/**
	 * Utility used to post the Tweet, as an HTML-formatted string. Tweets from the Twitter website have a source value of web. Example: "source":"Twitter for Mac"
	 */
	source?: string;

	/**
	 * Indicates whether the value of the text parameter was truncated, for example, as a result of a retweet exceeding the original Tweet text length limit of 140 characters. Truncated text will end in ellipsis, like this ... Since Twitter now rejects long Tweets vs truncating them, the large majority of Tweets will have this set to false . Note that while native retweets may have their toplevel text property shortened, the original text will be available under the retweeted_status object and the truncated parameter will be set to the value of the original status (in most cases, false ). Example: "truncated":true
	 */
	truncated?: boolean;

	/**
	 * Nullable. If the represented Tweet is a reply, this field will contain the integer representation of the original Tweet’s ID. Example: "in_reply_to_status_id":114749583439036416
	 */
	in_reply_to_status_id?: number;

	/**
	 * Nullable. If the represented Tweet is a reply, this field will contain the string representation of the original Tweet’s ID. Example: "in_reply_to_status_id_str":"114749583439036416"
	 */
	in_reply_to_status_id_str?: string;

	/**
	 * Nullable. If the represented Tweet is a reply, this field will contain the integer representation of the original Tweet’s author ID. This will not necessarily always be the user directly mentioned in the Tweet. Example: "in_reply_to_user_id":819797
	 */
	in_reply_to_user_id?: number;

	/**
	 * Nullable. If the represented Tweet is a reply, this field will contain the string representation of the original Tweet’s author ID. This will not necessarily always be the user directly mentioned in the Tweet. Example: "in_reply_to_user_id_str":"819797"
	 */
	in_reply_to_user_id_str?: string;

	/**
	 * Nullable. If the represented Tweet is a reply, this field will contain the screen name of the original Tweet’s author. Example: "in_reply_to_screen_name":"twitterapi"
	 */
	in_reply_to_screen_name?: string;

	/**
	 * The user who posted this Tweet. See User data dictionary for complete list of attributes. Example highlighting select attributes: { "user": { "id": 2244994945, "id_str": "2244994945", "name": "TwitterDev", "screen_name": "TwitterDev", "location": "Internet", "url": "https://dev.twitter.com/", "description": "Your source for Twitter news", "verified": true, "followers_count": 477684, "friends_count": 1524, "listed_count": 1184, "favourites_count": 2151, "statuses_count": 3121, "created_at": "Sat Dec 14 04:35:55 +0000 2013", "utc_offset": null, "time_zone": null, "geo_enabled": true, "lang": "en", "profile_image_url_https": "https://pbs.twimg.com/" } }
	 */
	user?: UserObject;

	/**
	 * Nullable. Represents the geographic location of this Tweet as reported by the user or client application. The inner coordinates array is formatted as geoJSON (longitude first, then latitude). Example: "coordinates": { "coordinates": [ -75.14310264, 40.05701649 ], "type":"Point" }
	 */
	coordinates?: CoordinatesObject;

	/**
	 * Nullable When present, indicates that the tweet is associated (but not necessarily originating from) a Place . Example: "place": { "attributes":{}, "bounding_box": { "coordinates": [[ [-77.119759,38.791645], [-76.909393,38.791645], [-76.909393,38.995548], [-77.119759,38.995548] ]], "type":"Polygon" }, "country":"United States", "country_code":"US", "full_name":"Washington, DC", "id":"01fbe706f872cb32", "name":"Washington", "place_type":"city", "url":"http://api.twitter.com/1/geo/id/0172cb32.json" }
	 */
	place?: PlaceObject;

	/**
	 * This field only surfaces when the Tweet is a quote Tweet. This field contains the integer value Tweet ID of the quoted Tweet. Example: "quoted_status_id":114749583439036416
	 */
	quoted_status_id?: number;

	/**
	 * This field only surfaces when the Tweet is a quote Tweet. This is the string representation Tweet ID of the quoted Tweet. Example: "quoted_status_id_str":"114749583439036416"
	 */
	quoted_status_id_str?: string;

	/**
	 * Indicates whether this is a Quoted Tweet. Example: "is_quote_status":false
	 */
	is_quote_status?: boolean;

	/**
	 * This field only surfaces when the Tweet is a quote Tweet. This attribute contains the Tweet object of the original Tweet that was quoted.
	 */
	quoted_status?: TweetObject;

	/**
	 * Users can amplify the broadcast of Tweets authored by other users by retweeting . Retweets can be distinguished from typical Tweets by the existence of a retweeted_status attribute. This attribute contains a representation of the original Tweet that was retweeted. Note that retweets of retweets do not show representations of the intermediary retweet, but only the original Tweet. (Users can also unretweet a retweet they created by deleting their retweet.)
	 */
	retweeted_status?: TweetObject;

	/**
	 * Nullable. Indicates approximately how many times this Tweet has been quoted by Twitter users. Example: "quote_count":1138 Note: This object is only available with the Premium and Enterprise tier products.
	 */
	quote_count?: number;

	/**
	 * Number of times this Tweet has been replied to. Example: "reply_count":1585 Note: This object is only available with the Premium and Enterprise tier products.
	 */
	reply_count?: number;

	/**
	 * Number of times this Tweet has been retweeted. Example: "retweet_count":1585
	 */
	retweet_count?: number;

	/**
	 * Nullable. Indicates approximately how many times this Tweet has been liked by Twitter users. Example: "favorite_count":1138
	 */
	favorite_count?: number;

	/**
	 * Entities which have been parsed out of the text of the Tweet. Additionally see Entities in Twitter Objects . Example: "entities": { "hashtags":[], "urls":[], "user_mentions":[], "media":[], "symbols":[] "polls":[] }
	 */
	entities?: EntitiesObject;

	/**
	 * When between one and four native photos or one video or one animated GIF are in Tweet, contains an array 'media' metadata. Additionally see Entities in Twitter Objects . Example: "entities": { "media":[] }
	 */
	extended_entities?: ExtendedEntitiesObject;

	/**
	 * Nullable. Indicates whether this Tweet has been liked by the authenticating user. Example: "favorited":true
	 */
	favorited?: boolean;

	/**
	 * Indicates whether this Tweet has been Retweeted by the authenticating user. Example: "retweeted":false
	 */
	retweeted?: boolean;

	/**
	 * Nullable. This field only surfaces when a Tweet contains a link. The meaning of the field doesn’t pertain to the Tweet content itself, but instead it is an indicator that the URL contained in the Tweet may contain content or media identified as sensitive content. Example: "possibly_sensitive":true
	 */
	possibly_sensitive?: boolean;

	/**
	 * Indicates the maximum value of the filter_level parameter which may be used and still stream this Tweet. So a value of medium will be streamed on none, low, and medium streams. Example: "filter_level": "medium"
	 */
	filter_level?: string;

	/**
	 * Nullable. When present, indicates a BCP 47 language identifier corresponding to the machine-detected language of the Tweet text, or und if no language could be detected. See more documentation HERE. Example: "lang": "en"
	 */
	lang?: string;

	/**
	 * Present in filtered products such as Twitter Search and PowerTrack. Provides the id and tag associated with the rule that matched the Tweet. With PowerTrack, more than one rule can match a Tweet. See more documentation HERE. Example: "matching_rules": " [{ "tag": "rain Tweets", "id": 831566737246023680, "id_str": "831566737246023680" }, { "tag": "snow Tweet", "id": 831567402366218240, "id_str": "831567402366218240" }]"
	 */
	matching_rules?: RuleObject[];

	/**
	 * Deprecated. Nullable. Use the coordinates field instead. This deprecated attribute has its coordinates formatted as [lat, long], while all other Tweet geo is formatted as [long, lat].
	 */
	geo?: CoordinatesObject;

}
