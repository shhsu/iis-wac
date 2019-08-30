const dateRegex = /^\/Date\((d|-|.*)\)[\/|\\]$/;

export function hashString(s: string, prime: number) {
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
        hash += Math.pow(s.charCodeAt(i) * prime, s.length - i);
        // tslint:disable-next-line: no-bitwise
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

export function hashArray(arr: Int8Array, prime: number): number {
    let hash = 0;
    for (let i = 0; i < arr.length; i++) {
        hash += Math.pow(arr[i] * prime, arr.length - i);
        // tslint:disable-next-line: no-bitwise
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

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

const arrayDeletionFlag = '__DELETED__';
const arrayAdditionFlag = '__ADDED__';
const objectDeletionFlag = { __IIS_WAC_USE_ONLY__: '__DELETED__' };
const stub = {};
const stubKey = 'root';
type objKey = string | number;
function setPath(object: any, path: objKey[], value: any) {
    if (!value) {
        return object;
    }
    let parent = stub;
    let prop: objKey = stubKey;
    parent[prop] = object;
    for (let i = 0; i < path.length; i++) {
        const key = path[i];
        let cursor = parent[prop];
        if (!cursor) {
            // assume biggest number always arrive first
            if (typeof key === 'number') {
                cursor = new Array(key + 1);
            } else {
                cursor = {};
            }
            parent[prop] = cursor;
        }
        parent = cursor;
        prop = key;
    }
    parent[prop] = value;
    return stub[stubKey];
}

interface ToString {
    toString(): string;
}

function deltaHelper(root: any, path: objKey[], original: any, changed: any) {
    if (!original) {
        if (changed) {
            return setPath(root, path, changed);
        } else {
            return root;
        }
    }
    if (!changed) {
        return setPath(root, path, objectDeletionFlag);
    }
    if (Array.isArray(original)) {
        const map = new Map<string, ToString>();
        for (const v of original) {
            map.set(v.toString(), v);
        }
        const added = [];
        for (const v of changed) {
            if (!map.delete(v.toString())) {
                added.push(v);
            }
        }
        if (added.length) {
            path.push(arrayAdditionFlag);
            root = setPath(root, path, added);
            path.pop();
        }
        if (map.size) {
            path.push(arrayDeletionFlag);
            root = setPath(root, path, Array.from(map.values()));
            path.pop();
        }
    } else if (typeof original === 'object') {
        const originalKeys = new Set<string>();
        for (const k of Object.keys(original)) {
            originalKeys.add(k);
            path.push(k);
            root = deltaHelper(root, path, original[k], changed[k]);
            path.pop();
        }
        for (const k of Object.keys(changed)) {
            if (!originalKeys.has(k)) {
                path.push(k);
                root = setPath(root, path, changed[k]);
                path.pop();
            }
        }
    } else {
        if (original !== changed) {
            root = setPath(root, path, changed);
        }
    }
    return root;
}

export function findDelta(original: any, changed: any) {
    return deltaHelper(null, [], original, changed);
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
    // overridable unchanged function
    if (typeof left.isSameAs === 'function') {
        return left.isSameAs(right);
    } else {
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
                if (v1 !== v2) {
                    return false;
                }
            }
        }
    }
    return true;
}

// naive implementation of deep copy.
// 1. only enumerable properties are considered
export function deepCopyNaive(left: any): any {
    if (!left) {
        return left;
    }
    if (Array.isArray(left)) {
        return left.map(deepCopyNaive);
    }
    if ((typeof left) === 'object') {
        const right: any = new left.constructor();
        for (const k of Object.keys(left)) {
            right[k] = deepCopyNaive(left[k]);
        }
        return right;
    }
    return left;
}
