<script>
	import { MaterialApp } from 'svelte-materialify'
	import Main from './components/Main.svelte';
	import Toolbar from './components/Toolbar.svelte';
import MainRouter from './routes/MainRouter.svelte';
	import { theme } from './store'
	var currentTheme;
	theme.subscribe(t=> {
		currentTheme = t;
		document.body.className = currentTheme.base == 'light' ? "white" : "grey darken-4"
	})
</script>

<div style="width: 100%; overflow: hidden;">
	<MaterialApp theme={currentTheme.base}>
		<Toolbar></Toolbar>
		<MainRouter />
	</MaterialApp>
</div>
	<style>
		:global(.s-text-field__input label) {
			background-color: transparent !important;
		}

		:global(.s-tooltip) {
			transition-duration: 0.15s !important;
		}

		:global(.s-app) {
			height: 100%;
		}
	</style>