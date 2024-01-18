<script setup lang="ts">
import LinkableHeader from '../../components/LinkableHeader.vue';
import ProjectPreview from '../../components/ProjectPreview.vue';
</script>

<template>
  <div>
    <LinkableHeader><h1>Hobbies/Blender</h1></LinkableHeader>
    <p>A while back, I learned to model on Blender just for the sake of it. I'm not an artist but I still managed to get familiar with Blender. I made a few basic projects that deserve to be displayed on this page.</p>
    <LinkableHeader><h2>Projects</h2></LinkableHeader>
    <LinkableHeader><h3>Donut</h3></LinkableHeader>
    <ProjectPreview :tags="['hobbies/blender']">
      <template #preview-content>
        <video autoplay loop muted>
          <source src="/media/blender_donut.mp4"/>
        </video>
      </template>
      <template #preview-content-text>Render of a donut spinning in a loop</template>
      <template #description>If you've ever downloaded Blender, you'd know that the first thing a beginner does is create the famous donut. If, like me, you're mesmerized by the infinite loop, you probably noticed a few imperfections. I did too, but only after rendering (which took 2 hours for a few seconds), so I didn't bother to render again. This is my first project on blender, and also my best one since I didn't pursue 3D modeling very far. I created this model and the animation by following <a href="https://www.youtube.com/@blenderguru">BlenderGuru</a>'s <a href="https://youtu.be/nIoXOplUvAw?si=xvnXfo3NDxh_RI2g">Donut Tutorial</a></template>
    </ProjectPreview>
  </div>
</template>
