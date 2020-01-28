# The Sensory Moving Image Archive: Visualization and exploration tool, made with Vue

A web-based visualization and exploration of the similarity of 103,273 shots from 6,969 videos from [Open Images](https://openbeelden.nl/), a Dutch repository for [Creative Commons](https://creativecommons.org/) licensed audiovisual material, made with [Vue](https://vuejs.org/).

__[Explore the Sensory Moving Image Archive](https://bertspaan.nl/semia/)!__

[![](https://github.com/bertspaan/semia/raw/master/public/semia.jpg)](https://bertspaan.nl/semia/)

This project depends on two other repositories:

- [`semia-data`](https://github.com/bertspaan/semia-data): Data, scripts and tools;
- [`semia-api`](https://github.com/bertspaan/semia-api): JSON API for metadata and search, running on [Glitch](https://glitch.com/edit/#!/semia-api).

For more information about this project, see the [About page](https://bertspaan.nl/semia/#/about).

## Inspiration

This website was inspired by and based on two projects by [Brian Foo](https://brianfoo.com/):

1. [Image Collection Visualizer
](https://github.com/amnh-sciviz/image-collection)
2. [NYPL Public Domain visualization](http://publicdomain.nypl.org/pd-visualization/)

## Running locally.

First, install Node.js and npm and clone this repository.

Then, install the dependencies:

    npm install

Run the development server:

    npm run serve

Now, you can access the app on http://localhost:8080/.

See [`.env`](.env) for configuration options and URLs..

## How does it work?

[OpenSeadragon](https://openseadragon.github.io/) is used to show a zoomable grid of video shots clustered by similar color. From this grid, an 2D index is created so the app knows what shot is clicked when the user clicks on the OpenSeadragon canvas. And a search index and video metadata is accessed from a simple JSON API, hosted on [Glitch](https://glitch.com/edit/#!/semia-api). The source code of this API is available on Glitch and on [GitHub](https://github.com/bertspaan/semia-api).

__All scripts and files needed to generate this grid and to run the app and API are available in https://github.com/bertspaan/semia-data.__
