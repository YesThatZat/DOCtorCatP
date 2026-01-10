import mammoth from "mammoth"

export type ParsedDocx = {
    text: string
}

export class DocxParser {
    static async ParseDocx(bytes: Uint8Array): Promise<ParsedDocx | null> {
        console.log("Chewing buffer")
        console.log("bytes type:", Object.prototype.toString.call(bytes));
        console.log("is Uint8Array:", bytes instanceof Uint8Array);
        console.log("is Buffer:", Buffer.isBuffer(bytes));
        console.log("is Array:", Array.isArray(bytes));
        console.log("has buffer:", (bytes as any)?.buffer?.constructor?.name);
        const buffer = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);

        console.log("Passing to mammoth")
        const result = await mammoth.extractRawText({ buffer })
        console.log("Returning result, valueSize:", result.value.length)
        return { text: result.value }
    }
}