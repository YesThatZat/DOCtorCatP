import path from "node:path"
import { promises as fs } from "node:fs"

export async function SaveSegments(words:string[], wordsPerSegment:number, exportFilePath: string, exportFileName:string) {
  if (!Number.isFinite(wordsPerSegment) || wordsPerSegment <= 0) {
    throw new Error("wordsPerSegment must be a positive number")
  }
  if (typeof exportFilePath !== "string" || exportFilePath.trim().length === 0) {
    throw new Error("exportPath must be a non-empty string")
  }

  if (words.length === 0) return {success: true}

  const totalSegments = Math.ceil(words.length / wordsPerSegment)
  const baseName = sanitizeBaseName(exportFileName)

  // Ensure output dir exists
  await fs.mkdir(exportFilePath, { recursive: true })

  const digits = Math.max(4, String(totalSegments).length) // 0001.. style

  for (let i = 0; i < totalSegments; i++) {
    const start = i * wordsPerSegment
    const end = Math.min(start + wordsPerSegment, words.length)
    const segmentText = words.slice(start, end).join(" ")

    const index = pad(i + 1, digits)
    const outFile = path.join(exportFilePath, `${baseName}_${index}.txt`)

    // write -> rename to reduce chance of partial files if something dies mid-write
    const tmpFile = outFile + `.tmp-${process.pid}-${Date.now()}`
    await fs.writeFile(tmpFile, segmentText, { encoding: "utf8" })
    await fs.rename(tmpFile, outFile)
  }
}

function sanitizeBaseName(name: string): string {
  const trimmed = (name ?? "").trim()
  if (!trimmed) return "segment"
  
  // Drop any path components and remove characters that are problematic on Windows/macOS/Linux
  const base = path.basename(trimmed)
  const noExt = base.replace(/\.[^/.]+$/, "") // remove extension if present
  const safe = noExt.replace(/[<>:"/\\|?*\x00-\x1F]/g, "_").replace(/\s+/g, " ").trim()
  
  return safe || "segment"
}

function pad(num: number, width: number): string {
  const s = String(num);
  return s.length >= width ? s : "0".repeat(width - s.length) + s
}