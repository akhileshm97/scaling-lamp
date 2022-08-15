<script>
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	
	import FloatPad from '$lib/dev/FloatPad.svelte';

	import Edges from './Edges.svelte';
	import Solid from './Solid.svelte';
import Particles from './Particles.svelte';
import Mess from './Mess.svelte';

	export let target, animDuration

	// const increaseDetail = () => detail++
	// const decreaseDetail = () => detail--

	// const increaseP = () => p.update(v => v + 1)
	// const decreaseN = () => n.update(v => v - 1)

	const objectConfig = {
		edges: {
			component: Edges,
			wireframe: false,
			position: [0, 0, 0],
			edgesOpacity: 1,
			solidOpacity: 0
		},
		solid: {
			component: Solid,
			wireframe: false,
			position: [0, 0, 0],
			color: { r: 0, g: 0, b: 0 },
			edgesOpacity: 0,
			solidOpacity: 1
		},
		centerededges: {
			component: Edges,
			wireframe: false,
			position: [0, 0, 0],
			color: { r: 120, g: 120, b: 120 },
			edgesOpacity: 1,
			solidOpacity: 0
		},
		particles: {
			component: Particles,
			wireframe: false,
			position: [0, 0, 0],
			edgesOpacity: 0,
			solidOpacity: 1
		},
		mess: {
			component: Mess,
			wireframe: false,
			position: [0, 0, 0],
			edgesOpacity: 1,
			solidOpacity: 0
		},
		finalEdges: {
			component: Edges,
			wireframe: false,
			position: [4, 4, 4],
			edgesOpacity: 0,
			solidOpacity: 1
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
	
	const currentOpacity = tweened(0, { duration: animDuration, easing: cubicInOut	});
	const targetOpacity = tweened(0, { duration: animDuration, easing: cubicInOut	});
	// const detail = tweened(0, { duration: 1000, easing: cubicOut	});

	const updateOpacities = (_target) => {
		currentOpacity
			.set(0)
			.then(() => {
				visibility[current] = false
				visibility[target] = true
			})

		targetOpacity
			.set(1, { delay: animDuration })
			.then(() => {
				current = target
				currentOpacity.set(1, { duration: 0 })
				targetOpacity.set(0, { duration: 0 })
			})
	}

	$: updateOpacities(target)
</script>

<svelte:component 
	this={current ? objectConfig[current].component : null}
	opacity={$currentOpacity}
	visible={visibility[current]}
></svelte:component>

<svelte:component 
	this={target ? objectConfig[target].component : null}
	opacity={$targetOpacity}
	visible={visibility[target]}
></svelte:component>

<FloatPad position='bottom-right'>
	<p>currentOpacity: {$currentOpacity}</p>
	<p>targetOpacity: {$targetOpacity}</p>
	<p>current: {current}</p>
	<p>target: {target}</p>
	<p>vis edges: {visibility.edges}</p>
	<p>vis solid: {visibility.solid}</p>
	<p>vis centerededges: {visibility.centerededges}</p>
	<p>vis particles: {visibility.particles}</p>
	<p>vis mess: {visibility.mess}</p>
	<p>vis finalEdges: {visibility.finalEdges}</p>
</FloatPad>
