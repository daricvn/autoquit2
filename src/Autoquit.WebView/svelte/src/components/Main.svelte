<script>
    import { fade } from "svelte/transition"
import BottomNav from "./BottomNav.svelte";
import { theme } from '../store'
var currentTheme;
theme.subscribe(t=> currentTheme = t)

</script>
<div in:fade={{duration: 250, delay: 250 }} out:fade={{ duration: 100 }}>
    <div class={`d-flex`} style="min-height: 400px;" in:fade={{ duration: 250 }}>
        <div class="align-self-stretch">
        </div>
    </div>
    <BottomNav />
</div>