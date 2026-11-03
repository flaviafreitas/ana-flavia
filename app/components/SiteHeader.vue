<template>
  <header class="site-header">
    <div :class="['container', 'site-header__inner']">
      <NuxtLink
        class="site-header__logo"
        to="/"
      >
        Ana Flavia
      </NuxtLink>
      <nav aria-label="Navegação principal">
        <NuxtLink to="/">Início</NuxtLink>
        <NuxtLink to="/blog">Blog</NuxtLink>
      </nav>
    </div>
  </header>
</template>
