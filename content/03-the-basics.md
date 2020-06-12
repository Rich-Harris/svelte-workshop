---
title: The basics
---

We're going to go through the entire Svelte tutorial. By the end of it, you'll understand what Svelte can do, and how to write Svelte components.

* https://svelte.dev/tutorial


## Compilers 101

While we're here, let's briefly talk about how the compiler works, and what the output looks like. You don't need to understand this stuff to be productive with Svelte, but it's good to have some basic familiarity with the process.

All compilers do some version of the following steps:

* Parsing — generating an **abstract syntax tree** from your source code
* Transformation — generating a new AST that represents the output
* Code generation — turning the new AST back into code

Svelte implements its own markup parser, and embeds [Acorn](https://github.com/acornjs/acorn) and [CSSTree](https://github.com/csstree/csstree) for parsing JavaScript and CSS. You can see the result of the parse step using [AST Explorer](https://astexplorer.net/) — change the language family to `HTML` (the menu next to `Snippet`), and the language to `svelte` (the menu next to that).

For example the AST for this component...

```svelte
<script>
	let name = 'world';
</script>

<h1>Hello {name}!</h1>
```

...looks like this:

```js
{
	"html": {
		"type": "Fragment",
		"children": [
			{ "type": "Text", "raw": "\n\n", "data": "\n\n" },
			{
				"type": "Element",
				"name": "h1",
				"attributes": [],
				"children": [
					{ "type": "Text", "raw": "Hello ", "data": "Hello " },
					{
						"type": "MustacheTag",
						"expression": { "type": "Identifier", "name": "name" }
					},
					{ "type": "Text", "raw": "!", "data": "!" }
				]
			}
		]
	},
	"instance": {
		"type": "Script",
		"context": "default",
		"content": {
			"type": "Program",
			"body": [
				{
					"type": "VariableDeclaration",
					"declarations": [
						{
							"type": "VariableDeclarator",
							"id": { "type": "Identifier", "name": "name" },
							"init": { "type": "Literal", "value": "world", "raw": "'world'" }
						}
					],
					"kind": "let"
				}
			],
			"sourceType": "module"
		}
	}
}
```

Svelte walks, or **traverses** this data structure, to find information out about the component — for example, which variables are exported as props, which variables need to be instrumented to make them reactive, which CSS selectors are used by the markup, whether we're using features like transitions, and so on.

Once it has this clear picture of what the component is doing, it passes the AST to one of two transformers, depending on whether we're generating client-side or server-side code.

The result of that process is a pure JavaScript AST, which we finally turn back into JavaScript, and the original CSS string with some light modifications. Both come with sourcemaps for easy debugging.


## Reading the output

Look at this input into the [REPL](https://svelte.dev/repl/172fb72d4d6243c88bdd58ce03a89ce7?version=3.23.2). Click on 'JS Output'.

```svelte
<script>
	export let a = 1;
	export let b = 2;
</script>

<p>{a} + {b} = {a + b}</p>
```

You can see how in the `p` method (which stands for uPdate — I know...) the compiler is able to selectively update text nodes based on whether `a` has changed, `b` has changed, or in the case of `{a + b}` whether *either* `a` or `b` has changed, using **bitwise operators**. It looks like overkill for a simple example like this, but this granular change-checking is how Svelte is able to avoid re-rendering entire components when state changes.