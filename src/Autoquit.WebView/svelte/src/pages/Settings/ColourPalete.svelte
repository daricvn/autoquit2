<script>
import { createEventDispatcher } from "svelte";


    export let colorList = [];
    export let value = '';

    const dispatch = createEventDispatcher();
    function onColourSelected(which){
        dispatch('change', { value: which.name, text: which.text, css: which.css });
    }
</script>

<div>
    {#each colorList as colour }
        <div class="tooltip">
            <span class={`colour-palete ${ value == colour.name ? 'active':''}`} style={`background-color: ${colour.css}`} on:click={()=> onColourSelected(colour)} />
            {#if (!!colour.tooltip && value != colour.name) }
                <span class="tip nowrap">{colour.tooltip}</span>
            {/if}
        </div>
    {/each}
</div>

<style>
    .colour-palete {
        content: ' ';
        border-radius: 50%;
        width: 44px;
        height: 44px;
        margin-right: 9px;
        cursor: pointer;
        border: 3px dotted rgba(97,97,97,0.2);
        display: inline-block;
        transition: all 0.3s;
        opacity: 0.8;
        transform: scale(1);
    }

    .colour-palete:not(.active):hover{
        border: 3px solid rgba(97,97,97,0.5);
        transform: scale(1.05);
    }

    .colour-palete.active {
        opacity: 1;
        cursor: default;
        border: 4px solid rgb(121,121,121);
    }

</style>


