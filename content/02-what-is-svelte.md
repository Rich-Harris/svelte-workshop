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

But wait, there's more! Suppose we wanted to wrap `{count}` in a `<strong>` element. In declarative-land, you do exactly that.

```diff
<script>
	let count = 0;
</script>

<button on:click={() => count += 1}>
-	Clicks: {count}
+	Clicks: <strong>{count}</strong>
</button>
```

But if we're doing things imperatively, we need to rewrite a significant chunk of the component.

```diff
function component() {
	let count = 0;

	const button = document.createElement('button');
-	button.textContent = `Clicks: ${count}`;
+	const strong = document.createElement('strong');
+	strong.textContent = count;

+	button.append(
+		document.createTextNode('Clicks: '),
+		strong
+	);

	button.addEventListener('click', () => {
		count += 1;
-		button.textContent = `Clicks: ${count}`;
+		strong.textContent = count;
	});

	return button;
}
```

It's worth spending a moment to internalise that, to understand the incredible value that component frameworks provide.

Traditionally, though, there's an implicit trade-off. The framework provides a better developer experience, but it's a middleman between you and the browser. It introduces inefficiency.


## How is Svelte different?

Svelte began as an experiment to prove that this is a false dichotomy. It is a **compiler** that takes your declarative code and turns it into imperative JavaScript.

Compiler-centric design has a number of tangible advantages:

* Your apps will generally be smaller, because we don't need to cart around a bulky framework runtime that needs to anticipate every possible use case. JavaScript is the most expensive thing on the web, and if we can use less of it our apps launch more quickly
* Your apps will be faster, because we don't need to use costly techniques like re-generating a [virtual DOM](https://svelte.dev/blog/virtual-dom-is-pure-overhead) on every state change. Instead, we can make surgical, granular updates
* Your apps will be easier to write, because we have more control over the authoring experience. We don't have the same constraints other people do

In particular, Svelte allows you to [write less code](https://svelte.dev/blog/write-less-code), which means fewer bugs and more time spent outdoors.


## Who makes it?

You do. I'm serious!

Svelte isn't a project with full-time engineers and corporate funding. It is open source in the truest sense of the word — everyone who works on it does so on a voluntary basis because we believe in the project.

There's a core team of developers who do the bulk of the day to day work, but they're supported by countless others, and every decision we make about the future of the framework is made with the community.

It's an egalitarian, communitarian project that welcomes developers of all backgrounds, with all skill levels, and we'd love for you to be involved.