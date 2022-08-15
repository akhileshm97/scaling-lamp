<script>
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import * as SC from 'svelte-cubed';
	
	import { generateBoxEdges } from '../helpers/objectGenerators.js'

	export let visible = false, opacity = 0, objectColor = 'black'

	let rotateY = 0

	const edgesX = tweened(0, { duration: 1000, easing: cubicInOut	});
	const edgesY = tweened(0, { duration: 1000, easing: cubicInOut	});
	const edgesZ = tweened(0, { duration: 1000, easing: cubicInOut	});
</script>

<!-- <SC.Primitive 
	object={OG.generateBoxPoints({ 
		dimensions: [2, 4, 4] 
	})} 
	position={[20, 10, 10]}
	rotation={[0, rotateY, 0]}
/> -->

{#if visible}
	<SC.Primitive 
		object={generateBoxEdges({ 
			dimensions: [10, 10, 10],
			opacity,
			color: objectColor
		})} 
		position={[$edgesX, $edgesY, $edgesZ]}
		rotation={[0, rotateY, 0]}
	/>
{/if}