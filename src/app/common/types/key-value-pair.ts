/**
 * Object for `key => value` models
 * @implements IKeyValuePair<K, V>
 */
export class KeyValuePair<K = string, V = string> implements IKeyValuePair<K, V> {

    /**
     * @property {K} key Object key
     */
    public key: K;
    /**
     * @property {V} value Object value
     */
    public value: V;

    constructor(key: K, value: V) {

        this.key = key;
        this.value = value;
    }
}

/**
 * Model of `key => value` objects
 * @interface
 */
export interface IKeyValuePair<K = string, V = string> {

    /** Object key */
    key: K;
    /** Object value */
    value: V;
}

/**
 * Model for objects with Identifier, name (label) and a custom icon
 * ### !! Extends to `IKeyValuePair` interface
 * @interface IKeyValueAndIcon<K>
 * @extends IKeyValuePair
 */
export interface IKeyValueAndIcon<K, V = string> extends IKeyValuePair<K, V> {

    /** Icon */
    icon: string;

    /** Classes */
    classes?: string | string[];

}
