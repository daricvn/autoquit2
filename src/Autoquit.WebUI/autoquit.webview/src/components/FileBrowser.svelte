<script>
import { mdiArrowLeft, mdiClose, mdiMenuDown } from "@mdi/js";
import { Button, Col, Dialog, Icon, Row, TextField } from "svelte-materialify";
import { cubicInOut } from "svelte/easing";
import { text } from "svelte/internal";
import { scale } from "svelte/transition";
import translate from "../i18n/language";
import { getTextFieldClass, theme } from "../store";
var currentTheme;
theme.subscribe(t=> currentTheme = t)
export let active = false
export let title = ''
export let mode = 'open'
export let filter = ''

$: textColor = currentTheme.text + "-text"
$: actualTitle = (title ? (title + " - "): "") + (mode == 'open' ? 'Open File' : 'Save File')

</script>

<Dialog class="dialog" persistent bind:active={active} transition={(node)=>scale( node, { duration: 200, start: 0.9, opacity: 0, easing: cubicInOut })} width="860px">
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
    <div class="mt-2 pl-1 pr-2" style="height: 500px">
        <Row noGutters>
            <Col class="col-auto pr-1">
                <Button fab text size="small">
                    <Icon path={mdiArrowLeft} />
                </Button>
            </Col>
            <Col>
                <TextField class={getTextFieldClass($theme)} outlined dense>
                    <div slot="append">
                      <Icon path={mdiMenuDown} />
                    </div>
                </TextField>
            </Col>
            <Col class="col-4 pl-1">
                <TextField class={getTextFieldClass($theme)} outlined dense placeholder={$translate("Search for file...")}>
                </TextField>
            </Col>
        </Row>
    </div>
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