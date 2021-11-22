<script>
    import { mdiArrowLeft } from "@mdi/js";
    import { pop } from 'svelte-spa-router'
    import Fa from 'svelte-fa'
    import { Button, Col, Container, Icon, Row } from "svelte-materialify";
    import { fly } from "svelte/transition";
    import translate from "../../i18n/language";
    import contacts from './contacts'
    import credits from './credits'
    import { getTextFieldClass, theme } from '../../store'
    let version = "2.0.0"
    let flavour = "Windows"

    function goBack(){
        pop()
    }

    function openInBrowser(url){
        console.log(url)
    }

    $: iconColor = $theme.base == 'light' ? 'black': 'white';
    $: textColor = iconColor + '-text';
    $: darkenColor = $theme.base == 'light' ? 'text-darken-2': 'text-lighten-2';
</script>
<div class={textColor} in:fly={{ x: 200, duration: 350, delay: 200 }} out:fly={{ x: -100, duration: 200 }} style="width: 100vw">
    <Container>
        <Row class="align-center">
            <Col class="col-auto mr-3">
                <Button fab text size="small" on:click={goBack}>
                    <Icon path={mdiArrowLeft} />
                </Button>
            </Col>
            <Col class="col-auto align-self-center">
                <h5>{$translate("About")}</h5>
            </Col>
        </Row>
        <Row class="mt-4 align-center">
            <Col class="col-auto">
                <div style="background-image: url('./favicon.png'); background-size: contain; min-width: 200px; min-height: 200px; max-height: 400px; height: 100%;" />
            </Col>
            <Col>
                <div class="pl-6 pr-4">
                    <div class="text-center">
                        <h5>Autoquit</h5>
                        <span class="text-caption">{$translate("Build")}: {version}</span> - 
                        <span class="text-caption">{$translate("Version")}: {flavour}</span>
                    </div>
                    <hr class="mt-3" />
                    <div class="mt-3 text-body-2">
                        Autoquit is an open-source automation tool developed by <b>Darick Nguyen.</b> <br />
                        It can operate many commands on your desktop automatically with or without focusing on the application, by providing the script that you wrote or recorded, not only let you freely change the playback speed, but also allow you to link between scripts to make a chain of behaviour when automating your repetitive works.
                    </div>
                    <Row class="mt-3 align-center" noGutters>
                        <Col class="col-auto pr-3 text-body-2">
                            Contact me: 
                        </Col>
                        <Col>
                            <Row noGutters>
                                <Col class="col-auto">
                                    {#each contacts as contact}
                                        <span class="contact-icon" on:click={()=> openInBrowser(contact.url)}>
                                            <div class="tooltip bottom">
                                                <Fa class="clickable" icon={contact.icon} size="2x" color={contact.colour ?? iconColor} />
                                                <span class="tip">{contact.tooltip}</span>
                                            </div>
                                        </span>
                                    {/each}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row class="mt-3 align-center" noGutters>
                        <Col class="col-auto pr-3 text-body-2">
                            Credits: 
                        </Col>
                        <Col>
                            {#each credits as credit}
                            <span>
                                {credit}
                            </span>;&nbsp;
                            {/each}
                        </Col>
                    </Row>
                    <p class={getTextFieldClass($theme)}><b>{$translate("Useful links")}:</b></p>
                </div>
            </Col>
        </Row>
    </Container>
</div>

<style>
    .contact-icon {
        margin-right: 5px;
    }
</style>