<script>
// @ts-nocheck
	// import { onMount, createEventDispatcher } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import { TroisProvider } from 'svelte-trois'

	import Morpher from '$lib/components/Morpher.svelte'
	import DevThings from '$lib/dev/DevThings.svelte'
	import FieldMarkers from '$lib/dev/FieldMarkers.svelte'
	import CameraControls from '$lib/dev/CameraControls.svelte'
	// import FloatPad from '$lib/dev/FloatPad.svelte';

	export let target

	const objectColor = '#83c0bf'
	const backgroundColor = '#0f1c2d'

	const animDuration = 300
	const camOptions = {
		edges: {
			label: 'edges',
			position: { x: 10, y: 20, z: 40 },
			target: { x: 0, y: 0, z: 0 }
		},
		solid: {
			label: 'solid',
			position: { x: -10, y: 20, z: 40 },
			target: { x: 0, y: 0, z: 0 }
		},
		centerededges: {
			label: 'centerededges',
			position: { x: 10, y: 20, z: 40 },
			target: { x: 0, y: 0, z: 0 }
		},
		particles: {
			label: 'particles',
			position: { x: -10, y: 20, z: 80 },
			target: { x: 0, y: 0, z: 0 }
		},
		mess: {
			label: 'mess',
			position: { x: 10, y: 20, z: 40 },
			target: { x: 0, y: 0, z: 0 }
		},
		finalEdges: {
			label: 'finalEdges',
			position: { x: -10, y: 20, z: 40 },
			target: { x: 0, y: 0, z: 0 }
		}
	}

	// let rotateY = 0
	
	// let autoRotate = true
	// SC.onFrame(() => {
	// 	if(autoRotate) {
	// 		// rotateY.set($rotateY + 0.01)
	// 		rotateY += 0.01
	// 	}
	// })

	const camPosX = tweened(0, { duration: 2 * animDuration, easing: cubicInOut });
	const camPosY = tweened(0, { duration: 2 * animDuration, easing: cubicInOut });
	const camPosZ = tweened(0, { duration: 2 * animDuration, easing: cubicInOut });

	const camTargetX = tweened(0, { duration: animDuration, easing: cubicInOut });
	const camTargetY = tweened(0, { duration: animDuration, easing: cubicInOut });
	const camTargetZ = tweened(0, { duration: animDuration, easing: cubicInOut });

	function updateCamera(_target) {
		if(_target) {
			camTargetX.set(camOptions[_target].target.x)
			camTargetY.set(camOptions[_target].target.y)
			camTargetZ.set(camOptions[_target].target.z)

			camPosX.set(camOptions[_target].position.x)
			camPosY.set(camOptions[_target].position.y)
			camPosZ.set(camOptions[_target].position.z)
		}
	}

	$: updateCamera(target)
</script>

<div id="scene">
	<SC.Canvas
		antialias
		background={new THREE.Color(backgroundColor)}
		fog={new THREE.FogExp2('papayawhip', 0.005)}
		shadows
	>
		<SC.PerspectiveCamera 
			position={[$camPosX, $camPosY, $camPosZ]} 
			target={[$camTargetX, $camTargetY, $camTargetZ]} 
		/>
		<!-- <SC.OrbitControls 
			enableZoom={true} 
			maxPolarAngle={Math.PI * 0.95} 
			minDistance={1}
			maxDistance={200}
			enableDamping 
			dampingFactor={0.1}
			zoomSpeed={0.5} 
		/> -->
		<SC.AmbientLight intensity={0.6} />
		<SC.DirectionalLight intensity={0.6} position={[40, 40, 0]} shadow={{ mapSize: [2048, 2048] }} />

		<TroisProvider>
			<Morpher {target} {animDuration} {objectColor} />
			<!-- <DevThings /> -->

		</TroisProvider>
	</SC.Canvas>
</div>

<!-- <FieldMarkers show={false} /> -->
<!-- <CameraControls {camPosX} {camPosY} {camPosZ} open={false} /> -->

<style>
	#scene {
		position: fixed;
		z-index: -1;
		height: 100%;
		width: 100%;
	}
</style>