<script>
	// import { tweened } from 'svelte/motion';
	// import { cubicOut, cubicInOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import * as SC from 'svelte-cubed';

	// import RainbowPickett from './RainbowPickett.svelte';
	import Edges from './Edges.svelte';
	import Solid from './Solid.svelte';
	import Mess from './Mess.svelte';
	import Particles from './Particles.svelte';

	export let current, rotateY = 0

	const componentMap = {
		edges: {
			component: Edges,
			position: [0, 0, 0]
		},
		solid: {
			component: Solid,
			position: [0, 0, 0],
			color: { r: 0, g: 0, b: 0 }
		},
		centerededges: {
			component: Solid,
			position: [0, 0, 0],
			color: { r: 120, g: 120, b: 120 }
		},
		particles: {
			component: Particles,
			position: [0, 0, 0]
		},
		mess: {
			component: Mess,
			position: [0, 0, 0]
		},
		finalEdges: {
			component: Edges,
			position: [4, 4, 4]
		},
	}

	let mounted = false

	onMount(() => mounted = true)
</script>

<!-- <RainbowPickett wireframe={true} /> -->
<SC.Group position={componentMap[current].position} rotation={[0, rotateY, 0]}>
	<svelte:component 
		this={mounted ? componentMap[current].component : null} color={componentMap[current].color}
	></svelte:component>
</SC.Group>