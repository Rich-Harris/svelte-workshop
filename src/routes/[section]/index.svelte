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

{#if section.next}
	<p class="next">Next: <a href="{section.next.slug}#">{section.next.title}</a></p>
{/if}

<style>
	.hero {

	}

	.next {
		padding: 1em 0;
		border-top: 1px solid var(--gray);
	}
</style>