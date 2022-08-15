<script>
// @ts-nocheck

	import { onMount } from 'svelte';

	import Scene from "$lib/Scene.svelte";
	import Hero from "$lib/components/Hero.svelte";
	import Section1 from "$lib/components/Section1.svelte";
	import Section2 from "$lib/components/Section2.svelte";
	import Section3 from "$lib/components/Section3.svelte";
	import Section4 from "$lib/components/Section4.svelte";
	import Section5 from "$lib/components/Section5.svelte";

	import { loading } from '$lib/stores.js';

	const stateMap = {
		hero: 'edges',
		section1: 'solid',
		section2: 'centerededges',
		section3: 'particles',
		section4: 'mess',
		section5: 'finalEdges'
	}

	let current = 'edges'

	onMount(() => {
		loading.set(false)
		const sections = document.querySelectorAll('.content-section')

		const ioCallback = (entries) => {
		  entries.forEach(entry => {
				if (entry.isIntersecting) {
		      current = stateMap[entry.target.id]
				}
		  });
		}

		const ioOptions = {
			threshold: 0.6
		}

		const setDetails = (target) => {
			const io = new IntersectionObserver(ioCallback, ioOptions);
			io.observe(target)
		}

		sections.forEach(setDetails)
	})
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div 
	class="page-container"
	aria-describedby="progress-bar" 
	aria-hidden={$loading ? 'true' : 'false'}
> 
	<Scene {current} />

	<div class="content" class:show={!$loading}>
		<Hero />
		<Section1 />
		<Section2 />
		<Section3 />
		<Section4 />
		<Section5 />
	</div>
</div>

<style>
	.page-container {
		position: relative;
		height: 100vh;
		/*overscroll-behavior: contain;*/
	}
	.content {
		scroll-snap-type: y mandatory;
		height: 100%;
		overflow-y: auto;
		visibility: hidden;
		opacity: 0;
		transition: visibility 0.5s, opacity 0.5s;
	}
	.content.show {
		visibility: visible;
		opacity: 1;
	}
	:global(.content > *) {
		scroll-snap-align: start;
	}
	:global(.highlight) {
		outline: 4px solid black;
		outline-offset: -10px;
	}
</style>