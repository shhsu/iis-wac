
export function fromCSObject<T>(type: (new () => T), csObject: any) {
    const result = new type();
    for (const key of Object.keys(result)) {
        const pascalKey = key.charAt(0).toUpperCase() + key.slice(1);
        if (csObject[pascalKey]) {
            result[key] = csObject[pascalKey];
        }
    }
    return result;
}
