<template>
  <div class="size-8 relative overflow-hidden" aria-hidden="true">
    <!-- левый -->
    <div
      class="size-2 left-0 top-[16.50px] absolute rounded-full"
      :class="filled >= 1 ? 'bg-[#007AFF]' : 'border-2 border-[#007AFF]'"
    />
    <!-- центр -->
    <div
      class="size-2 left-[11.50px] top-[11.50px] absolute rounded-full"
      :class="filled >= 2 ? 'bg-[#007AFF]' : 'border-2 border-[#007AFF]'"
    />
    <!-- правый -->
    <div
      class="size-2 left-[23px] top-[6.50px] absolute rounded-full"
      :class="filled >= 3 ? 'bg-[#007AFF]' : 'border-2 border-[#007AFF]'"
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ filled?: 1 | 2 | 3 }>(), { filled: 1 })
</script>
