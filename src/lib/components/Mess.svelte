<script>
import { onMount } from 'svelte';

	import * as SC from 'svelte-cubed';

	import { generateSphereEdges } from '../helpers/objectGenerators.js'

	export let visible = false, opacity = 0, objectColor = 'black', animDuration = 0

	let radius = 8, autoRotate = false, rotateY = 0, position

	SC.onFrame(() => {
		if(autoRotate)
		rotateY += 0.01
	})

	onMount(() => {
		setTimeout(() => autoRotate = true, animDuration)
	})
</script>

{#if visible}
	<SC.Primitive 
		object={generateSphereEdges({ 
			radius, 
			segments: { w: 15, h: 10 }, 
			size: 0.1,
			color: objectColor,
			opacity
		})} 
		rotation={[0, rotateY, 0]}
	/>
{/if}