<script setup lang="ts">
import LinkableHeader from "../../components/LinkableHeader.vue";
import ProjectPreview from "@/components/ProjectPreview.vue";
</script>

<template>
  <div>
    <LinkableHeader id="programming-python"><h1>Programming/Python</h1></LinkableHeader>
    <p>
      As you may know, Python is great as a scripting language, meaning you
      should avoid having projects made entirely in Python. I've made a few
      different programs with Python, notably on my calculator. I recently
      bought a programmable calculator for school, and I quickly realised that
      it has a Python app, though the libraries are very limited. My most
      important project scraped images from a URL and create a video out of
      them, though I've unfortunately lost the source code to it.
    </p>
    <LinkableHeader id="projects"><h2>Projects</h2></LinkableHeader>
    <LinkableHeader id="bouncing-squares"><h3>Bouncing Squares</h3></LinkableHeader>
    <ProjectPreview :tags="['programming/python']">
      <template #preview-content> 
        <video controls class="aspect-video">
          <source src="/media/calculator_squares.mov"/>
        </video>
      </template>
      <template #preview-content-text>A demonstration of the program</template>
      <template #description>The program in itself is quite simple, I just decided to make it because I had some free time during class. I ended up adding some more features later on, but the principle is the same. Programming on a calculator can be quite challenging, because I have to type with an alphabetical keyboard layout, on a tiny screen, with limited libraries, and no LSP (only some basic autocompletion). Other than matplotlib, which is designed for graphing functions, the only library that lets you draw things on the screen is kandinsky, which exposes a whopping five functions: <code>get_pixel</code>, <code>set_pixel</code>, <code>color</code>, <code>draw_string</code>, and <code>fill_rect</code>. It quickly becomes obvious that you are provided with the bare minimum, meaning as soon as you want to draw something semi-complicated such as a diagonal line, you have to write your own implementation (turns out drawing a diagonal line is harder than you'd expect). Now that my rant is over, I'd still say that it's very fun to make things on my calculator, because my friends think I'm a magician when I show them.</template>
    </ProjectPreview>
  </div>
</template>
