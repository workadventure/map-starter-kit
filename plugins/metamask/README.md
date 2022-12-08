# Metamask Plugin for WorkAdventure Maps
This is simple plugin that enable Work Adventure users to connect
their MetaMask Wallets and sign transactions without leaving the Work Adventure map.

A certain area of the map has to be marked for this functionality to be enabled
Checkout a [short demo of how it works here](https://drive.google.com/file/d/1QaQBIxP3Cua-ClyLVzpYF41zzF_2vk8P/view?usp=sharing)

## How to Use on Work Adventure Map
- Follow [instructions here](https://workadventu.re/map-building/) to install `Tile Editor`
- Open `Tile Editor` and open the `work-adventure` project, then navigate to open `map.json`
- Follow the [openWebsite Property instruction here](https://workadventu.re/map-building/opening-a-website.md), to create an area on map using the rectangle picker tool and set the following `custom properties`
  - openWebsite = plugins/metamask/index.html
  - openWebsiteWidth = 30
  - openWebsiteAllowApi = true
- You may disable other custom scripts on the map by using the file menu, open `Map` tab and `Map Properties`, under custom properties, remove `script = src/main.ts`