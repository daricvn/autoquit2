<script>
import { mdiClose } from "@mdi/js";
import { Button, Col, Dialog, Icon, Row } from "svelte-materialify";
import { backInOut, bounceInOut, elasticInOut, quintInOut } from "svelte/easing";
import { fly, slide } from "svelte/transition";
import { theme } from "../store";
var currentTheme;
theme.subscribe(t=> currentTheme = t)
export let active = false
export let title = ''
export let mode = 'open'
export let filter = ''

$: textColor = currentTheme.text + "-text"
$: actualTitle = (title ? (title + " - "): "") + (mode == 'open' ? 'Open File' : 'Save File')

</script>

<Dialog class="dialog" persistent bind:active={active} transition={(node)=>fly( node, { duration: 400, y: -90, easing: backInOut })} width="700px">
    <div class={"dialog-bar " + currentTheme.color}>
        <Row noGutters class="align-center">
            <Col class="pl-4 no-select">
                <span class={"text-body-2 " + textColor}>{actualTitle}</span>
            </Col>
            <Col class="col-auto">
                <Button class={textColor} fab text size="x-small" on:click={()=> active = false}>
                    <Icon path={mdiClose} />
                </Button>
            </Col>
        </Row>
    </div>
    <div style="height: 400px" />
</Dialog>

<style>
    .dialog-bar {
        width: 100%;
        height: 32px;
    }
    :global(.dialog) {
        margin-top: -20vh;
    }
</style>