export type DialogSelectFileRequest = {
  title?: string
  filters?: Array<{
    name: string
    extensions: string[]
  }>
  properties?: Array<'openFile' | 'multiSelections'>
}

export type DialogSelectFileResponse = {
  path: string
}

export type DialogSelectFolderRequest = { 
  title?: string
  defaultPath?: string
}

export type DialogSelectFolderResponse = {
  path: string
}
