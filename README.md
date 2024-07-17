# WorkAdventure Map Starter Kit

![office map thumbnail](./office.png)

This is a starter kit to help you build your own map for [WorkAdventure](https://workadventu.re).

To understand how to use this starter kit, follow the tutorial at [https://docs.workadventu.re/map-building/tiled-editor/](https://docs.workadventu.re/map-building/tiled-editor/).

If you have any questions, feel free to ask in [WorkAdventure office](https://play.staging.workadventu.re/@/tcm/workadventure/wa-village).

## Upload your map

In the .env file you can set your upload strategy to `GH_PAGES` (default) or `MAP_STORAGE`. Simply comment the option you don't want to use.

Uploading a map using [Github Pages](https://docs.github.com/pages) will host your project in the Github servers and it's the most straight forward way to add new maps to your world.

Uploading a map using the [WA map storage](https://docs.workadventu.re/map-building/tiled-editor/publish/wa-hosted) will host your project in the WA servers. It's a bit more difficult to setup but it comes with great advantages like being able to have private repositories.

## Structure

We recommend following this file structure:

* *public/*: Static files like PDFs or audio files
* *src/*: Scripts files or design source files
* *tilesets/*: All PNG tilesets

> **Pro tips**
> If you want to use more than one map file, just add the new map file in the root folder (we recommend creating a copy of *office.tmj* and editing it, in order to avoid any mistakes).
> We recommend using 512x512 images for the map thumbnails.
> If you are going to create custom websites to embed in the map, please reference the HTML files in the `input` option in *vite.config.js*.

## Requirements

Node.js version >=17

## Installation and testing

With npm installed (comes with [node](https://nodejs.org/en/)), run the following commands into a terminal in the root directory of the project:

```shell
npm install
```

Then, you can test your map by running:

```sh
npm run dev
```

You can also test the optimized map as it will be in production by running:

```sh
npm run build
npm run prod
```

You can manually upload your map to the map storage by running:

```sh
npm run deploy
```

## Licenses

This project contains multiple licenses as follows:

* [Code license](./LICENSE.code) *(all files except those for other licenses)*
* [Map license](./LICENSE.map) *(`office.tmj` and the map visual as well)*
* [Assets license](./LICENSE.assets) *(the files inside the `src/assets/` folder)*

### About third party assets

If you add third party assets in your map, do not forget to:

1. Credit the author and license of a tileset with the "tilesetCopyright" property by etiding the tileset in Tiled.
2. Add the tileset license text in *LICENSE.assets*.
3. Credit the author and license of a map with the "mapCopyright" property in the custom properties of the map.
4. Add the map license text in *LICENSE.map*.
