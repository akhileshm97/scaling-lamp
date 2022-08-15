<script>
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	
	import FloatPad from '$lib/dev/FloatPad.svelte';

	import Edges from './Edges.svelte';
	import Solid from './Solid.svelte';
	import Particles from './Particles.svelte';
	import Mess from './Mess.svelte';

	export let target, animDuration, objectColor

	const objectConfig = {
		edges: {
			component: Edges,
			position: [0, 0, 0]
		},
		solid: {
			component: Solid,
			position: [0, 0, 0],
		},
		centerededges: {
			component: Edges,
			position: [0, 0, 0],
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

	let current = null
	let visibility = {
		edges: false, 
		solid: false,
		centerededges: false,
		particles: false,
		mess: false,
		finalEdges: false
	}
	
	const objectOpacity = tweened(0, { duration: animDuration, easing: cubicInOut	});

	const updateOpacities = () => {
		objectOpacity
			.set(0)
			.then(() => {
				visibility[current] = false
				visibility[target] = true
				current = target
				objectOpacity.set(1)
			})
	}

	$: updateOpacities(target)
</script>

<svelte:component 
	this={current ? objectConfig[current].component : null}
	opacity={$objectOpacity}
	visible={visibility[current]}
	{animDuration}
	{objectColor}
></svelte:component>

<!-- <FloatPad position='bottom-right'>
	<p>objectOpacity: {$objectOpacity.toFixed(2)}</p>
	<p>current: {current}</p>
	<p>target: {target}</p>
	<p>vis edges: {visibility.edges}</p>
	<p>vis solid: {visibility.solid}</p>
	<p>vis centerededges: {visibility.centerededges}</p>
	<p>vis particles: {visibility.particles}</p>
	<p>vis mess: {visibility.mess}</p>
	<p>vis finalEdges: {visibility.finalEdges}</p>
</FloatPad> -->
