---
title: Building a game
---

Time to move onto the fun stuff. We're going to make a game using data from [cameo.com](http://cameo.com), an amazing website that lets you pay celebrities to record 30 second personalised videos. You can get the Insane Clown Posse to roast your friends or wish your spouse a happy anniversary.

The game is called [CameoParison](https://cameoparison.netlify.app), and the goal is to guess which celebrities are expensive, and which ones are cheap. Since there's no official API, we'll grab data from [cameo-explorer.netlify.app](https://cameo-explorer.netlify.app/celebs), which contains a scraped snapshot of some of the top celebs.

We'll start by cloning the [starter repo](https://github.com/Rich-Harris/cameoparison-starter):

```bash
git clone git@github.com:Rich-Harris/cameoparison-starter.git
```

This is almost identical to the [default project template](https://github.com/sveltejs/template), with the addition of a couple of image files and some extra `src` modules to save time later.

It also has several branches that you can check out if you get stuck following the course and need to get back on track:

* `checkpoint-1`
* `checkpoint-2`
* `checkpoint-3`
* `complete`

As you follow along, make your changes in the `master` branch.


## 1. Roughing out the UI

First, we'll build out the 'welcome' screen and load the celebrity data.

## 2. Basic gameplay

Next, we'll implement the basic gameplay logic.

## 3. Feature complete

A few more tweaks, and the game is playable from start to finish.

## 4. Polish

Finally, we polish the UI up with image preloading, transitions, and CSS tweaks.