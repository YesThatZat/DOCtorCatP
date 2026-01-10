<script lang="ts">
    import type { SegmentTextFileRequest } from "../../../electron/services/segmentTextFile/segmentTextFile.types"

    interface props {
        pathToSourceFile: string
        exportPath: string
    }
    let { pathToSourceFile, exportPath }: props = $props()

    const originalFileName = (): string => {
        const parts = pathToSourceFile.replace(/\\/g, "/").split("/")
        const file = parts.at(-1) ?? ""
        return file.replace(/\.[^/.]+$/, "")
    }

    $effect(() => {
        if (pathToSourceFile) exportName = originalFileName()
    })

    let wordsPerSegment = $state(250)
    let exportName = $state(originalFileName())
    let busy = $state(false)
    let resultMessage = $state("")

    const segment = async () => {
        console.log("Requesting segmentation of file")
        const req: SegmentTextFileRequest = {
            sourceFilePath: pathToSourceFile,
            exportFilesPath: exportPath,
            exportFileName: exportName,
            wordsPerSegment: wordsPerSegment
        }
        resultMessage = "Chewing on it, please wait. Try opening the export folder to see progress!"
        busy = true
        const result = await window.electronAPI.segmentTextFile(req)
        if(result.success){
            busy = false
            resultMessage = "All done."
        }
        else {
            busy = false
            resultMessage = "Hmm, something went wrong sorry about that!"
        }
    }
</script>

<div class="container">
    <div>
        <span>Words per file</span>
        <input type="number" bind:value={wordsPerSegment} />
    </div>
    <div>
        <span>Exported file name</span>
        <input type="text" bind:value={exportName} />
    </div>
    {#if !busy}
    <h3>Remember this will overwrite any matching files in the export folder!</h3>
    <button onclick={segment}>Export Segmented Files</button>
    {/if}
    <span>{resultMessage}</span>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 1em;
        margin-bottom: 1em;
    }
</style>
