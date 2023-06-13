<svelte:options accessors={true}></svelte:options>
<script lang="ts">

    import { ConfirmPopupControl, Modal } from "./index.ts";

    export let title: string = "Confirmar";
    export let yes: string = "Sim";
    export let no: string = "Não";
    export let callback: (result: boolean) => void;
    export let Root: ConfirmPopupControl = new ConfirmPopupControl(callback);

</script>
<Modal bind:Root={Root}>
    <div class="relative w-[30%] h-auto rounded-md bg-white p-1 flex items-center justify-center shadow-md">
        <div class="w-full h-full p-6 bg-white flex">
            <div class="w-full h-full flex flex-col items-start m-2 gap-y-4">
                <div class="w-full h-4/5 flex flex-col justify-center gap-y-4">
                    <h1 class="text-2xl font-medium text-gray-800 drop-shadow-md">{ title }</h1>
                    <hr class="w-full border-[0.1rem] border-gray-300"/>
                    <div class="w-full max-h-[6rem] overflow-y-scroll text-sm text-gray-800">
                        <slot/>
                    </div>
                </div>
                <div class="w-full h-1/5 inline-flex justify-center gap-x-6">
                    <button class="input w-full" on:click={() => Root.Choose(false) }>{ no }</button>
                    <button class="input w-full" on:click={() => Root.Choose(true) }>{ yes }</button>
                </div>
            </div>
        </div>
    </div>
</Modal>
