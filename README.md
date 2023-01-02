# WorkAdventure Map Starter Kit

![map](./maps/map.png)

This is a starter kit to help you build your own map for [WorkAdventure](https://workadventu.re).

To understand how to use this starter kit, follow the tutorial at [https://workadventu.re/map-building](https://workadventu.re/map-building).

## Structure
* *maps*: Map files
    * *map.(json/tmj)*: Map file
    * *map.png*: The map thumbnail displayed on the in-game map information
* *public*: Static files like PDFs
* *src*: Source files like scripts or PSDs. 
* *tilesets*: All tilesets

If you want to use more than one map file, just add the new map file in the /maps folder.

If you are going to create custom websites to embed in the map, please reference the HTML files in the `input` option in *vite.config.js*.

## Requirements

Node.js version >=16

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
npm run preview
```

## Licenses

This project contains multiple licenses as follows:

* [Code license](./LICENSE.code) *(all files except those for other licenses)*
* [Map license](./LICENSE.map) *(`map.json` and the map visual as well)*
* [Assets license](./LICENSE.assets) *(the files inside the `src/assets/` folder)*

### About third party assets

If you add third party assets in your map, do not forget to:
1. Credit the author and license with the "tilesetCopyright" property present in the properties of each tilesets in the `map.json` file
2. Add the license text in LICENSE.assets
