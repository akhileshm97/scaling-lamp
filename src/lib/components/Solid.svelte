<script>
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	
	// import FloatPad from '$lib/dev/FloatPad.svelte';

	export let visible = false, opacity = 0, objectColor = 'black'

	const indicesOfFaces = [
	    2,1,0,    0,3,2,
	    0,4,7,    7,3,0,
	    0,1,5,    5,4,0,
	    1,2,6,    6,5,1,
	    2,3,7,    7,6,2,
	    4,5,6,    6,7,4
	];

	let rotateY = 0
	let detail = 0

	// const detail = tweened(0, { duration: 1000, easing: cubicOut	});

	const p = tweened(1, { duration: 1000, easing: cubicInOut	});
	const n = tweened(-1, { duration: 1000, easing: cubicInOut	});

	$: geometry = new THREE.PolyhedronGeometry( verticesOfCube, indicesOfFaces, 10, detail );
	$: verticesOfCube = [
    $n,$n,$n,    $p,$n,$n,    $p, $p,$n,    $n, $p,$n,
    $n,$n, $p,    $p,$n, $p,    $p, $p, $p,    $n, $p, $p,
	];

	// const increaseDetail = () => detail++
	// const decreaseDetail = () => detail--

	// const increaseP = () => p.update(v => v + 1)
	// const decreaseN = () => n.update(v => v - 1)
</script>

{#if visible}
	<SC.Mesh 
		geometry={new THREE.BoxGeometry(10, 10, 10)}
		material={new THREE.MeshLambertMaterial({ 
			color: objectColor,
			transparent: true,
			opacity
		})}
	/>
{/if}

	<!-- material={new THREE.MeshLambertMaterial({ color: new THREE.Color(`rgb(${color.r}, ${color.g}, ${color.b})`) })} -->

<!-- {#if visible}
	<SC.Mesh
		geometry={geometry}
		material={new THREE.MeshLambertMaterial({ color: objectColor, transparent: true, opacity })}
		rotation={[0, rotateY, 0]}
	/>	
{/if} -->

<!-- <FloatPad> -->
	<!-- <button on:click={increaseDetail}>increaseDetail</button> -->
	<!-- <button on:click={decreaseDetail}>decreaseDetail</button> -->

	<!-- <button on:click={increaseP}>increaseP</button> -->
	<!-- <button on:click={decreaseN}>decreaseN</button> -->
	<!-- <p>{$p}, {$n}</p> -->
<!-- </FloatPad> -->