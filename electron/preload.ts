import { ipcRenderer, contextBridge } from 'electron'
import type { SegmentTextFileRequest } from './services/segmentTextFile/segmentTextFile.types'
import { DialogSelectFileRequest } from './services/dialogFileSelector/dialogFileSelector.types'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

  // You can expose other APTs you need here.
  // ...
})

// Expose File IO as is own api
contextBridge.exposeInMainWorld('electronAPI', {
  dialogSelectFile: (options?: DialogSelectFileRequest) =>
    ipcRenderer.invoke('dialog:selectFile', options),

  dialogSelectFolder: (options?: { title?: string; defaultPath?: string }) =>
    ipcRenderer.invoke('dialog:selectFolder', options),

  readFileBytes: (filePath: string) =>
    ipcRenderer.invoke('file:readBytes', filePath),

  segmentTextFile: (options: SegmentTextFileRequest) =>
    ipcRenderer.invoke('file:segmentTextFile', options)

})
