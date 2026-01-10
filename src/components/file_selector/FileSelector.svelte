<script lang="ts">
    interface props {
        onFilePathChosen: (path: string) => void;
    }
    let { onFilePathChosen }: props = $props();

    const selectFile = async () => {
        const selectFileResponse = await window.electronAPI.dialogSelectFile({
            title: "Open document",
            filters: [
                { name: "Word documents", extensions: ["docx"] },
                { name: "Text documents", extensions: ["txt"] },
            ],
        });
        if (selectFileResponse) onFilePathChosen(selectFileResponse.path);
        else onFilePathChosen("");
    };
</script>

<div>
    <button onclick={selectFile}>Select Document</button>
</div>

<style>
</style>
