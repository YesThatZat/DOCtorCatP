import type { DialogSelectFileRequest, DialogSelectFileResponse, DialogSelectFolderRequest, DialogSelectFolderResponse } from '../electron/services/dialogFileSelector/dialogFileSelector.types'
import type { SegmentTextFileRequest, SegmentTextFileResponse } from '../electron/services/segmentTextFile/segmentTextFile.types'

export { }

declare global {
  interface Window {
    electronAPI: {
      dialogSelectFile: (req: DialogSelectFileRequest) => Promise<DialogSelectFileResponse | null>
      dialogSelectFolder: (req: DialogSelectFolderRequest) => Promise<DialogSelectFolderResponse | null>
      readFileBytes: (filePath: string) => Promise<Uint8Array>
      segmentTextFile: (req: SegmentTextFileRequest) => Promise<SegmentTextFileResponse>
    }
  }
}
