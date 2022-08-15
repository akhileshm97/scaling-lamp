<script>
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';

	import { devThings } from '$lib/dev/store.js'
</script>

{#if $devThings.showXYPlane}
	<SC.Mesh
		geometry={new THREE.PlaneGeometry($devThings.size, $devThings.size)}
		material={new THREE.MeshLambertMaterial({ color: 'steelblue', side: THREE.DoubleSide })}
		rotation={[0, 0, 0]}
	/>
{/if}

{#if $devThings.showYZPlane}
	<SC.Mesh
		geometry={new THREE.PlaneGeometry($devThings.size, $devThings.size)}
		material={new THREE.MeshLambertMaterial({ color: 'steelblue', side: THREE.DoubleSide })}
		rotation={[0, Math.PI / 2, 0]}
	/>
{/if}

{#if $devThings.showZXPlane}
	<SC.Mesh
		geometry={new THREE.PlaneGeometry($devThings.size, $devThings.size)}
		material={new THREE.MeshLambertMaterial({ color: 'steelblue', side: THREE.DoubleSide })}
		rotation={[Math.PI / 2, 0, 0]}
	/>
{/if}

<!-- 	<SC.Mesh
	geometry={new THREE.CylinderGeometry(1, 1, 10, 16)}
	material={new THREE.MeshLambertMaterial({ color: 'brown' })}
	rotation={[0, 0, 0]}
	position={[0, 0.01, 0]}
/> -->

{#if $devThings.showOrigin}
	<SC.Mesh
		geometry={new THREE.SphereGeometry(0.2)}
		material={new THREE.MeshLambertMaterial({ color: 'black', wireframe: true })}
		rotation={[0, 0, 0]}
		position={[0, 0.01, 0]}
	/>
{/if}
