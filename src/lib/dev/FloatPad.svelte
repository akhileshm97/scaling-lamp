<script>
	export let position = 'top-center', theme = 'dark'
</script>

<section class={`${position} ${theme} flow float-pad`}>
	<slot></slot>
</section>

<style>
	section {
		position: absolute;
		z-index: 10;
		color: var(--text-color);
		background-color: var(--bg-color);
		font-family: monospace;
		padding: 1rem;
		width: fit-content;
		transition: transform 0.5s cubic-bezier(.77,0,.18,1);
	}
	section.top-left {
		top: 0;
		left: 0;
	}
	section.top-right {
		top: 0;
		right: 0;
	}
	section.top-center {
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	}
	section.bottom-left {
		bottom: 0;
		left: 0;
	}
	section.bottom-right {
		bottom: 0;
		right: 0;
	}
	section.bottom-center {
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
	}
	section.light {
		--text-color: black;
		--bg-color: white;
	}
	section.dark {
		--text-color: white;
		--bg-color: black;
	}

	:global(.float-pad.light > *) {
		--text-color: #333333;
		--bg-color: #cccccc;
	}
	:global(.float-pad.dark > *) {
		--text-color: #cccccc;
		--bg-color: #333333;
	}
</style>