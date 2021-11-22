<script>
import { mdiClose } from "@mdi/js";
import { Button, Col, Container, Divider, Icon, Row, Select } from "svelte-materialify";
import { fly } from "svelte/transition";
import { pop } from 'svelte-spa-router'
import translate from "../../i18n/language";
import ColourPalete from "./ColourPalete.svelte";
import { getTextFieldClass, theme } from "../../store";
import colourList from './appColour'
import ToolSettings from "./ToolSettings.svelte";
import FeatureSettings from "./FeatureSettings.svelte";
var currentTheme;

theme.subscribe(t=> currentTheme = t)

$: themeList = [
    { name: 'light', css: 'rgb(212,212,212)', tooltip: $translate('Light Theme')},
    { name: 'dark', css: 'rgb(43,43,43)', tooltip: $translate("Dark Theme")}
]

function setThemeBase(event){
    var textColour = currentTheme.text;
    if (currentTheme.color == 'transparent'){
        if (textColour == 'black' && event.detail.value == 'dark')
            textColour = 'white';
        if (textColour == 'white' && event.detail.value == 'light')
            textColour = 'black';
    }
    if (event.detail.value)
        theme.update(t=> t = { ...t, base: event.detail.value, text: textColour })
}

function setThemeColour(event){
    var textColour = event.detail.text ? event.detail.text : 'white'
    if (event.detail.text == 'black' && currentTheme.base == 'dark')
        textColour = 'white';
    if (event.detail.value)
        theme.update(t=> t = { ...t, color: event.detail.value, css: event.detail.css, text: textColour })
}

</script>

<div class="mt-8 pl-12 pr-12" in:fly={{ y: -50, duration: 400, delay: 200 }} out:fly={{ y: 100, duration: 200 }} style="width: 100vw">
    <div class="pb-4" style="margin-left: auto; margin-right: auto; max-width: 750px;">
        <Row class="mb-5">
            <Col>
                <h4>
                    {$translate("Settings")}
                </h4>
            </Col>
            <Col class="col-auto">
                <Button class="rotate-icon slight" fab outlined on:click={()=> pop() } size="small">
                    <Icon path={mdiClose} />
                </Button>
            </Col>
        </Row>
        <div class="text-overline">{$translate("Appearance")}</div>
        <Divider />
        <Row class="mt-6 align-center" noGutters>
            <Col class="col-auto mr-3">
                {$translate("Theme")}:
            </Col>
            <Col>
                <ColourPalete colorList={themeList} value={currentTheme.base} on:change={setThemeBase} />
            </Col>
        </Row>
        <Row class="mt-3 align-center" noGutters>
            <Col class="col-auto mr-3">
                {$translate("Colour")}:
            </Col>
            <Col>
                <ColourPalete colorList={colourList} value={currentTheme.color} on:change={setThemeColour} />
            </Col>
        </Row>
        <Row class="mt-3 align-center" noGutters>
            <Col class="col-auto mr-3">
                {$translate("Language")}:
            </Col>
            <Col class="col-8">
                <Select class={getTextFieldClass($theme)} outlined dense></Select>
            </Col>
        </Row>
        <ToolSettings />
        <FeatureSettings />
    </div>
</div>

<style>

</style>