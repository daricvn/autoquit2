<script>
import { mdiKeyboard } from "@mdi/js";

import { Button, Col, Divider, Icon, Row, Switch, TextField } from "svelte-materialify";

import translate from "../../i18n/language";
import { getTextFieldClass, theme } from "../../store";
var advancedMode = false
var playStopShortcut = {}
var recordStopShortcut = {}

function handleKeyBind(event){
    event.preventDefault()
    let obj = {}
    obj.key = event.code
    if (event.code.indexOf("Key") >= 0)
    obj.key= event.key.toUpperCase()
        obj.alt = event.altKey
        obj.ctrl = event.ctrlKey
        obj.shift = event.shiftKey
        obj.text = ''
    if (obj.ctrl)
        obj.text += "[CTRL]";
    if (obj.alt)
        obj.text += (obj.text ? '+':'') + "[ALT]";
    if (obj.shift)
        obj.text += (obj.text ? '+':'') + "[SHIFT]";
    obj.text += (obj.text ? '+':'') + obj.key;
    return obj
}

$: playStopShortcutText = playStopShortcut.text ? playStopShortcut.text : ''
$: recordStopShortcutText = recordStopShortcut.text ? recordStopShortcut.text : ''
</script>

<div class="text-overline mt-9">{$translate("Features")}</div>
<Divider />
<Row class="ml-2 mt-6 align-center" noGutters>
    <Col class="no-select">
        <Switch color={$theme.color} bind:checked={advancedMode} inset>{$translate("Show advanced modules")}</Switch>
    </Col>
    <Col class="text-right">
        <Button class={$theme.color + "-text"} rounded text>...{$translate("Plugins")}</Button>
    </Col>
</Row>
<Row class="ml-2 mt-3 align-center" noGutters>
    <Col class="col-4 no-select mr-3">
        {$translate("Play/Stop Shortcut")}:
    </Col>
    <Col class="text-right">
        <TextField class={getTextFieldClass($theme)} outlined dense placeholder={$translate("Not set")} style="max-width: 350px;" 
            on:keypress={(e)=> playStopShortcut = { playStopShortcut, ...handleKeyBind(e) }} bind:value={playStopShortcutText}>
          <div slot="append">
            <Icon path={mdiKeyboard} />
          </div>
        </TextField>
    </Col>
</Row>
<Row class="ml-2 mt-3 align-center" noGutters>
    <Col class="col-4 no-select mr-3">
        {$translate("Record/Stop Shortcut")}:
    </Col>
    <Col class="text-right">
        <TextField class={getTextFieldClass($theme)} outlined dense placeholder={$translate("Not set")} style="max-width: 350px" 
            on:keypress={(e)=> recordStopShortcut = { recordStopShortcut, ...handleKeyBind(e) }} bind:value={recordStopShortcutText}>
          <div slot="append">
            <Icon path={mdiKeyboard} />
          </div>
        </TextField>
    </Col>
</Row>