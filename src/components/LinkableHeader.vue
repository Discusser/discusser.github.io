<script setup lang="ts">
import { ref, onMounted, useSlots, type Ref } from "vue";
import { useRoute } from "vue-router";

const anchor: Ref<HTMLAnchorElement | null> = ref(null);
const slotContainer: Ref<HTMLSlotElement | null> = ref(null);

onMounted(() => {
  const slot = useSlots().default!()[0];
  const route = useRoute();
  let text = slot.children as string;
  if (text != null) {
    text = text.toLowerCase();
    text = text.replace(new RegExp("\\s", "g"), "-");
    text = encodeURI(text);
    anchor.value!.href = route.path + "#" + text;
    slotContainer.value!.id = text;
  }
});
</script>

<template>
  <div class="flex items-center">
    <div class="absolute -ml-9">
      <div class="text-center leading-[100%]">
        <a
          ref="anchor"
          class="flex items-center justify-center text-xl w-8 h-8 rounded-md"
          >#</a
        >
      </div>
    </div>
    <div ref="slotContainer">
      <slot></slot>
    </div>
  </div>
</template>
