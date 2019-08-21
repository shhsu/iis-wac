export function formatF(s: string, ...args: string[]) {
    // yup, a very slow implementation
    for (let i = 0; i < args.length; i++) {
        s = s.replace(`{${i}}`, args[i]);
    }
    return s;
}

export function stringifySafe(jsObject) {
    const seen = new Set<any>();
    const serializedData = JSON.stringify(jsObject, function(_, value) {
        if (typeof value === 'object') {
            if (seen.has(value)) {
                return '(circular reference)';
            }
            seen.add(value);
        }
        return value;
    });
    // return modified, sanitized result
    return serializedData;
}

const knownFields = [ 'name', 'message', 'details' ];
export function* enumerateKnownProperties(e: any) {
    for (const p of knownFields) {
        if (this.error[p]) {
           yield `${p}: ${e[p]}`;
        }
    }
}
