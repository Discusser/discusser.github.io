<script setup lang="ts">
import LinkableHeader from '../components/LinkableHeader.vue';
</script>

<template>
  <div>
    <LinkableHeader id="about-me"><h1>About me</h1></LinkableHeader>
    <p>I'm a person who enjoys programming and working out. I also like maths and physics, especially when I can use them to program something that looks cool. At the moment of writing this (2024), I'm still in high school and I plan on studying computer science later on.</p>
    <p>You can learn more about my projects on the <RouterLink to="/programming">Programming</RouterLink> page.</p>
    <LinkableHeader id="github"><h2>GitHub</h2></LinkableHeader>
    <p>If you're interested in seeing all of my publicly available projects, you can take a look at my <a href="https://github.com/Discusser">GitHub page</a>. I will try to maintain my profile with new projects that could prove to be useful for other people.</p>
    <LinkableHeader id="contact-me"><h2>Contact me</h2></LinkableHeader>
    <p>If you're looking to contact me for whatever reason, you can send me a message on Discord (@discusser) or via mail at <a href="mailto:discussercodes@gmail.com">discussercodes@gmail.com</a></p>
  </div>
</template>
