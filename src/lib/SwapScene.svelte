<script>
// @ts-nocheck
	// import { onMount, createEventDispatcher } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import { TroisProvider } from 'svelte-trois'

	import Swapper from '$lib/components/Swapper.svelte'
	import DevThings from '$lib/dev/DevThings.svelte'
	import FieldMarkers from '$lib/dev/FieldMarkers.svelte'
	import CameraControls from '$lib/dev/CameraControls.svelte'
	import FloatPad from '$lib/dev/FloatPad.svelte';

	export let current
	// export let introFinished

	// const dispatch = createEventDispatcher();

	// export const startIntro = () => {
	// 	setTimeout(() => {
	// 		camPosX.set(-70)
	// 		camPosY.set(0)
	// 		camPosZ.set(0)
	// 	}, 1000)
	// 	setTimeout(() => {
	// 		camPosX.set(70)
	// 		camPosY.set(0)
	// 		camPosZ.set(0)
	// 	}, 3000)
	// 	setTimeout(() => {
	// 		camPosX.set(70)
	// 		camPosY.set(0)
	// 		camPosZ.set(120)
	// 	}, 5000)
	// 	setTimeout(() => {
	// 		camPosX.set(0)
	// 		camPosY.set(30) 
	// 		camPosZ.set(180)
	// 	}, 7000)
	// 	setTimeout(() => {
	// 		dispatch('introfinished', 'intro finished')
	// 	}, 9000)
	// }

	// const rotateY = tweened(0, { duration: 1000, easing: cubicOut	});

	const camPosX = tweened(0, { duration: 2000, easing: cubicInOut });
	const camPosY = tweened(0, { duration: 2000, easing: cubicInOut });
	const camPosZ = tweened(0, { duration: 2000, easing: cubicInOut });

	const camTargetX = tweened(0, { duration: 1000, easing: cubicInOut });
	const camTargetY = tweened(0, { duration: 1000, easing: cubicInOut });
	const camTargetZ = tweened(0, { duration: 1000, easing: cubicInOut });

	const camOptions = {
		edges: {
			label: 'edges',
			position: { x: 40, y: 40, z: 40 },
			target: { x: 0, y: 0, z: 0 }
		},
		solid: {
			label: 'solid',
			position: { x: 40, y: -40, z: 40 },
			target: { x: 0, y: 0, z: 0 }
		},
		centerededges: {
			label: 'centerededges',
			position: { x: -40, y: -40, z: 40 },
			target: { x: 0, y: 0, z: 0 }
		},
		particles: {
			label: 'particles',
			position: { x: 40, y: -40, z: 40 },
			target: { x: 0, y: 0, z: 0 }
		},
		mess: {
			label: 'mess',
			position: { x: 40, y: 40, z: -40 },
			target: { x: 0, y: 0, z: 0 }
		},
		finalEdges: {
			label: 'finalEdges',
			position: { x: -40, y: -40, z: -40 },
			target: { x: 0, y: 0, z: 0 }
		}
	}

	let rotateY = 0
	
	// let autoRotate = true
	// SC.onFrame(() => {
	// 	if(autoRotate) {
	// 		// rotateY.set($rotateY + 0.01)
	// 		rotateY += 0.01
	// 	}
	// })

	function updateCamera(_current) {
		camTargetX.set(camOptions[_current].target.x)
		camTargetY.set(camOptions[_current].target.y)
		camTargetZ.set(camOptions[_current].target.z)

		camPosX.set(camOptions[_current].position.x)
		camPosY.set(camOptions[_current].position.y)
		camPosZ.set(camOptions[_current].position.z)
	}

	$: updateCamera(current)
</script>

<div id="scene">
	<SC.Canvas
		antialias
		background={new THREE.Color('papayawhip')}
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
			<Swapper rotateY={$rotateY} {current} />
			<DevThings />

		</TroisProvider>
	</SC.Canvas>
</div>

<FieldMarkers show={false} />
<CameraControls {camPosX} {camPosY} {camPosZ} open={false} />

<FloatPad>
	<p>{current}</p>
</FloatPad>

<style>
	#scene {
		position: fixed;
		z-index: -1;
		height: 100%;
		width: 100%;
	}
</style>