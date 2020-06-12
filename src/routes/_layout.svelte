<script context="module">
	export async function preload(page) {
		const res = await this.fetch('toc.json');

		return {
			sections: await res.json()
		};
	}
</script>

<script>
	export let segment;
	export let sections;

	let hash = typeof window !== 'undefined'
		? window.location.hash.slice(1)
		: '';

	$: console.log({ segment, hash });
</script>

<svelte:window on:hashchange={() => hash = window.location.hash.slice(1)}/>

<div class="container">
	<div class="sidebar-container">
		<nav class="sidebar">
			<ul>
				{#each sections as section}
					<li class="section" class:active={segment === section.slug}>
						<a rel="prefetch" href="{section.slug}#">{section.title}</a>

						{#if section.subsections.length}
							<ul>
								{#each section.subsections as subsection}
									<li><a rel="prefetch" href="{section.slug}#{subsection.slug}">{subsection.title}</a></li>
								{/each}
							</ul>
						{/if}
					</li>
				{/each}
			</ul>
		</nav>
	</div>

	<main>
		<slot></slot>
	</main>
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: 400px 1fr;
		min-height: 100vh;
	}

	.sidebar {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		overflow: auto;
		border-right: 1px solid #333;
	}

	main {
		position: relative;
		width: 100%;
		max-width: 56em;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}

	ul {
		margin: 0 0 0.5em 0;
		padding: 0;
		list-style: none;
	}

	li {
		padding: 0;
		font-weight: 700;
	}

	li li {
		padding: 0;
		font-weight: 300;
	}

	a {
		display: block;
		text-decoration: none;
		padding: 0.1em 0 0.1em 1em;
	}

	li li a {
		padding: 0.1em 0 0.1em 2em;
	}

	a:hover {
		background: rgba(255,255,255,0.1);
	}

	.active {
		background-color: #333;
	}
</style>