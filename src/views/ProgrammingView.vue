<script setup lang="ts">
import LinkableHeader from "../components/LinkableHeader.vue"
import ProjectPreview from "../components/ProjectPreview.vue";
</script>

<template>
  <div>
    <LinkableHeader id="programming"><h1>Programming</h1></LinkableHeader>
    <p>
      I started programming many years ago, when I was still a kid, with
      JavaScript and Python. It took me a while to make programming a habit and
      start producing decent code, and now it's all I do. I've learned many
      different languages, such as JavaScript for some basic web development,
      Python for simple scripts, or Java for developping mods for Minecraft.
      Recently, I've also gotten familiar with C/C++ just for the sake of it,
      and I learned Dart to create a mobile application for the final project of
      the Harvard CS50 course. I also have some basic knowledge in Rust, Lua,
      Bash, and a few other negligible languages.
    </p>
    <LinkableHeader id="notable-projects"><h2>Notable projects</h2></LinkableHeader>
    <LinkableHeader id="workout-app"><h3>Workout App</h3></LinkableHeader>
    <ProjectPreview project-url="https://github.com/Discusser/workout_app" :tags="['programming/mobile']">
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
          Workout Tracker is an app that allows you to, as the name indicates,
          track your workouts. However, it's not only limited to that. In
          reality, it's a tool that provides many different useful functions
          related to working out.
        </p>
        <p>
          This project was submitted to Harvard's CS50 course as the final
          project, meaning it is not maintained. This was a great learning
          experience for me because I got to use a new language, with a new
          toolkit, targetting a new platform. However, I wouldn't do it again
          because mobile development is not very enjoyable for me.
        </p>
      </template>
    </ProjectPreview>
    <LinkableHeader id="math-parser"><h3>Math Parser</h3></LinkableHeader>
    <ProjectPreview projectUrl="https://github.com/Discusser/math-parser" :tags="['programming/web']">
      <template #preview-content>
        <img src="/media/graphing_calculator.png" alt="Graphing calculator" />
      </template>
      <template #preview-content-text
        >A rudimentary graphing calculator made with the math parser</template
      >
      <template #description
        ><p>
          Math parser is a typescript library that allows you to calculate
          mathematical expressions from strings. You can use the builtin
          javascript math functions, constants, and even custom functions in
          your expressions. The performance is not very great and it does have
          some bugs, so I wouldn't recommend you use it. However, it made me
          learn a lot of things, especially about
          <a href="https://en.wikipedia.org/wiki/Reverse_Polish_notation"
            >Reverse Polish Notation</a
          >
          and the
          <a href="https://en.wikipedia.org/wiki/Shunting_yard_algorithm"
            >Shunting Yard Algorithm</a
          >
        </p></template
      >
    </ProjectPreview>
    <LinkableHeader id="sxhkdrofi"><h3>SxhkdRofi</h3></LinkableHeader>
    <ProjectPreview projectUrl="https://github.com/Discusser/SxhkdRofi" :tags="['programming/cpp']">
      <template #preview-content>
        <img src="/media/sxhkdrofi.png" alt="SxhkdRofi" />
      </template>
      <template #preview-content-text>
        The window created by Rofi when using SxhkdRofi
      </template>
      <template #description>
        <p>
          While the name might look like gibberish, you probably know what it
          means if you're familiar with bspwm (another gibberish name which is
          an abbreviation for a window manager). This program simply reads all
          keybindings from the <code>sxhkdrc</code> file (or a user specified
          file) and outputs them indiviually in a format that can be understood
          by Rofi.
        </p>
      </template>
    </ProjectPreview>
  </div>
</template>
