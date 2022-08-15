<script>
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	import { generateSpherePoints, generateBoxPoints } from '../helpers/objectGenerators.js'

	export let visible = false, opacity = 0, animDuration = 0, objectColor = 'black'
	
	let radius = 4, rotateY = 0, position, autoRotate = true

	const x = tweened(0, { duration: 2000, easing: cubicInOut });
	const y = tweened(0, { duration: 2000, easing: cubicInOut });
	const z = tweened(0, { duration: 2000, easing: cubicInOut });
	
	onMount(() => {
		setTimeout(() => autoRotate = true, animDuration)
		y.set(20, { delay: animDuration})
	})

	SC.onFrame(() => {
		if(autoRotate)
		rotateY += 0.1
	})
</script>

<!-- {#if visible}
	<SC.Primitive 
		object={generateSpherePoints({ 
			radius, 
			segments: { w: 3, h: 3 }, 
			size: 0.5,
			opacity
		})} 
		position={[$x, $y, $z]}
	/>
{/if} -->

<SC.Mesh
	geometry={new THREE.BoxGeometry(8, 4, 8)}
	material={new THREE.MeshLambertMaterial({ color: 'white', transparent: true, opacity })}
	position={[0, 20, 0]}	
/>

{#if visible}
	<SC.Primitive 
		object={generateBoxPoints({ 
			dimensions: [10, 10, 10],
			size: 0.5,
			color: objectColor,
			opacity
		})} 
		position={[$x, $y, $z]}
		rotation={[0, rotateY, 0]}
	/>
{/if}