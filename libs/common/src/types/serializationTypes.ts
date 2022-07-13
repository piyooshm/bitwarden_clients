type DeserializablePrimitives = number | string | boolean;
type SerializablePrimitives = DeserializablePrimitives | Date;

/**
 * Represents an object that can be serialized using JSON.stringify() without data loss
 * Usually the type returned by a toJSON() method
 */
export type SerializableObject<T extends object> = {
  [K in keyof T]?: T[K] extends SerializablePrimitives | SerializablePrimitives[]
    ? T[K]
    : T[K] extends Array<any>
    ? any[]
    : any;
};

/**
 * Represents an object returned by JSON.parse() before it's properly rehydrated by a ctor or static method
 * Usually the type given to fromJSON()
 */
export type ParsedObject<T extends object> = {
  [K in keyof T]?: T[K] extends DeserializablePrimitives | DeserializablePrimitives[]
    ? T[K]
    : T[K] extends Date
    ? string
    : T[K] extends Array<any>
    ? any[]
    : any;
};
