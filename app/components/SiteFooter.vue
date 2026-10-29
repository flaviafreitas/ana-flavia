<template>
  <footer :class="$style.footer"><div class="container">© {{ new Date().getFullYear() }} Ana Flavia</div></footer>
</template>
<style module lang="scss">
.footer {
  padding: 2rem 0;
  border-top: 1px solid var(--border);
  color: var(--muted);
  font-size: 0.9rem;
}
</style>
