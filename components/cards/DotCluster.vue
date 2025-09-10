<template>
  <div
    class="size-8 relative overflow-visible cluster"
    :class="{ on: active }"
    :style="{ '--dotColor': color }"
    aria-hidden="true"
  >
    <div class="dot" :class="{ filled: filled >= 1 }" style="--i:0; left:0px;   top:16.5px;"></div>
    <div class="dot" :class="{ filled: filled >= 2 }" style="--i:1; left:11.5px; top:11.5px;"></div>
    <div class="dot" :class="{ filled: filled >= 3 }" style="--i:2; left:23px;  top:6.5px;"></div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  filled?: 1 | 2 | 3
  active?: boolean
  color?: string
}>(), { filled: 1, active: false, color: '#101012' })
</script>

<style scoped>
.cluster{ position:relative }
.dot{
  position:absolute; width:8px; height:8px; border-radius:9999px;
  box-sizing:border-box; border:2px solid var(--dotColor); background:transparent;
  transform-origin: bottom center;
  opacity:0; transform: translateY(8px) scale(.75);
  animation: dot-pop 0.9s cubic-bezier(.2,.8,.2,1) forwards;
  animation-delay: calc(var(--i) * 160ms);
  animation-play-state: paused;
}
.dot.filled{ background: var(--dotColor) }
.cluster.on .dot{ animation-play-state: running }

@keyframes dot-pop{
  0%   { opacity:0; transform: translateY(8px)  scale(.75) }
  60%  { opacity:1; transform: translateY(-3px) scale(1.12) }
  82%  {               transform: translateY(1px)  scale(.98) }
  100% { opacity:1; transform: translateY(0)    scale(1) }
}
@media (prefers-reduced-motion: reduce){
  .dot{ animation:none !important; opacity:1 !important; transform:none !important }
}
</style>
