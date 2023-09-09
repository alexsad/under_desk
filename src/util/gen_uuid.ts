const genUuid = () => {
    return `uuid_${globalThis.crypto.randomUUID().replaceAll("-", "_")}`;
}

export { genUuid };
