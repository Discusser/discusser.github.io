<script setup lang="ts">
import LinkableHeader from "../../components/LinkableHeader.vue";
import ProjectPreview from "@/components/ProjectPreview.vue";
</script>

<template>
  <div>
    <LinkableHeader id="programming-web"><h1>Programming/Web</h1></LinkableHeader>
    <p>
      I'm not really into web development. The website you're currently on is probably the best thing I've made if we
      don't count projects that rely very heavily on JavaScript.
    </p>
    <LinkableHeader id="projects"><h2>Projects</h2></LinkableHeader>
    <LinkableHeader id="epicycles"><h3>Epicycles</h3></LinkableHeader>
    <ProjectPreview :tags="['programming/web']">
      <template #preview-content>
        <img src="/media/epicycles.png" alt="Epicycles" />
      </template>
      <template #preview-content-text>An example of what can be created with this program</template>
      <template #description
        ><p>You can try this project <a href="/assets/projects/epicycles/">here</a>.</p>
        <p>
          I got the idea of making this after seeing
          <a href="https://en.wikipedia.org/wiki/Johannes_Kepler">Kepler</a>'s explanation of orbits with
          <a href="https://en.wikipedia.org/wiki/Deferent_and_epicycle">epicycles</a>. Despite being wrong, he was not
          too far off, because it turns out that real orbits are quite similar, but instead of being circular, they are
          elliptical. Either way, I still wanted to make this myself, because you get cool shapes, especially when you
          add more and more circles. If you played around with the program a bit, you might notice that the concept is similar to drawing with <a href="https://en.wikipedia.org/wiki/Fourier_series">Fourier series</a>, as that uses epicycles aswell, but in a more coordinated and calculated manner.
        </p></template
      >
    </ProjectPreview>
  </div>
</template>
