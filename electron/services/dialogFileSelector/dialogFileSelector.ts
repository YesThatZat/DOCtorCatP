import { dialog } from "electron";
import { BrowserWindow } from "electron";
import type { DialogSelectFileRequest, DialogSelectFileResponse, DialogSelectFolderRequest, DialogSelectFolderResponse } from "./dialogFileSelector.types";

export class DialogFileSelector {
  static async SelectFile(win: BrowserWindow, req: DialogSelectFileRequest): Promise<DialogSelectFileResponse | null> {
    const { title, properties, filters } = req

    const result = await dialog.showOpenDialog(win, {
      title: title ?? "Open file",
      properties: properties ?? ["openFile"],
      filters: filters ?? [{ name: "All files", extensions: ["*"] }],
    });

    if (result.canceled || result.filePaths.length === 0) return null;
    return { path: result.filePaths[0] };
  }

  static async SelectFolder(win: BrowserWindow, req: DialogSelectFolderRequest): Promise<DialogSelectFolderResponse | null> {
    const { title, defaultPath } = req
    const result = await dialog.showOpenDialog(win, {
      title: title ?? "Select export folder",
      defaultPath: defaultPath,
      properties: ["openDirectory", "createDirectory"],
    })

    if (result.canceled || result.filePaths.length === 0) return null
    return { path: result.filePaths[0] }
  }
}