<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";

import MainHeader from "./components/MainHeader.vue";
import MainSidebar from "./components/MainSidebar.vue";

import { nextTick, watch } from "vue";
import hljs from "highlight.js";

watch(useRoute(), () => {
  nextTick(() => {
    document
      .querySelectorAll("pre code:not([data-highlighted])")
      .forEach((elem) => {
        hljs.highlightElement(elem as HTMLElement);
      });
  });
});
</script>

<template>
  <header>
    <MainHeader />
  </header>

  <main class="flex h-full flex-1">
    <MainSidebar />
    <div class="mx-12">
      <RouterView />
    </div>
  </main>
</template>

<style scoped></style>
