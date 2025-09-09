<template>
  <footer ref="root" class="relative overflow-hidden bg-[#F7F8FA] text-[#101012]">
    <!-- верхняя зона -->
    <div class="relative">
      <!-- центр-лого: обёртка задаёт позицию, IMG — только анимация -->
      <div
        class="center-logo-wrap pointer-events-none select-none absolute z-0
               left-1/2 top-[45%] -translate-x-1/4 -translate-y-1/2
               sm:top-[54%]
               md:left-[50%] md:top-[50%] md:-translate-x-1/2 md:-translate-y-1/2"
      >
        <img
          :src="centerLogo"
          alt=""
          class="center-logo-img w-[220px] sm:w-[300px] md:w-[380px] lg:w-[420px]"
          :class="{ on: inView }"
        />
      </div>

      <!-- контент -->
      <div class="container mx-auto px-4 md:px-8 py-12 md:py-20 relative z-10">
        <!-- заголовок с типингом -->
        <h2
          class="text-[28px] sm:text-[36px] md:text-[48px] leading-[1.05] tracking-[-0.02em] font-medium not-italic mb-8 sm:mb-10"
          aria-label="Остались вопросы? Мы ответим!"
        >
          <span class="type-line">
            <template v-for="(ch,i) in titleChars" :key="i">
              <br v-if="ch === '\n' && i < typedCount" />
              <span
                v-else
                class="letter"
                :class="{ on: i < typedCount, space: ch === ' ' }"
              >{{ ch }}</span>
            </template>
          </span>
        </h2>

        <!-- 2 колонки -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <!-- ЛЕВО: контакты -->
          <div class="space-y-5 text-[15px] leading-6">
            <div class="dream-in" :class="{ on: inView }" style="--d:60ms">
              <div class="flex items-center gap-2 text-zinc-500">
                <span class="text-base">🇬🇧</span>
                <span>United Kingdom, London</span>
              </div>
              <div class="mt-1 flex items-center gap-2 text-zinc-500">
                <span class="inline-block h-2 w-2 rounded-full bg-[#2E7BFF]"></span>
                <span>«Hammersmith»</span>
              </div>
              <p class="mt-1">Text1</p>
              <p class="mt-1">Text2</p>
            </div>

            <div class="pt-2 dream-in" :class="{ on: inView }" style="--d:140ms">
              <div class="flex items-center gap-2 text-zinc-500">
                <span class="text-base">🇷🇺</span>
                <span>Russia, Moscow</span>
              </div>
              <div class="mt-1 flex items-center gap-2 text-zinc-500">
                <span class="inline-block h-2 w-2 rounded-full bg-[#00C853]"></span>
                <span>«Delovoy Tsentr»</span>
              </div>
              <p class="mt-1">Text3</p>
              <div class="mt-1 flex items-center gap-2 text-zinc-500">
                <span class="inline-block h-2 w-2 rounded-full bg-[#FFD600]"></span>
                <span>«Ploshad Ilyicha»</span>
              </div>
              <p class="mt-1">Text4</p>
            </div>

            <div class="pt-2 dream-in" :class="{ on: inView }" style="--d:200ms">
              <p class="font-medium tracking-wide">+7 999 999 99 99</p>
              <div class="mt-3">
                <div class="text-zinc-500 text-sm">Email</div>
                <a href="mailto:design@mail.ru" class="underline-offset-4 hover:underline">
                  design@mail.ru
                </a>
              </div>
            </div>
          </div>

          <!-- ПРАВО: линк-колонки (справа на десктопе) -->
          <div class="flex flex-col gap-6 lg:justify-self-end lg:text-right w-[55%]">
            <div class="dream-in" :class="{ on: inView }" style="--d:100ms">
              <div class="text-zinc-500 text-xs mb-2">For professionals</div>
              <ul class="flex flex-wrap gap-x-4 gap-y-2 justify-start lg:justify-end">
                <li><a class="footer-link" href="#">Merch</a></li>
                <li><a class="footer-link" href="#">Vacancies</a></li>
                <li><a class="footer-link" href="#">Vacancies</a></li>
                <li><a class="footer-link" href="#">Vacancies</a></li>
              </ul>
            </div>
            <div class="dream-in" :class="{ on: inView }" style="--d:160ms">
              <div class="text-zinc-500 text-xs mb-2">For customers</div>
              <ul class="flex flex-wrap gap-x-4 gap-y-2 justify-start lg:justify-end">
                <li><a class="footer-link" href="#">Designcast</a></li>
                <li><a class="footer-link" href="#">Team</a></li>
                <li><a class="footer-link" href="#">Projects</a></li>
                <li><a class="footer-link" href="#">Principles</a></li>
              </ul>
            </div>
            <div class="dream-in" :class="{ on: inView }" style="--d:220ms">
              <div class="text-zinc-500 text-xs mb-2">Services</div>
              <ul class="flex flex-wrap gap-x-4 gap-y-2 justify-start lg:justify-end">
                <li><a class="footer-link" href="#">Marketing</a></li>
                <li><a class="footer-link" href="#">Branding</a></li>
                <li><a class="footer-link" href="#">Graphics</a></li>
                <li><a class="footer-link" href="#">Nocode</a></li>
                <li><a class="footer-link" href="#">UX/UI</a></li>
                <li><a class="footer-link" href="#">Mobile apps</a></li>
                <li><a class="footer-link" href="#">Sites</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div> <!-- /container -->
    </div>

    <!-- нижняя полоса -->
    <div class="border-t border-zinc-200/60">
      <div class="container mx-auto px-4 md:px-8 py-6">
        <div class="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
          <!-- слева -->
          <div class="justify-self-start fade-up" :class="{ on: inView }" style="--d:60ms">
            <a href="/" class="flex items-center gap-2">
              <img :src="logoMono" alt="Labpics" class="h-6 w-auto" />
              <span class="font-medium sr-only">Labpics</span>
            </a>
          </div>

          <!-- центр -->
          <div class="justify-self-center fade-up" :class="{ on: inView }" style="--d:120ms">
            <div class="flex items-center gap-3 text-sm">
              <span>Excellent</span>
              <div class="flex items-center gap-1">
                <span class="tp-star" v-for="n in 5" :key="n" :style="{'--i': n}"></span>
              </div>
              <span class="inline-flex items-center gap-1">
                Trustpilot
              </span>
            </div>
          </div>

          <!-- справа -->
          <div class="justify-self-start sm:justify-self-end">
            <div class="flex items-center gap-3 fade-up" :class="{ on: inView }" style="--d:180ms">
              <a :href="tgHref" class="social" aria-label="Telegram">
                <img :src="socialTg" alt="Telegram" class="object-contain" />
              </a>
              <a :href="waHref" class="social" aria-label="WhatsApp">
                <img :src="socialWa" alt="WhatsApp" class="object-contain" />
              </a>
              <a :href="igHref" class="social" aria-label="Instagram">
                <img :src="socialIg" alt="Instagram" class="object-contain" />
              </a>
              <a :href="bhHref" class="social" aria-label="Behance">
                <img :src="socialBh" alt="Behance" class="object-contain" />
              </a>
              <a :href="dbHref" class="social" aria-label="Dribbble">
                <img :src="socialDb" alt="Dribbble" class="object-contain" />
              </a>
            </div>
          </div>
        </div>

        <!-- копирайт -->
        <div class="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-500 fade-up" :class="{ on: inView }" style="--d:240ms">
          <span>© Created by, 2025</span>
          <span>•</span>
          <a href="#" class="hover:underline">Cookie Policy</a>
          <span>•</span>
          <a href="#" class="hover:underline">Privacy Policy</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

