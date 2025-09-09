<template>
  <footer class="relative overflow-hidden bg-Backgrounds-Neutral-Secondary text-[#101012] bg-[#F7F8FA]">
    <!-- ВЕРХНЯЯ ЗОНА (relative: сюда ставим центр-лого по абсолюту) -->
    <div class="relative">
      <!-- центр-лого: обычная картинка, всегда видна, НЕ участвует в потоке -->
      <img
        :src="centerLogo"
        alt=""
        aria-hidden="true"
        class="pointer-events-none select-none
               absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/4
               w-[320px] md:w-[420px] lg:w-[420px]
               [filter:drop-shadow(0_18px_40px_rgba(0,0,0,.08))] z-0"
      />

      <!-- Контент поверх лого -->
      <div class="container mx-auto px-4 md:px-8 py-12 md:py-20 relative z-10">
        <!-- Заголовок ВСЕГДА СВЕРХУ ОТДЕЛЬНО -->
        <h2 class="text-[34px] sm:text-[44px] md:text-[56px] leading-[1.05] tracking-[-0.02em] font-medium mb-8">
          Остались вопросы?<br />Мы ответим!
        </h2>

        <!-- Ниже: 2 колонки (моб. — одна) -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <!-- ЛЕВАЯ: контакты -->
          <div class="space-y-5 text-[15px] leading-6">
            <!-- UK -->
            <div>
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

            <!-- RU -->
            <div class="pt-2">
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

            <div class="pt-2">
              <p class="font-medium tracking-wide">+7 999 999 99 99</p>
              <div class="mt-3">
                <div class="text-zinc-500 text-sm">Email</div>
                <a href="mailto:design@mail.ru" class="underline-offset-4 hover:underline">
                  design@mail.ru
                </a>
              </div>
            </div>
          </div>

          <!-- ПРАВАЯ: заголовок секции + пункты в ОДНУ строку, выравнивание вправо -->
          <div class="flex flex-col gap-4 lg:justify-self-end lg:text-right w-[60%]">
            <div>
              <div class="text-zinc-500 text-xs mb-2">For professionals</div>
              <ul class="flex flex-wrap gap-x-4 gap-y-2 justify-end">
                <li><a class="footer-link" href="#">Merch</a></li>
                <li><a class="footer-link" href="#">Vacancies</a></li>
                <li><a class="footer-link" href="#">Vacancies</a></li>
                <li><a class="footer-link" href="#">Vacancies</a></li>
              </ul>
            </div>
            <div>
              <div class="text-zinc-500 text-xs mb-2">For customers</div>
              <ul class="flex flex-wrap gap-x-4 gap-y-2 justify-end">
                <li><a class="footer-link" href="#">Designcast</a></li>
                <li><a class="footer-link" href="#">Team</a></li>
                <li><a class="footer-link" href="#">Projects</a></li>
                <li><a class="footer-link" href="#">Principles</a></li>
              </ul>
            </div>
            <div>
              <div class="text-zinc-500 text-xs mb-2">Services</div>
              <ul class="flex flex-wrap gap-x-4 gap-y-2 justify-end">
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
      </div>
    </div>

    <!-- ПОЛОСА: логотип / trustpilot / соцсети -->
    <div class="border-t border-zinc-200/60">
      <div class="container mx-auto px-4 md:px-8 py-6">
        <div class="grid grid-cols-3 items-center">
          <!-- слева: логотип -->
          <div class="justify-self-start">
            <a href="/" class="flex items-center gap-2">
              <img :src="logoMono" alt="Labpics" class="h-6 w-auto" />
              <span class="font-medium"></span>
            </a>
          </div>

          <!-- центр: Trustpilot -->
          <div class="justify-self-center">
            <div class="flex items-center gap-3 text-sm">
              <span>Excellent</span>
              <div class="flex items-center gap-1">
                <span class="tp-star" v-for="n in 5" :key="n"></span>
              </div>
              <span class="inline-flex items-center gap-1">
                <span class="tp-badge"></span>
                Trustpilot
              </span>
            </div>
          </div>

          <!-- справа: ВАШИ файлы иконок соцсетей (явные импорты ниже) -->
          <div class="justify-self-end">
            <div class="flex items-center gap-3">
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

        <!-- нижняя строка — по центру -->
        <div class="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-500">
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
/* ЛОГО слева (в нижней полосе) */
import logoMono from '@/assets/icons/Logo Mono.svg'

/* ЦЕНТРАЛЬНОЕ ЛОГО (водяной знак) — укажите свой файл: */
import centerLogo from '@/assets/icons/center-logo.png'

/* ВАШИ ФАЙЛЫ ИКОНок СОЦСЕТЕЙ — положите их в /assets/social/ и обновите пути при необходимости */
import socialTg from '@/assets/social/telegram.svg'
import socialWa from '@/assets/social/whatsapp.svg'
import socialIg from '@/assets/social/instagram.svg'
import socialBh from '@/assets/social/behance.svg'
import socialDb from '@/assets/social/dribbble.svg'

/* Линки соцсетей — правьте на свои */
const tgHref = 'https://t.me/username'
const waHref = 'https://wa.me/79999999999'
const igHref = 'https://instagram.com/username'
const bhHref = 'https://www.behance.net/username'
const dbHref = 'https://dribbble.com/username'
</script>

<style scoped>
.container { max-width: 1144px; }

.footer-link{
  display:inline-block;
  opacity:.85;
  transition:opacity .15s ease, transform .15s ease;
}
.footer-link:hover{ opacity:1; transform:translateY(-1px); }

.tp-star{
  display:inline-block; width:18px; height:18px;
  clip-path: polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);
  background:#00B67A;
}
.tp-badge{ width:10px; height:10px; border-radius:2px; background:#00B67A; display:inline-block; }

.social{
  display:grid; place-items:center;
  width:46px; height:46px; border-radius:9999px;
  transition:transform .15s ease, box-shadow .15s ease, opacity .2s;
}
.social:hover{ transform:translateY(-1px); box-shadow:0 6px 18px rgba(0,0,0,.08); }
</style>
