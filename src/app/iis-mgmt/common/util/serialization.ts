
export function fromCSObject<T>(type: (new () => T), csObject: any) {
    const result = new type();
    for (const key of Object.keys(result)) {
        const pascalKey = key.charAt(0).toUpperCase() + key.slice(1);
        if (csObject[pascalKey]) {
            result[key] = csObject[pascalKey];
        } else if (csObject[key]) {
            result[key] = csObject[key];
        }
    }
    return result;
}

// naive implementation of deep equal.
// 1. only enumerable properties are considered
// 2. empty array equals empty object
export function deepEqualNaive(left: any, right: any) {
    if (!left) {
        return !right;
    }
    if (!right) {
        return !left;
    }
    const keys1 = Object.keys(left);
    const keys2 = Object.keys(right);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const k of keys1) {
        const v1 = left[k];
        const v2 = right[k];
        if ((typeof v1) === 'object') {
            if (!deepEqualNaive(v1, v2)) {
                return false;
            }
        } else {
            return v1 === v2;
        }
    }
}

// naive implementation of deep copy.
// 1. only enumerable properties are considered
export function deepCopyNaive(left: any): any {
    if (!left) {
        return null;
    }
    if (Array.isArray(left)) {
        return left.map(deepCopyNaive);
    }
    if ((typeof left) === 'object') {
        const right: any = {};
        for (const k of Object.keys(left)) {
            right[k] = deepCopyNaive(left[k]);
        }
    }
    return left;
}
