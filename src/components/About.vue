<template>
  <section class="text">
    <h3>About this website</h3>
    <p>
      This website visualizes the similarity of 103,273 shots from 6,969 videos from <a href="https://openbeelden.nl/">Open Images</a>, a Dutch repository for <a href="https://creativecommons.org/">Creative Commons</a> licensed audiovisual material.
    </p>

    <p>
      It was made by <a href="https://bertspaan.nl/">Bert Spaan</a> and commisioned by the <a href="https://sensorymovingimagearchive.humanities.uva.nl/">Sensory Moving Image Archive</a> (SEMIA) project, a collaboration between the following organizations:
    </p>

    <ul>
      <li>
        <a href="https://www.uva.nl/en">University of Amsterdam</a>
      </li>
      <li>
        <a href="https://www.amsterdamuas.com/">Amsterdam University of Applied Sciences</a>
      </li>
      <li>
        <a href="https://www.beeldengeluid.nl/en">Netherlands Institute for Sound and Vision</a>
      </li>
      <li>
        <a href="http://www.studiolouter.nl/">Studio Louter</a>
      </li>
      <li>
        <a href="https://www.eyefilm.nl/en">EYE Filmmuseum</a>
      </li>
    </ul>

    <p>
      From the <a href="https://sensorymovingimagearchive.humanities.uva.nl/index.php/about/">SEMIA website</a>:
    </p>

    <blockquote cite="https://sensorymovingimagearchive.humanities.uva.nl/index.php/about/">
      The use of sensory features, combined with possibilities for explorative browsing, would
      provide a boost to the practice of those users who seek to creatively repurpose
      collections: artists, the creative industries, but also researchers.
      The SEMIA project’s objective is to establish how these groups can explore, navigate
      and repurpose a specific subset of heritage objects – moving images – by using
      tools for the analysis (software) and visualization (interfaces) of visual features and relations.
    </blockquote>

    <p>
      <a href="https://nanne.github.io/">Nanne van Noord</a>, computer science researcher at the University of Amsterdam used computer vision and machine learning to analyze all videos on <a href="https://openbeelden.nl/">Open Images</a>. With a <a href="https://en.wikipedia.org/wiki/Shot_transition_detection">shot transition detection</a> algorithm, he first divided the videos into 103,273 shots. For each of these shots, all frames were analyzed and four properties were computed:
    </p>

    <ol>
      <li><img class="icon" alt="Color" src="../assets/colour.svg" /> <strong>Color</strong>: the most prominent color in a shot;</li>
      <li><img class="icon" alt="Shape" src="../assets/shape.svg" /> <strong>Shape</strong>: the numerical output of a shape detecting neural network;</li>
      <li><img class="icon" alt="Movement" src="../assets/movement.svg" /> <strong>Movement</strong>: the direction of the most prominent movement;</li>
      <li><img class="icon" alt="Clutter" src="../assets/clutter.svg" /> <strong>Clutter</strong>: the visual complexity of a shot.</li>
    </ol>

    <p>
      From all these parameters per shot, the <a href="https://en.wikipedia.org/wiki/T-distributed_stochastic_neighbor_embedding">t-distributed Stochastic Neighbor Embedding</a> (t-SNE) algorithm was used to create two-dimensional visualizations of the similarity between all shots. This website visualizes the t-SNE based on the shot’s color property.
    </p>

    <h3>Using this website</h3>
    <p>
      Move around and zoom in and out until you find a shot you want to watch! Click <img class="icon" alt="Play" src="../assets/play-circle.svg" /> Play to start playing a video, <img class="icon" alt="Volume" src="../assets/volume.svg" />/<img class="icon" alt="Volume" src="../assets/volume-x.svg" /> to turn sound off and on, and <img class="icon" alt="Full screen" src="../assets/maximize.svg" /> to play the video in full screen. To view more information about a video, click <img class="icon" alt="Info" src="../assets/info.svg" /> next to the title.
    </p>
    <p>
      Use the
      <ol class="shots">
        <li style="width: 20%;"><a><div class="shot-position" style="width: 100%;"></div></a></li>
        <li style="width: 35%;"><a><div class="shot-position" style="width: 100%;"></div></a></li>
        <li style="width: 15%;"><a><div class="shot-position" style="width: 100%;"></div></a></li>
        <li style="width: 8%;"><a><div class="shot-position" style="width: 100%;"></div></a></li>
      </ol> timeline to navigate between the individual shots of which the video is composed. For each shot, the five most similar shots are shown, using the four properties mentioned above: <img class="icon" alt="Color" src="../assets/colour.svg" /> color, <img class="icon" alt="Shape" src="../assets/shape.svg" /> shape, <img class="icon" alt="Movement" src="../assets/movement.svg" /> movement and <img class="icon" alt="Clutter" src="../assets/clutter.svg" /> clutter. Click the property icon to compare shots using a different property.
    </p>

    <h3>Data &amp; source code</h3>

    <p>
      This website was inspired by my former co-worker <a href="https://brianfoo.com/">Brian Foo</a>’s <a href="https://amnh-sciviz.github.io/image-collection/">visualization of 13,212 digitized images</a> of the American Museum of Natural History’s photo collection. Pieces of Brian Foo’s code where used to generate an image grid from t-SNE data.
    </p>
    <p>
      All source code and data used in this project is available on <a href="https://github.com/bertspaan/semia">GitHub</a>.
    </p>

    <p>
      The search index and video metadata are accessed using an API running on <a href="https://glitch.com/edit/#!/semia-api?path=server.js:154:26">Glitch</a>.</p>
  </section>
</template>
<script>

export default {

}
</script>

<style scoped>
blockquote {
  font-style: italic;
  border-left-color: rgb(255, 217, 0);
  border-left-style: solid;
  padding-left: 1em;
  margin-left: 0;
}

.shots {
  width: 150px;
  display: inline-flex;
}
</style>
