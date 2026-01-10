import path from "node:path"
import fs from "node:fs/promises"
import { SegmentTextFileRequest, SegmentTextFileResponse } from "./segmentTextFile.types"
import { DocxParser } from "./docx/docxParser"
import { SaveSegments } from "./saveSegments"

export async function segmentTextFile(
    req: SegmentTextFileRequest
): Promise<SegmentTextFileResponse> {

    console.log("Beginning segmentation")

    try {
        const { sourceFilePath, exportFilesPath: exportFilesPath, exportFileName, wordsPerSegment } = req;

        if (!sourceFilePath)
            throw new Error("segmentTextFile: You must provide a source file path to read from")

        if (!exportFileName)
            throw new Error("segmentTextFile: You must provide a base name for the exported files")

        if (!Number.isFinite(wordsPerSegment) || wordsPerSegment <= 0)
            throw new Error("wordsPerSegment must be a positive number")

        if (typeof exportFilesPath !== "string" || exportFilesPath.trim().length === 0)
            throw new Error("exportPath must be a non-empty string")

        const ext = path.extname(sourceFilePath)

        let sourceText: string | null = null
        switch (ext) {
            case ".docx": sourceText = await parseDocxToText(sourceFilePath); break;
            default: throw new Error(`The filetype ${ext} is not supported`)
        }

        if (sourceText) {
            const words = splitWords(sourceText)
            SaveSegments(words, wordsPerSegment, exportFilesPath, exportFileName)
        }
        else {
            throw new Error("There was no text found in the source document")
        }
        return { success: true }
    } catch (error: unknown) {
        console.log("Failed to segment document")
        if (error instanceof Error) {
            console.log(error.message, error.stack);
        } else {
            console.log("Unknown error", error);
        }
        return { success: false };
    }
}

async function parseDocxToText(sourceDocxPath: string): Promise<string | null> {
    try {
        console.log("Trying to read file")
        const bytes = await fs.readFile(sourceDocxPath);
        console.log("Byteslength:", bytes.byteLength)
        console.log("Trying to parse file")
        const parsed = await DocxParser.ParseDocx(bytes)
        console.log("Returning parsed text")
        return parsed!.text
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message, error.stack);
        } else {
            console.error("Unknown error", error);
        }
        return null;
    }
}

function splitWords(text: string): string[] {
    return text
        .split(/\s+/g)
        .map((w) => w.trim())
        .filter(Boolean)
}