/* нижний логотип */
import logoMono from '@/assets/icons/Logo Mono.svg'
/* центральное лого (водяной знак) */
import centerLogo from '@/assets/icons/center-logo.png'
/* соц. иконки — твои файлы */
import socialTg from '@/assets/social/telegram.svg'
import socialWa from '@/assets/social/whatsapp.svg'
import socialIg from '@/assets/social/instagram.svg'
import socialBh from '@/assets/social/behance.svg'
import socialDb from '@/assets/social/dribbble.svg'

/* ссылки */
const tgHref = 'https://t.me/username'
const waHref = 'https://wa.me/79999999999'
const igHref = 'https://instagram.com/username'
const bhHref = 'https://www.behance.net/username'
const dbHref = 'https://dribbble.com/username'

/* анимации при входе и типинг */
const root = ref<HTMLElement|null>(null)
const inView = ref(false)
let io: IntersectionObserver | null = null

const title = 'Остались вопросы?\nМы ответим!'
const titleChars = Array.from(title)
const typedCount = ref(0)
function typeNext() {
  if (typedCount.value < titleChars.length) {
    const ch = titleChars[typedCount.value]
    if (ch === '\n' || ch === ' ') { typedCount.value++; typeNext(); return }
    typedCount.value++
    const base = 30 + Math.random() * 48
    window.setTimeout(typeNext, base)
  }
}

onMounted(() => {
  if (!root.value || !('IntersectionObserver' in window)) {
    inView.value = true; typeNext(); return
  }
  io = new IntersectionObserver(
    (entries) => {
      if (entries.some(e => e.isIntersecting)) {
        inView.value = true
        typeNext()
        io?.disconnect()
      }
    },
    { threshold: 0.15 }
  )
  io.observe(root.value)
})
onBeforeUnmount(() => io?.disconnect())
</script>

