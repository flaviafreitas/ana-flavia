<template>
  <header :class="$style.header">
    <div :class="['container', $style.inner]">
      <NuxtLink :class="$style.logo" to="/">Ana Flavia</NuxtLink>
      <nav aria-label="Navegação principal">
        <NuxtLink to="/">Início</NuxtLink>
        <NuxtLink to="/blog">Blog</NuxtLink>
      </nav>
    </div>
  </header>
</template>
<style module lang="scss">
.header {
  position: sticky;
  z-index: 10;
  top: 0;
  border-bottom: 1px solid var(--border);
  background: color-mix(in srgb, var(--background) 92%, transparent);
  backdrop-filter: blur(12px);
}

.inner {
  display: flex;
  min-height: 72px;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  nav { display: flex; flex-wrap: wrap; gap: 1.25rem; }
  nav a { color: var(--muted); font-size: 0.92rem; }
  nav a:hover { color: var(--foreground); }
}

.logo { font-weight: 800; }

@media (max-width: 640px) {
  .inner { align-items: flex-start; flex-direction: column; gap: 0.75rem; padding-block: 1rem; }
}
</style>
