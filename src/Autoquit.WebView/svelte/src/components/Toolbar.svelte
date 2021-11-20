<script>
  import {
    mdiFileOutline,
    mdiFolder,
    mdiDotsHorizontal,
    mdiInformation,
    mdiContentSaveAllOutline,
    mdiContentSave
  } from "@mdi/js";
  import {
    AppBar,
    Button,
    Col,
    Icon,
    List,
    ListItem,
    Menu,
    Row,
    TextField,
    Tooltip,
  } from "svelte-materialify";
  import { theme, scriptList } from "../store";
  import { scale } from 'svelte/transition';
  import { backOut } from 'svelte/easing';
  import FileBrowser from './FileBrowser.svelte'
import translate from "../i18n/language";
import { push, location } from 'svelte-spa-router'
  var currentTheme;
  var filePath = "";
  var scripts;
  theme.subscribe((t) => (currentTheme = t));
  scriptList.subscribe(t=> scripts = scriptList)

  $: appBarClass = `${currentTheme.color} theme--${
    currentTheme == "light" ? "dark" : "light"
  }`;
  $: textColor = currentTheme.text;


  function goToAbout(){
    if ($location != '/about')
      push('/about')
  }

  var fileBrowser = false
  var fileMode = 'open'
  const openFileBrowser = (mode)=>{
    if (!mode)
      fileMode = 'open'
    fileBrowser = true
  }

  window.openFileBrowser = openFileBrowser
</script>

<AppBar dense class={appBarClass} flat>
  <!-- <div slot="icon"> -->
  <Row noGutters>
    <Col cols="auto">
      <Tooltip bottom>
        <Button class={`transparent ${textColor}-text`} fab depressed text size="small">
          <Icon path={mdiFileOutline} />
        </Button>
        <div slot="tip">{$translate("New script")}</div>
      </Tooltip>
    </Col>
    <Col class="align-center align-self-end">
      <TextField
        class="transparent small-right-padding"
        dense
        rounded
        outlined
        readonly
        style={`color: ${textColor} !important; caret-color: ${textColor} !important; outline-color: red !important`}
        bind:value={filePath}
      >
        <div slot="append">
            <Row noGutters>
                <Col>
                    <Tooltip bottom>
                      <Button fab text style="width: 32px; height: 32px;" on:click={()=> openFileBrowser()}>
                        <Icon path={mdiFolder} size="18px" />
                      </Button>
                      <div slot="tip">{$translate("Open file")}</div>
                    </Tooltip>
                </Col>
                <Col>
                    {#if (scripts && scripts.items && scripts.items.length > 0)}
                    <Menu offsetX={false} offsetY={false} transition={scale} inOpts={{ easing: backOut, duration: 200 }}>
                        <div slot="activator">
                            <Button fab text style="width: 32px; height: 32px;" transition={scale}>
                                <Icon path={mdiDotsHorizontal} size="18px" />
                            </Button>
                        </div>
                        <List dense>
                            <ListItem>
                            <span slot="prepend">
                                <Icon path={mdiContentSave} size="21px" />
                            </span>
                            {$translate("Save")}
                            </ListItem>
                            {#if filePath != ""}
                                <ListItem>
                                <span slot="prepend">
                                    <Icon path={mdiContentSaveAllOutline} size="21px" />
                                </span>
                                {$translate("Save As")}
                                </ListItem>
                            {/if}
                        </List>
                        </Menu>
                    {/if}
                </Col>
            </Row>
        </div>
      </TextField>
    </Col>
  </Row>

  <!-- <Button class="indigo" fab depressed text size="small">
        <Icon path={mdiFolder} />
      </Button>
      <Button class="indigo" fab depressed text size="small">
        <Icon path={mdiContentSave} />
      </Button> -->
  <!-- </div> -->
  <div style="flex-grow:1" />
  <Button class={`transparent ${textColor}-text`} fab depressed text on:click={goToAbout}>
    <Icon path={mdiInformation} />
  </Button>
</AppBar>

<FileBrowser bind:active={fileBrowser} />

<style>
  :global(.small-right-padding .s-text-field__wrapper.outlined.rounded) {
    padding-right: 0px;
  }
</style>
