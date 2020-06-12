---
title: What is Svelte?
---

There's a lot of different ways to describe Svelte, but let's start with this: Svelte is a **component framework**. In other words, it serves a similar purpose to projects like React and Vue.

## What is a framework?

Component frameworks exist to help you write apps more **declaratively**. That word gets used a lot, so it's helpful to understand what we mean when we say that.

This declarative code...

```svelte
<script>
	let count = 0;
</script>

<button on:click={() => count += 1}>
	Clicks: {count}
</button>
```

...is equivalent to this **imperative code**:

```js
function component() {
	let count = 0;

	const button = document.createElement('button');
	button.textContent = `Clicks: ${count}`;

	button.addEventListener('click', () => {
		count += 1;
		button.textContent = `Clicks: ${count}`;
	});

	return button;
}
```

In the imperative version, we're telling the browser what to do. In the declarative version, we're simply saying what outcome we want. It's a lot easier to read and write, and there's no duplication.

```diff
<script>
	let count = 0;
</script>

<button on:click={() => count += 1}>
-	Clicks: {count}
+	Clicks: <strong>{count}</strong>
</button>
```


## How is Svelte different?


## Why compilers?


## Who makes it?