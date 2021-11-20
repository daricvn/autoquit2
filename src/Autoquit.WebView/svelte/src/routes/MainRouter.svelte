<script>
    import Router from 'svelte-spa-router'
    import { routes } from './routes'
    var isLoading = false

    function onLoading(){
        isLoading = true
    }
    function onLoaded(){
        setTimeout(()=>{
            isLoading = false
        },250);
    }
    $: positionProp = isLoading ? "loading-routes":"";
</script>
<div class={positionProp}>
    <Router {routes} on:routeLoading={onLoading} on:routeLoaded={onLoaded}>
    </Router>
</div>

<style>
    :global(div.loading-routes > *) {
        position:fixed;
    }
</style>