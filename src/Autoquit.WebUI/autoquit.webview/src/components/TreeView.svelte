<script context="module">
	// retain module scoped expansion state for each tree node
	const _expansionState = {
		/* treeNodeId: expanded <boolean> */
	}
</script>
<script>
//	import { slide } from 'svelte/transition'
import { Icon } from 'svelte-materialify'
import { mdiFolder, mdiFolderOpen } from "@mdi/js";
	export let tree
	const { label, children, loaded } = tree

	let expanded = _expansionState[label] || false
	const toggleExpansion = () => {
		expanded = _expansionState[label] = !expanded
	}
	$: arrowDown = expanded
</script>

<ul><!-- transition:slide -->
	<li>
		{#if children || !loaded }
			<div on:click={toggleExpansion}>
				<Icon path={ expanded ? mdiFolderOpen : mdiFolder} />
				{label}
			</div>
			{#if expanded}
				{#each children as child}
					<svelte:self tree={child} />
				{/each}
			{/if}
		{:else}
			<span>
				<span class="no-arrow"/>
				{label}
			</span>
		{/if}
	</li>
</ul>

<style>
	ul {
		margin: 0;
		list-style: none;
		padding-left: 1.2rem; 
		user-select: none;
	}
	.no-arrow { padding-left: 1.0rem; }
	.arrow {
		cursor: pointer;
		display: inline-block;
		/* transition: transform 200ms; */
	}
	.arrowDown { transform: rotate(90deg); }
</style>
