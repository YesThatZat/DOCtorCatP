<script lang="ts">
    interface props {
        onExportFolderSelected: (destination: string) => void
    }
    let { onExportFolderSelected: onFileDestinationSet }: props = $props()

    const selectExportFolder = async () => {
        const response = await window.electronAPI.dialogSelectFolder({
            title: "Choose where to export .txt files",
        })
        if (response) onFileDestinationSet(response.path)
    }
</script>

<div>
    <button onclick={selectExportFolder}>Select export location</button>
</div>

<style>
</style>
