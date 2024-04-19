# WorkAdventure Map Starter Kit

![map](./map.png)

This is a starter kit to help you build your own map for [WorkAdventure](https://workadventu.re).

To understand how to use this starter kit, follow the tutorial at [https://docs.workadventu.re/map-building/tiled-editor/](https://docs.workadventu.re/map-building/tiled-editor/).

## Structure

- _public_: Static files like PDFs or audio files
- _src_: Scripts files
- _tilesets_: All tilesets
- _map.tmj_: Map file
- _map.png_: The map thumbnail displayed on the in-game map information

If you want to use more than one map file, just add the new map file on root or in a folder.

we recommend using 500x500 images for the map thumbnails.

If you are going to create custom websites to embed in the map, please reference the HTML files in the `input` option in _vite.config.js_.

## Requirements

Node.js version >=17

## Installation

With npm installed (comes with [node](https://nodejs.org/en/)), run the following commands into a terminal in the root directory of this project:

```shell
npm install
npm run dev
```

## Test production map

You can test the optimized map as it will be in production:

```sh
npm run build
npm run prod
```

## Licenses

This project contains multiple licenses as follows:

- [Code license](./LICENSE.code) _(all files except those for other licenses)_
- [Map license](./LICENSE.map) _(`map.tmj` and the map visual as well)_
- [Assets license](./LICENSE.assets) _(the files inside the `src/assets/` folder)_

### About third party assets

If you add third party assets in your map, do not forget to:

1. Credit the author and license with the "tilesetCopyright" property present in the properties of each tilesets in the `map.tmj` file
2. Add the license text in LICENSE.assets

Update du readme for le mode upload !!!
