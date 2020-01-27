# The Sensory Moving Image Archive

A web-based visualization and exploration of the similarity of 103,273 shots from 6,969 videos from [Open Images](https://openbeelden.nl/), a Dutch repository for [Creative Commons](https://creativecommons.org/) licensed audiovisual material, made with [Vue](https://vuejs.org/).

__Visit the [visualization](https://bertspaan.nl/semia/)!__

For more information about the project, see the [About page](https://bertspaan.nl/semia/#/about).

![](https://github.com/bertspaan/semia/raw/master/public/semia.jpg)

## Running locally.

First, install Node.js and npm and clone this repository.

Then, install the dependencies:

        npm install

Run the development server:

        npm run serve

Now, you can access the app on http://localhost:8080/.

See [`.env`](.env) for configuration options and URLs..

## Data

[OpenSeadragon](https://openseadragon.github.io/) is used to show a zoomable grid of video shots clustered by similar color. From this grid, an 2D index is created so the app knows what shot is clicked when the user clicks on the Openseadragon canvas.

Scripts and files needed to generate this grid are available in the [`semia-data`](https://github.com/bertspaan/semia-data) GitHub repository.

A search index and video metadata is accessed from a simple JSON API, hosted on [Glitch](https://glitch.com/edit/#!/semia-api). The source code of this API is available on Glitch and on [GitHub](https://github.com/bertspaan/semia-api).
