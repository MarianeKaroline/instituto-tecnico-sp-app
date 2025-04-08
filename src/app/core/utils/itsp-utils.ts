export abstract class ItspUtils {

    /**
     * Check if a text is `null`, `undefined` or empty (`''`)
     * @param str Text to check
     * @returns {boolean}
     */
    static isNullOrEmpty(str: string): boolean
    {
        return str === undefined || str === null || str === "";
    }

    /**
     * Check if a value is `null` or `undefined`
     * @param str Value to check
     * @returns {boolean}
     */
    static isNullOrUndefined(value: string|number|boolean|object): boolean
    {
        return value === undefined || value === null;
    }

    static removeAccents(value: string): string{
        return value.trim()?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }

    /**
     * Get only numbers from string expression
     * @param str Source text
     * @returns {string} A new `string` with only numbers retrieved from arg `str`
     */
    static getNumbers(str: string): string
    {
        if (!str || str === null || str == '')
            return str;

        const matchRes = str.match(/\d/g);

        if (matchRes == null)
            return '';

        return matchRes.join('');
    }

    /**
     * Remove mask from a string
     * @param value Masked string
     * @param maskChars Mask or chars to be removed
     * @returns String without mask
     */
    static removeMask(value: string, mask: { mask?: string, maskChars?: string[] }): string
    {
        const updatedValue = [value];
        const chars: string[] = [];

        if (mask?.mask) {
            // Get unique chars from mask
            const maskChars = [...new Set(mask?.mask.split('').filter(c => c != "0"))];
            chars.push(...maskChars);
        }

        if (mask?.maskChars) {
            // Get unique chars from mask chars array
            const maskChars = [...new Set(mask?.maskChars.filter(c => c != "0"))];
            chars.push(...maskChars);
        }

        // Remove duplicated chars
        const groupedChars = [...new Set(chars)];

        // Remove each mask char from original string
        for (const char of groupedChars) {

            const lastUpdatedValue = updatedValue?.pop();

            if (lastUpdatedValue)
                updatedValue.push(
                    lastUpdatedValue.split('').map(c => c == char ? '' : c).join('')
                );
        }

        return updatedValue.pop() ?? value;
    }

    /**
     * Check if properties of these objects are equals
     * @param object1 First object to compare
     * @param object2 Second object to compare
     * @returns Are properties equals
     */
    static propertiesAreEquals<T extends Object>(object1: T, object2: T): boolean
    {
        for (const key in object1) {

            if (object1[key] != object2[key])
                return false;
        }

        for (const key in object2) {

            if (object2[key] != object1[key])
                return false;
        }

        return true;
    }

    /**
     * Check if a url has as target the application `assets` directory
     * @param url Url to check
     * @returns {boolean}
     */
    static isAssetsUrl(url: string): boolean
    {
        return /\.?\/?assets\/.*/.test(url);
    }

    /**
     * Check if a value is a valid member of a enum struct
     * @param value Value to check
     * @returns {boolean}
     */
    static enumIsDefined<V extends (string | number)>(enumeration: { [key: string|number]: V }, value: V): boolean
    {
        return enumeration[value] != undefined;
    }

    /**
     * Check if the two arrays are equals (item (simple comparision) and its position in array (index))
     *
     * @param v1 Version 1 of array
     * @param v2 Version 2 of array
     * @returns {boolean}
     */
    static arrayChanged<T extends (string | number | boolean)>(v1: T[], v2: T[]): boolean {

        const primaryList = v1.length > v2.length ? v1 : v2;
        const secondaryList = v1.length > v2.length ? v2 : v1;

        for (const [index, primaryItem] of primaryList.entries() ?? []) {

            const isEqualsAndIsInTheSamePosition = secondaryList
                .some((secondaryItem, i) => secondaryItem == primaryItem && i == index);

            if (!isEqualsAndIsInTheSamePosition)
                return true;
        }

        return false;
    }

    /*
     * Get the file extension from the file name. If extension is not found, `null` is returned
     * @param file
     * @returns {string|null}
     */
    static getFileExtension(file: File): string;
    /**
     * Get the file extension from the file name. If extension is not found, `null` is returned
     * @param file
     * @param includesDot Flag to indicate if the file extension must be returned with the dot (`.`) (default is `true`)
     * @returns {string|null}
     */
    static getFileExtension(file: File, includesDot: boolean): string | null
    static getFileExtension(file: File, includesDot: boolean = true): string | null {

        if (!file || !file.name)
            return null;

        const fileExtensionIndex = file.name.lastIndexOf('.');

        if (fileExtensionIndex == -1)
            return null;

        const fileExtension = file.name.substring(fileExtensionIndex);

        if (includesDot)
            return fileExtension;

        return fileExtension.substring(1).toString();
    }

    /**
     * List all keys of `enum`
     * @param obj Enumeration
     * @returns {string[]} Keys of `enum`
     */
    static enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {

        return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
    }    
    
}