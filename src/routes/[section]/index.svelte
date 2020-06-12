<script context="module">
	export async function preload({ params, query }) {
		const res = await this.fetch(`${params.section}.json`);

		return {
			section: await res.json()
		};
	}
</script>

<script>
	export let section;
</script>

<svelte:head>
	<title>{section.title}</title>
</svelte:head>

{#if section.slug === 'introduction'}
	<div class="hero">The Svelte workshop</div>
{/if}

<h1>{section.title}</h1>

<div class="content">{@html section.html}</div>

<style>

</style>