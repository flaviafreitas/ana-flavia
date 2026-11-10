<script setup lang="ts">
const { site, footer } = useSiteContent()

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
            {{ footer.description }}
          </p>
          <span class="site-footer__location">{{ site.location }}</span>
        </div>
        <div class="site-footer__column">
          <h2>{{ footer.contactTitle }}</h2>
          <ul>
            <li>
              <a :href="site.phoneUrl">{{ site.phone }}</a>
            </li>
            <li>
              <a :href="`mailto:${site.email}`">{{ site.email }}</a>
            </li>
          </ul>
        </div>
        <div class="site-footer__column">
          <h2>{{ footer.socialTitle }}</h2>
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
            <li>{{ footer.availability }}</li>
          </ul>
        </div>
        <div class="site-footer__column">
          <h2>{{ footer.servicesTitle }}</h2>
          <ul>
            <li v-for="(service, index) in footer.services" :key="index" > {{ service }} </li>
          </ul>
        </div>
      </div>
      <div class="site-footer__bottom">
        <p>© {{ year }} {{ site.name }}. {{ footer.copyright }}</p>
        <p>
          {{ site.registration }}
          <span aria-hidden="true">·</span>
          {{ site.location }}
        </p>
      </div>
    </div>
  </footer>
</template>
