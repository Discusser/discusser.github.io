<script setup lang="ts">
defineProps<{
  projectUrl?: string;
  tags?: string[];
}>();
</script>

<template>
  <div class="flex flex-row space-x-4">
    <div class="flex flex-col w-1/2 h-auto">
      <div class="border-color border-2 rounded-lg overflow-hidden row-span-2 [&>*]:w-full">
        <slot name="preview-content"></slot>
      </div>
      <div class="text-center mt-2">
        <slot name="preview-content-text"></slot>
      </div>
    </div>
    <div class="flex flex-col w-2/5">
      <div class="text-justify">
        <slot name="description"></slot>
      </div>
      <div class="mt-auto text-right">
        <div v-if="tags != undefined">
          <p class="inline">Tags: </p>
          <div
            class="inline"
            v-for="(tag, index) in tags"
            :key="'tag' + index.toString()"
          >
            <RouterLink :to="'/' + tag">{{ tag }}</RouterLink>
            <span v-if="tags.length > 1 && index != tags.length - 1"> | </span>
          </div>
        </div>
        <p v-if="projectUrl != undefined">
          Source: <a :href="projectUrl">{{ projectUrl }}</a>
        </p>
      </div>
    </div>
  </div>
</template>
