<script lang="ts">

    export let show: boolean = true;
    export let checked: boolean = false;

</script>
{#if show}
    <div on:click={() => (checked = !checked)} class="input checkbox">
        {#if checked}
            ✔
        {/if}
    </div>
{/if}