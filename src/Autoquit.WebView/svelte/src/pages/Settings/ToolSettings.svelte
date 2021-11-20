<script>
import { Col, Divider, Row, Checkbox } from "svelte-materialify";
import translate from "../../i18n/language";
import { theme } from "../../store";
var showMouseCoordinate = false
var deepScan = false
var scanThrottling = false
</script>

<div class="text-overline mt-9">{$translate("Tools")}</div>
<Divider />
<Row class="ml-2 mt-6 align-center" noGutters>
    <Col class="col-auto no-select tooltip">
        <Checkbox color={$theme.color} checked={showMouseCoordinate} on:change={()=> showMouseCoordinate = !showMouseCoordinate}>{$translate("Show mouse coordinate")}</Checkbox>
        <span class="tip nowrap">{$translate("Display mouse coordinate on screen.")}</span>
    </Col>
</Row>
<Row class="ml-2 mt-3 align-center" noGutters>
    <Col class="col-auto no-select tooltip">
        <Checkbox color={$theme.color} checked={deepScan} on:change={()=> deepScan = !deepScan}>{$translate("Deep scan")}</Checkbox>
        <span class="tip nowrap">{$translate("Also scan system processes.")}</span>
    </Col>
</Row>
<Row class="ml-2 mt-3 align-center" noGutters>
    <Col class="col-auto no-select tooltip">
        <Checkbox color={$theme.color} checked={scanThrottling} on:change={()=> scanThrottling = !scanThrottling}>{$translate("Process scan throttling")}</Checkbox>
        <span class="tip" style="width: 320px">{$translate("Prevent process scanning happens too frequently. This help improving performance when selecting a target process.")}</span>
    </Col>
</Row>