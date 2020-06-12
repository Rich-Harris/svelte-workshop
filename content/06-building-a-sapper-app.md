---
title: Building a Sapper app
---

In the final section of the workshop, we'll take a tour of [Sapper](https://sapper.svelte.dev), and look through the code for an example app, [Birdland](https://birdland.now.sh). The code for Birdland is [available on GitHub](https://github.com/rich-harris/birdland).

## What is Sapper?

If Svelte is a component framework, Sapper is an **application** framework. Sapper is to Svelte as [Next.js](https://nextjs.org/) is to React.

It's the Svelte team's attempt to answer the question 'how do you build a fully-featured application?' It features server-side rendering, code-splitting, filesystem-based routing, and lots of other good stuff.

Many sites built with Sapper can be 'exported' as static files, à la [Jamstack](https://jamstack.org/). Others, like Birdland, need to do dynamic server-side rendering. Sapper supports both, so you can use it as a static site generator without worrying that you'll outgrow it as your requirements change.