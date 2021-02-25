<script>
import { mdiCog, mdiPlay, mdiStop } from "@mdi/js";
import { scale } from 'svelte/transition'
import { backInOut, bounceInOut } from 'svelte/easing'
import { AppBar, Button, Col, Icon, Row } from "svelte-materialify";
import { scriptList, theme } from '../store'
import { push, location } from 'svelte-spa-router'
import translate from '../i18n/language'
var currentTheme;
var script = {}
theme.subscribe(t=> currentTheme = t)
scriptList.subscribe(t=> script = t)

$: textColor = (currentTheme.text + '-text') + " mr-1"
$: isPlaying = script && script.state == 'play'

const togglePlayStop = () => {
    if (script == null)
        script = {}
    script.state = isPlaying ? 'stop' : 'play';
}
const navTo = (url)=>{
    if ($location != url)
        push(url)
}
</script>

<div class="bottomNav">
    <AppBar class={currentTheme.color} flat style="padding-top: 4px">
        <Row noGutters>
            <Col>
            </Col>
            <Col cols="auto">
                <Row noGutters>
                    <Col>
                        <Button class={textColor + " rotate-icon"} size="large" text fab on:click={()=> navTo('/settings')}>
                            <Icon path={mdiCog} />                            
                        </Button>
                    </Col>
                    <Col>
                        <Button class={`${isPlaying ? 'red':'green'} ${textColor}`} size="large" rounded depressed on:click={togglePlayStop} style="min-width: 150px">
                                    {#if isPlaying}
                                        <div class="transitionIcon stop-icon-animation" in:scale={{ duration: 200, delay: 100, easing: backInOut, start: 0.5 }} out:scale={{ duration: 200, easing: bounceInOut }}>
                                            <Icon path={mdiStop} style="margin-right: 2px;" size="32px" />
                                        </div>
                                    {:else}
                                        <div class="transitionIcon" in:scale={{ duration: 200, delay: 100, easing: backInOut, start: 0.5 }} out:scale={{ duration: 200, easing: bounceInOut }}>
                                            <Icon path={mdiPlay} style="margin-right: 2px;" size="32px" />
                                        </div>
                                    {/if}
                                <div>
                                    { $translate( isPlaying ?"Stop":"Play" )}
                                </div>
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    </AppBar>
</div>

<style>
    .transitionIcon{
        position: absolute;
        left: 0;
        top: -7px;
    }
    .transitionIcon + div {
        margin-left: 40px
    }
    .bottomNav {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
    }
    .stop-icon-animation {
        animation: stop-icon-animation-frame;
        animation-timing-function: cubic-bezier(.33,.81,.6,1.26);
        animation-duration: 7s;
        animation-delay: 200ms;
        animation-iteration-count: infinite;
    }
    @keyframes stop-icon-animation-frame {
        0% { transform: rotate(0); }
        60% { transform: rotate(0); }
        75% { transform: rotate(180deg); }
        85% { transform: rotate(180deg); }
        100% { transform: rotateZ(360deg); }
    }

</style>