import * as Case from 'case';

const enum PrimitiveType {
	String = 'string',
	Number = 'number',
	Boolean = 'boolean',
}

const enum TwitterObjectType {
	TweetObject = 'TweetObject',
	UserObject = 'UserObject',
	EntitiesObject = 'EntitiesObject',
	ExtendedEntitiesObject = 'ExtendedEntitiesObject',
	PlaceObject = 'PlaceObject',
	CoordinatesObject = 'CoordinatesObject',
	BoundingBoxObject = 'BoundingBoxObject',
	RuleObject = 'RuleObject',
	RuleObjectArray = 'RuleObject[]',
}

type AttributeType = PrimitiveType | TwitterObjectType;

interface Attribute {
	key: string;
	optional: boolean;
	type: AttributeType;
	description: string;
}

export default class TwitterObject {
	private _attr: Attribute[] = [];

	constructor(private name: TwitterObjectType, private description: string) {}

	/**
	 * Convert raw type strings from API documents to TypeScript-defined types
	 * @param rawType {string}
	 */
	private formatType(rawType: string): AttributeType {
		switch (Case.lower(rawType)) {
			// Primitive types
			case 'string':
				return PrimitiveType.String;
			case 'int64':
			case 'integer':
			case 'int':
				return PrimitiveType.Number;
			case 'boolean':
				return PrimitiveType.Boolean;

			// Twitter-original object types
			case 'tweet':
				return TwitterObjectType.TweetObject;
			case 'user object':
				return TwitterObjectType.UserObject;
			case 'entities':
				return TwitterObjectType.EntitiesObject;
			case 'extended entities':
				return TwitterObjectType.ExtendedEntitiesObject;
			case 'coordinates':
				return TwitterObjectType.CoordinatesObject;
			case 'places':
				return TwitterObjectType.PlaceObject;
			case 'array of rule objects':
				return TwitterObjectType.RuleObjectArray;

			// Runtime error for non-recognized type string
			default:
				throw new Error(`Unrecognized type: ${rawType}`);
		}
	}

	addAttributes(...attributes: [string, string, string][]) {
		for (const attribute of attributes) {
			this._attr.push({
				key: attribute[0],
				optional: true, // TODO: Analise description to determine if it is really optional
				type: this.formatType(attribute[1]),
				description: attribute[2],
			});
		}
	}

	toDefinition() {
		const attributeString = this._attr.reduce(
			(prev, {key, optional, type, description}) => {
				const optionalMark = optional ? '?' : '';

				return `${prev}\
	/**
	 * ${description}
	 */
	${key}${optionalMark}: ${type};
`;
			},
			''
		);

		return `\
/**
 * ${this.description}
 */
export interface ${Case.pascal(this.name)}Object {
${attributeString}
}
`;
	}
}
