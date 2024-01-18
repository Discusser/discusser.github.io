<script setup lang="ts">
import LinkableHeader from "../../components/LinkableHeader.vue";
import ProjectPreview from "@/components/ProjectPreview.vue";
</script>

<template>
  <div>
    <LinkableHeader><h1>Programming/Mobile</h1></LinkableHeader>
    <p>Mobile development is quite a foreign subject for me, mainly because I do all my programming on my computer, therefore it would make sense for all my projects to be made for computers. Thanks to an android emulator and <a href="https://flutter.dev/">Flutter</a>, I was able to build an application made for mobile phones. For the moment, this is my only experience in mobile development and I probably won't do it again.</p>
    <LinkableHeader><h2>Projects</h2></LinkableHeader>
    <LinkableHeader><h3>Workout App</h3></LinkableHeader>
    <ProjectPreview
      project-url="https://github.com/Discusser/workout_app"
      :tags="['programming/mobile']"
    >
      <template #preview-content>
        <iframe
          class="aspect-video"
          src="https://www.youtube.com/embed/gym7kOmIqTA?si=TWpdkFFSrR4rItBB"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </template>
      <template #preview-content-text
        >Video demonstrating the features of the application</template
      >
      <template #description
        ><p>
          Perhaps one of my most time consuming projects at the time of writing this, Workout Tracker is an app that allows you to, as the name indicates,
          track your workouts. However, it's not only limited to that. In
          reality, it's a tool that provides many different useful functions
          related to working out. I'm quite proud of this application because, even if the UI is not very well polished, it was a challenge for me because I had to learn a new language (Dart), use it with a new toolkit (Flutter) that targets a new platform (Mobile). It was a totally different experience from what I'm used to, and I came to the conclusion that it wasn't really for me. However, I still think it was worth it because I learned a lot in the process.
        </p>
        <p>
          This project was submitted to Harvard's CS50 course as the final
          project, meaning it is not maintained.
        </p>
      </template>
    </ProjectPreview>
  </div>
</template>
