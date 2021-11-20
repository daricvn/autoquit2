<script>
import { Col, Container, Overlay, ProgressCircular, Row } from "svelte-materialify";
    import { theme } from '../store'
    var currentTheme;
    theme.subscribe(t=> currentTheme = t)
</script>
<Overlay active={true}>
        <Row class="justify-center" noGutters>
            <Col class="col-auto align-self-center">
                <ProgressCircular size={70} width={7} indeterminate color={currentTheme.color} />
            </Col>
        </Row>
</Overlay>