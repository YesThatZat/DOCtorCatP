import './style.css'
import App from './App.svelte'
import { mount } from 'svelte'

const app = mount(App, {
  target: document.getElementById('app')!,
})

// Keep your contextBridge listener as-is
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})

export default app