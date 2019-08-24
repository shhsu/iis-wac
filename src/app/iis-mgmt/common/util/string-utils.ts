export function formatF(s: string, ...args: string[]) {
    // yup, a very slow implementation
    for (let i = 0; i < args.length; i++) {
        s = s.replace(`{${i}}`, args[i]);
    }
    return s;
}

class StringifyHelper {
    private seen = new Set<any>();
    replacer = (_, value) => {
        if (value instanceof Error) {
            if (this.seen.has(value)) {
                return '(circular reference)';
            }
            this.seen.add(value);
            const obj = {};
            for (const prop of Object.getOwnPropertyNames(value)) {
                obj[prop] = value[prop];
            }
            return stringifySafe(obj, this);
        } else if (typeof value === 'object') {
            if (this.seen.has(value)) {
                return '(circular reference)';
            }
            this.seen.add(value);
        }
        return value;
    }
}

export function stringifySafe(jsObject, stringifyHelper = new StringifyHelper()) {
    const serializedData = JSON.stringify(jsObject, stringifyHelper.replacer);
    return serializedData;
}

const knownFields = ['name', 'message', 'details'];
export function* enumerateKnownErrorProperties(e: any) {
    for (const p of knownFields) {
        if (e[p]) {
            yield `${p}: ${e[p]}`;
        }
    }
}
