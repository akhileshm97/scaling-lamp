<script>
	import { onMount } from 'svelte';

	import { devThings } from '$lib/dev/store.js'

	export let open = false, size = 20, show = true

	const updateThing = (thing) => {
		devThings.update((prev) => ({ ...prev, ...thing}))
	}

	let showXYPlane = show
	let showYZPlane = show
	let showZXPlane = show
	let showOrigin = true

	$: { updateThing({ showXYPlane }) }
	$: { updateThing({ showYZPlane }) }
	$: { updateThing({ showZXPlane }) }
	$: { updateThing({ showOrigin }) }
	$: { updateThing({ size }) }

	onMount(() => {
		devThings.set({ showXYPlane, showYZPlane, showZXPlane, showOrigin, size })
	})
</script>

<section class="flow" class:open>
	<button 
		type="button" 
		class="toggler"
		on:click={() => open = !open}
	>
		<span aria-hidden="true" class="toggler-icon">&#9001;</span>
	</button>

	<h2>Field Markers</h2>

	<div class="flow">
		<div>
			<label for="showXYPlane">showXYPlane </label>
			<input type="checkbox" bind:checked={showXYPlane} id="showXYPlane" />
		</div>
		<div>
			<label for="showYZPlane">showYZPlane </label>
			<input type="checkbox" bind:checked={showYZPlane} id="showYZPlane" />
		</div>
		<div>
			<label for="showZXPlane">showZXPlane </label>
			<input type="checkbox" bind:checked={showZXPlane} id="showZXPlane" />
		</div>
		<div>
			<label for="showOrigin">showOrigin </label>
			<input type="checkbox" bind:checked={showOrigin} id="showOrigin" />
		</div>
		<div>
			<label for="size">Plane Size </label>
			<input type="number" bind:value={size} id="size" />
		</div>
	</div>
</section>

<style>
	section {
		--flow-space: 0.5rem;

		position: absolute;
		top: 3rem;
		right: 0;
		color: white;
		background-color: black;
		text-align: center;
		padding: 1rem;
		transform: translateX(100%);
		transition: transform 0.5s cubic-bezier(.77,0,.18,1);
	}
	section.open {
		transform: translateX(0);
	}

	h2 {
		font-size: 1.25rem;
	}

	button {
		display: block;
		color: white;
		background-color: darkslateblue;
		padding: 0.5em 1em;
		border: none;
		margin-left: auto;
		margin-right: auto;
	}

	.toggler {
		position: absolute;
		top: 0;
		right: 100%;
		color: white;
		background-color: black;
		border: 2px solid #333333;
	}
	.toggler-icon {
		display: inline-block;
		transition: transform 0.5s cubic-bezier(.77,0,.18,1);
	}
	section.open .toggler-icon {
		transform: rotate(0.5turn);
	}

	input {
		max-width: 10ch;
	}
</style>