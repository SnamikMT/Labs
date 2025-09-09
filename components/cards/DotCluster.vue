<template>
  <div
    class="size-8 relative overflow-visible cluster"
    :class="{ on: active }"
    :style="{ '--dotColor': color }"
    aria-hidden="true"
  >
    <!-- левый -->
    <div
      class="dot size-2 absolute rounded-full"
      :class="{ filled: filled >= 1 }"
      style="--i:0; left:0px; top:16.5px;"
    />
    <!-- центр -->
    <div
      class="dot size-2 absolute rounded-full"
      :class="{ filled: filled >= 2 }"
      style="--i:1; left:11.5px; top:11.5px;"
    />
    <!-- правый -->
    <div
      class="dot size-2 absolute rounded-full"
      :class="{ filled: filled >= 3 }"
      style="--i:2; left:23px; top:6.5px;"
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    filled?: 1 | 2 | 3
    /** запуск анимации (например, когда секция во вьюпорте) */
    active?: boolean
    /** цвет точек (по умолчанию #101012; можно поставить #007AFF) */
    color?: string
  }>(),
  { filled: 1, active: false, color: '#101012' }
)
</script>

<style scoped>
/* Контейнер кластера */
.cluster{}

/* Точки — чёткие границы, без блюра и скейла */
.dot{
  box-sizing: border-box;
  background: transparent;
  border: 2px solid var(--dotColor);
  border-radius: 9999px;

  /* старт: чуть ниже и прозрачные */
  opacity: 0;
  transform: translateY(8px);

  /* мягкое медленное проявление по очереди */
  animation: fadeUp .9s cubic-bezier(.22,.8,.2,1) forwards;
  animation-delay: calc(var(--i) * 160ms);
  animation-play-state: paused;

  will-change: transform, opacity;
}

/* Закрашенная точка */
.dot.filled{
  background: var(--dotColor);
  border-color: var(--dotColor);
}

/* Включаем анимацию, когда active=true */
.cluster.on .dot{
  animation-play-state: running;
}

@keyframes fadeUp{
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* reduce motion */
@media (prefers-reduced-motion: reduce){
  .dot{ animation: none !important; opacity: 1 !important; transform: none !important; }
}
</style>
