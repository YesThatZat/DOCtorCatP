import { ipcMain, BrowserWindow } from "electron";
import { promises as fs } from "node:fs";
import { SegmentTextFileRequest, SegmentTextFileResponse } from "../services/segmentTextFile/segmentTextFile.types";
import type { DialogSelectFileRequest, DialogSelectFileResponse, DialogSelectFolderRequest, DialogSelectFolderResponse } from "../services/dialogFileSelector/dialogFileSelector.types";
import { DialogFileSelector } from "../services/dialogFileSelector/dialogFileSelector";
import { segmentTextFile } from "../services/segmentTextFile/segmentTextFile";

type GetWin = () => BrowserWindow | null;

export function registerFileHandlers(getWin: GetWin) {
  ipcMain.handle("dialog:selectFile", async (_event, req: DialogSelectFileRequest = {}): Promise<DialogSelectFileResponse | null> => {
    const win = getWin();
    if (!win) return null;

    return await DialogFileSelector.SelectFile(win, req)
  });

  ipcMain.handle("dialog:selectFolder", async (_event, req: DialogSelectFolderRequest): Promise<DialogSelectFolderResponse | null> => {
    const win = getWin()
    if (!win) return null

    return await DialogFileSelector.SelectFolder(win, req)
  });

  ipcMain.handle("file:readBytes", async (_event, filePath: string) => {
    if (typeof filePath !== "string" || filePath.length === 0) {
      throw new Error("Invalid file path")
    }
    return await fs.readFile(filePath)
  });

  ipcMain.handle("file:segmentTextFile", async (_evt, req: SegmentTextFileRequest): Promise<SegmentTextFileResponse> => {
    return await segmentTextFile(req)
  })
}