<style scoped>
.container { max-width: 1144px; }

/* ===== типинг (сонный) ===== */
.type-line { white-space: pre-wrap; }
.letter{
  display:inline-block;
  opacity:0;
  transform: translateY(12px) scale(.985);
  filter: blur(8px);
  will-change: transform, filter, opacity;
}
.letter.space{ width:.35em; opacity:1; transform:none; filter:none; }
.letter.on{
  animation: dream-in .7s cubic-bezier(.2,.8,.2,1) forwards;
}
@keyframes dream-in{
  0%   { opacity:0; filter:blur(8px); transform:translateY(12px) scale(.985) }
  65%  { opacity:1; filter:blur(0);   transform:translateY(-2px) scale(1.01) }
  100% { opacity:1; filter:blur(0);   transform:translateY(0)    scale(1) }
}

/* ===== плавные появления ===== */
.dream-in{
  opacity:0; transform: translateY(12px); filter: blur(6px);
  transition: opacity .65s cubic-bezier(.2,.8,.2,1) var(--d,0ms),
             transform .65s cubic-bezier(.2,.8,.2,1) var(--d,0ms),
             filter .6s ease var(--d,0ms);
}
.dream-in.on{ opacity:1; transform: translateY(0); filter: blur(0); }

.fade-up{
  opacity:0; transform: translateY(8px);
  transition: opacity .5s ease var(--d,0ms), transform .5s ease var(--d,0ms);
}
.fade-up.on{ opacity:1; transform: translateY(0); }

/* ===== центр-лого (двухслойная схема) ===== */
.center-logo-wrap{
  filter: drop-shadow(0 18px 40px rgba(0,0,0,.08));
}
.center-logo-img{
  opacity: 0;
  transform: translateY(-10px) scale(.97);
  will-change: transform, opacity;
}
.center-logo-img.on{
  animation:
    logo-in 0.9s cubic-bezier(.2,.8,.2,1) forwards,
    logo-float 6.5s ease-in-out 1s infinite alternate;
}
@keyframes logo-in{
  0%   { opacity:0; transform: translateY(-10px) scale(.97); }
  100% { opacity:.9; transform: translateY(0)     scale(1);   }
}
@keyframes logo-float{
  0%   { transform: translateY(0)    scale(1);    }
  50%  { transform: translateY(-6px) scale(1.005);}
  100% { transform: translateY(2px)  scale(1);    }
}

/* ===== ссылка-меню ===== */
.footer-link{
  display:inline-block;
  opacity:.85;
  transition:opacity .15s ease, transform .15s ease;
}
.footer-link:hover{ opacity:1; transform:translateY(-1px); }

/* Trustpilot */
.tp-star{
  display:inline-block; width:18px; height:18px;
  clip-path: polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);
  background:#00B67A;
  transform: scale(.8);
  opacity:.8;
  animation: star-pop .5s cubic-bezier(.2,.8,.2,1) both;
  animation-delay: calc(80ms * var(--i));
}
@keyframes star-pop{
  0%{ transform: scale(.6); opacity:0 }
  60%{ transform: scale(1.1); opacity:1 }
  100%{ transform: scale(1); opacity:1 }
}
.tp-badge{ width:10px; height:10px; border-radius:2px; background:#00B67A; display:inline-block; }

/* соцкнопки */
.social{
  display:grid; place-items:center;
  width:44px; height:44px; border-radius:9999px;
  background:#fff; box-shadow:0 1px 2px rgba(0,0,0,.06);
  transition: transform .15s ease, box-shadow .15s ease;
  position: relative; overflow: hidden;
}
.social img{ width:20px; height:20px }
.social::after{
  content:''; position:absolute; inset:-2px;
  background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,.35) 35%, transparent 65%);
  transform: translateX(-140%) skewX(-20deg);
  transition: transform .8s ease;
}
.social:hover{ transform: translateY(-2px); box-shadow:0 8px 22px rgba(0,0,0,.1) }
.social:hover::after{ transform: translateX(140%) skewX(-20deg); }

/* мелкие адаптивные штрихи */
@media (max-width: 480px){
  .center-logo-img{ width:200px }
}
@media (prefers-reduced-motion: reduce){
  .center-logo-img{ opacity:.9 !important; transform:none !important; animation:none !important; }
  .dream-in, .fade-up{ transition:none !important; opacity:1 !important; transform:none !important; }
  .letter{ opacity:1 !important; transform:none !important; filter:none !important; animation:none !important; }
}
</style>
