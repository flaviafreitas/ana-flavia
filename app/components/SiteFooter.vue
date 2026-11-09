<script setup lang="ts">
import { site } from '~/config/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer
    id="contato"
    class="site-footer"
    aria-label="Rodapé e contato"
  >
    <div class="site-shell">
      <div class="site-footer__top">
        <div class="site-footer__intro">
          <SiteBrand
            inverted
            :show-registration="false"
          />
          <p>
            Psicóloga clínica sob abordagem psicanalítica. Acolhimento, respeito e sigilo absoluto.
          </p>
          <span class="site-footer__location">{{ site.location }}</span>
        </div>
        <div class="site-footer__column">
          <h2>Contato</h2>
          <ul>
            <li>
              <a href="tel:+5512996769665">{{ site.phone }}</a>
            </li>
            <li>
              <a :href="`mailto:${site.email}`">{{ site.email }}</a>
            </li>
          </ul>
        </div>
        <div class="site-footer__column">
          <h2>Social</h2>
          <ul>
            <li>
              <a
                :href="site.instagramUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram: @{{ site.instagram }}
                <span class="site-visually-hidden">(abre em nova aba)</span>
              </a>
            </li>
            <li>
              <a
                :href="site.whatsappUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp: {{ site.phone }}
                <span class="site-visually-hidden">(abre em nova aba)</span>
              </a>
            </li>
            <li>Online e presencial</li>
          </ul>
        </div>
        <div class="site-footer__column">
          <h2>Atendimento</h2>
          <ul>
            <li>Crianças</li>
            <li>Adolescentes</li>
            <li>Adultos</li>
          </ul>
        </div>
      </div>
      <div class="site-footer__bottom">
        <p>© {{ year }} {{ site.name }}. Todos os direitos reservados.</p>
        <p>
          {{ site.registration }}
          <span aria-hidden="true">·</span>
          {{ site.location }}
        </p>
      </div>
    </div>
  </footer>
</template>
