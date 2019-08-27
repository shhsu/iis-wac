const dateRegex = /^\/Date\((d|-|.*)\)[\/|\\]$/;

export function bitwiseGet(value: number, flag: number): boolean {
    // tslint:disable-next-line: no-bitwise
    return (value & flag) !== 0;
}

export function bitwiseSet(value: number, set: boolean, flag: number): number {
    if (set) {
        // tslint:disable-next-line: no-bitwise
        return (value | flag);
    } else {
        // tslint:disable-next-line: no-bitwise
        return (value & ~flag);
    }
}

export function* enumerateEnum(e: {}) {
    for (const value in e) {
        if (!isNaN(Number(value))) {
            yield Number(value);
        }
    }
}

export function fromCSDate(value: string): Date {
    if (!value) {
        return null;
    }
    const source = dateRegex.exec(value);
    return new Date(parseInt(source[1], 10));
}

export function fromCSObject<T>(type: (new () => T), csObject: any) {
    const result = new type();
    if (csObject) {
        for (const key of Object.keys(result)) {
            if (csObject[key]) {
                result[key] = csObject[key];
            } else {
                const pascalKey = key.charAt(0).toUpperCase() + key.slice(1);
                result[key] = csObject[pascalKey];
            }
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
        return right;
    }
    return left;
}
