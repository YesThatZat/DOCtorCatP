export type SegmentTextFileRequest = {
    sourceFilePath: string
    exportFilesPath:string
    exportFileName:string
    wordsPerSegment: number
}

export type SegmentTextFileResponse = {
    success:boolean
}
