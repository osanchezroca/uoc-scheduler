export function encodeSomething(object: any) {
    return Buffer.from(JSON.stringify(object), 'utf8').toString('base64')
}