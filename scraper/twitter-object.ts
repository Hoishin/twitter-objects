import {promisify} from 'util';
import {writeFile} from 'fs';
import * as Case from 'case';

export const enum PrimitiveType {
	String = 'string',
	Number = 'number',
	Boolean = 'boolean',
	Object = 'object',
	Null = 'null',
	StringArray = 'string[]',
	ObjectArray = 'object[]',
}

export const enum TwitterObjectType {
	// Scraped
	TweetObject = 'TweetObject',
	UserObject = 'UserObject',
	EntitiesObject = 'EntitiesObject',
	ExtendedEntitiesObject = 'ExtendedEntitiesObject',
	PlaceObject = 'PlaceObject',
	CoordinatesObject = 'CoordinatesObject',
	BoundingBoxObject = 'BoundingBoxObject',
}

export type AttributeType = PrimitiveType | TwitterObjectType;

interface Attribute {
	key: string;
	optional: boolean;
	type: AttributeType;
	description: string;
}

export default class TwitterObject {
	private static definitions: string = '';

	static outputDefinitions() {
		return promisify(writeFile)(
			`./types/index.ts`,
			TwitterObject.definitions
		);
	}

	private _attributes: Attribute[] = [];

	constructor(private name: TwitterObjectType, private description: string) {}

	addAttributes(...attributes: string[][]) {
		for (const attribute of attributes) {
			if (attribute.length !== 3) {
				throw new Error(
					`Invalid attribute object: ${JSON.stringify(attribute)}`
				);
			}
			const typeName = this.formatType(attribute);
			if (typeName) {
				this._attributes.push({
					key: attribute[0].replace(/[\n\ ]+/g, '').trim(),
					optional: true, // TODO: Analise description to determine if it is really optional
					type: typeName,
					description: attribute[2].replace(/[\n\ ]+/g, ' ').trim(),
				});
			}
		}
		return this;
	}

	define() {
		TwitterObject.definitions += this.toDefinition();
		return this;
	}

	/**
	 * Convert raw type strings from API documents to TypeScript-defined types
	 * @param rawType {string}
	 */
	private formatType([key, rawType]: string[]): AttributeType | void {
		switch (Case.lower(rawType).trim()) {
			// Primitive types
			case 'string':
				return PrimitiveType.String;
			case 'int64':
			case 'integer':
			case 'int':
				return PrimitiveType.Number;
			case 'boolean':
				return PrimitiveType.Boolean;
			case 'object':
				return PrimitiveType.Object;
			case 'null':
				return PrimitiveType.Null;
			case 'array of string':
				return PrimitiveType.StringArray;
			case 'array of rule objects':
				return PrimitiveType.ObjectArray;

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

			default:
				console.error(`Unrecognized type: ${rawType} (name: ${key})`);
		}
	}

	private toDefinition() {
		const attributeString = this._attributes.reduce(
			(prev, {key, optional, type, description}) => {
				const optionalMark = optional ? '?' : '';

				return `${prev}
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
export interface ${this.name} {
${attributeString}
}
`;
	}
}
