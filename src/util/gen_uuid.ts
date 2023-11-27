const appendToString = (text: string, appendText: string, positionIndex: number) => {
    return [text.slice(0, positionIndex), appendText, text.slice(positionIndex)].join('');
}

const genUUID = () => {
    if (globalThis?.crypto && 'randomUUID' in globalThis.crypto) {
        return `uuid_${globalThis.crypto.randomUUID().replaceAll("-", "_")}`;
    }
    const stringRandom = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
    return appendToString(stringRandom, '_', 5);
}


const genHashFrom = (data: string) => {
    let hash = 0, chr;

    if (data.length === 0) {
        return `${hash}`;
    }

    for (let i = 0; i < data.length; i++) {
        chr = data.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }

    return `${hash}`;
}

export { genHashFrom, genUUID };

