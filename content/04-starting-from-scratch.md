---
title: Starting from scratch
---

You can build apps inside the [Svelte REPL](https://svelte.dev/repl), but at some point you'll want to develop in your local environment.

The easiest way is to use [degit](https://github.com/Rich-Harris/degit), a git-based scaffolding tool...

```bash
mkdir my-project
cd my-project
npx degit sveltejs/template
```

...but it's helpful to understand how things work under the hood, so we're going to create a project from nothing.

Create a new folder and add a `src` folder inside:

```bash
mkdir my-project
cd my-project

mkdir src
```


## Installing Rollup

As of June 2020, the default template uses [Rollup](http://rollupjs.org) as its module bundler, though there is also an official [webpack loader](https://github.com/sveltejs/svelte-loader) and a plethora of third party integrations for Parcel, Snowpack, Vite and everything else you might want to use. Install Rollup...

```bash
npm i -D rollup
```

...and create a `rollup.config.js` file:

```js
export default {
	input: 'src/main.js',
	output: {
		file: 'public/build/bundle.js',
		format: 'esm',
		sourcemap: true
	}
};
```

Now we need to create that `src/main.js` entry point. We'll also create a test module to import, so you can see what Rollup does:

```bash
echo "import hello from './hello.js';

hello();" > src/main.js

echo "export default () => {
	console.log('hello!');
}" > src/hello.js
```

Run Rollup with the config file...

```bash
npx rollup -c
```

...and look at the `public/build/bundle.js` file:

```js
var hello = () => {
	console.log('hello!');
};

hello();
//# sourceMappingURL=bundle.js.map
```

Now we just need to add a `public/index.html` file to load the bundle...

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset='utf-8'>
	<meta name='viewport' content='width=device-width,initial-scale=1'>

	<title>My app</title>

	<script type="module" src='/build/bundle.js'></script>
</head>
<body>
	Open the console!
</body>
</html>
```

...and serve it on [localhost:5000](http://localhost:5000):

```bash
npm i -D serve
npx serve public
```


## Adding plugins

That's cool, but not very Sveltey. We need to teach Rollup what to do when it encounters a Svelte file. We do that with **plugins**. Specifically, in addition to Svelte itself, we need two:

* [rollup-plugin-svelte](https://www.npmjs.com/package/rollup-plugin-svelte)
* [@rollup/plugin-node-resolve](https://www.npmjs.com/package/@rollup/plugin-node-resolve) — teaches Rollup how to find stuff in `node_modules`

Install those...

```bash
npm i -D svelte rollup-plugin-svelte @rollup/plugin-node-resolve
```

...and add them to your config:

```diff
+import resolve from '@rollup/plugin-node-resolve';
+import svelte from 'rollup-plugin-svelte';

export default {
	input: 'src/main.js',
	output: {
		file: 'public/build/bundle.js',
		format: 'esm',
		sourcemap: true
-	}
+	},
+	plugins: [
+		resolve(),
+		svelte({
+			css: result => result.write('public/bundle/bundle.css')
+		})
+	]
};
```

Now we can add a Svelte component. Create `App.svelte`...

```svelte
<script>
	export let name;
</script>

<h1>Hello {name}!</h1>

<style>
	h1 {
		font-family: 'Comic Sans MS';
	}
</style>
```

...and instantiate it from `main.js`:

```js
import App from './App.svelte';

new App({
	target: document.body,
	props: {
		name: 'world'
	}
});
```

The last thing we need to do is add a link to the new `bundle.css` file in `index.html`:

```diff
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset='utf-8'>
	<meta name='viewport' content='width=device-width,initial-scale=1'>

	<title>My app</title>

+	<link rel="stylesheet" href="/build/bundle.css">
	<script type="module" src='/build/bundle.js'></script>
</head>
<body>
-	Open the console!
</body>
</html>
```

Now when we run Rollup, it will include your compiled Svelte component in the JavaScript bundle. Try running `npx serve again`.

The official project template is slightly fancier — it has livereload and a development server built in, for example — but that's basically all there is to it.