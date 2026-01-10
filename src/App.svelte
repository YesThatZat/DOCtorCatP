<script lang="ts">
  import ExportFolderSetter from "./components/export_folder_setter/ExportFolderSetter.svelte"
  import FileLoader from "./components/file_selector/FileSelector.svelte"
  import SegmentExporter from "./components/segment_exporter/SegmentExporter.svelte"
  import splashImg from './assets/splash.png'

  let loadPath = $state("")
  let exportPath = $state("")
</script>

<main>
  <h1>DOCtor Cat P</h1>
  <h2>Convert large .docx files to many smaller .txt files!</h2>
  <img src={splashImg} alt="A cat chewing a docx file" />
  <FileLoader onFilePathChosen={(path) => {loadPath = path}}/>
  {#if loadPath}
    <span class="state-span">Reading from: {loadPath}</span>
    {#if !exportPath}
      <ExportFolderSetter onExportFolderSelected={(path) => {exportPath = path}}/>
    {:else}
      <span class="state-span">Exporting files to: {exportPath}</span>
      <SegmentExporter pathToSourceFile={loadPath} exportPath={exportPath}/>
    {/if}
  {/if}
</main>

<style>
  main {
    font-family: system-ui, sans-serif;
    display: flex;
    flex-grow: 1;
    gap: 1em;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  img {
    width: 20vw;
    margin-bottom: 1em;
  }

  .state-span {
    padding: 0.5em;
    background-color: lightblue;
    color: black;
  }
</style>
