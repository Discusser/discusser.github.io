<script setup lang="ts">
const props = defineProps<{
  id: string;
}>();
</script>

<template>
  <div class="flex items-center">
    <div class="absolute -ml-9">
      <div class="text-center leading-[100%]">
        <a
          :href="'#' + props.id"
          class="flex items-center justify-center text-xl w-8 h-8 rounded-md"
          >#</a
        >
      </div>
    </div>
    <div ref="slotContainer" :id="props.id">
      <slot></slot>
    </div>
  </div>
</template>
