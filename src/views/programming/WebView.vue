<script setup lang="ts">
import LinkableHeader from "../../components/LinkableHeader.vue";
import ProjectPreview from "@/components/ProjectPreview.vue";
</script>

<template>
  <div>
    <LinkableHeader id="programming-web"><h1>Programming/Web</h1></LinkableHeader>
    <p>
      I'm not really into web development. The website you're currently on is probably the best thing I've made if we
      don't count projects that rely very heavily on JavaScript. At the moment of writing this, I am following a course
      called <a href="https://www.theodinproject.com/">The Odin Project</a>. I keep track of all my progress on GitHub,
      you can check out my page for that course <a href="https://discusser.is-a.dev/TheOdinProject/">here</a>
    </p>
    <LinkableHeader id="projects"><h2>Projects</h2></LinkableHeader>
    <LinkableHeader id="epicycles"><h3>Epicycles</h3></LinkableHeader>
    <ProjectPreview :tags="['programming/web']">
      <template #preview-content>
        <img src="/media/epicycles.png" alt="Epicycles" />
      </template>
      <template #preview-content-text>An example of what can be created with this program</template>
      <template #description
        ><p>
          <strong>You can try this project <a href="/projects/epicycles/">here</a>.</strong>
        </p>
        <p>
          I got the idea of making this after seeing
          <a href="https://en.wikipedia.org/wiki/Johannes_Kepler">Kepler</a>'s explanation of orbits with
          <a href="https://en.wikipedia.org/wiki/Deferent_and_epicycle">epicycles</a>. Despite being wrong, he was not
          too far off, because it turns out that real orbits are quite similar, but instead of being circular, they are
          elliptical. Either way, I still wanted to make this myself, because you get cool shapes, especially when you
          add more and more circles. If you played around with the program a bit, you might notice that the concept is
          similar to drawing with <a href="https://en.wikipedia.org/wiki/Fourier_series">Fourier series</a>, as that
          uses epicycles aswell, but in a more coordinated and calculated manner.
        </p></template
      >
    </ProjectPreview>
    <ProjectPreview :tags="['programming/web']">
      <template #preview-content>
        <video controls>
          <source src="/media/game_of_life.mp4" />
        </video>
      </template>
      <template #preview-content-text>An example of what can be done in the game of life</template>
      <template #description>
        <p>
          <strong>You can try this project <a href="/projects/game-of-life/">here</a>.</strong>
        </p>
        <p>
          This project is based off
          <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Conway's Game of Life</a>. I ddecided to make
          it because it's really cool, and you get very nice patterns after a bit of trial and error. That's about it.
        </p>
      </template>
    </ProjectPreview>
  </div>
</template>
