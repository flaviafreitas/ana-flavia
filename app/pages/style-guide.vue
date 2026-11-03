<script lang="ts" src="~/scripts/style-guide.ts"></script>

<template>
  <div class="style-guide">
    <a
      href="#conteudo"
      class="style-guide-skip"
    >
      Pular para o conteúdo
    </a>
    <aside class="style-guide-sidebar">
      <NuxtLink
        to="/"
        class="style-guide-brand"
      >
        Ana Flávia
        <span>IDENTIDADE DIGITAL</span>
      </NuxtLink>
      <div class="style-guide-nav-label">
        STYLE GUIDE
        <span>01</span>
      </div>
      <nav aria-label="Seções do style guide">
        <a
          v-for="(section, index) in sections"
          :key="section.id"
          :href="`#${section.id}`"
        >
          <span>0{{ index + 1 }}</span>
          {{ section.label }}
          <span class="style-guide-nav-arrow">↗</span>
        </a>
      </nav>
      <div class="style-guide-side-footer">
        <span class="style-guide-dot"></span>
        Uma base para crescer.
        <p>
          Design com acolhimento.
          <br />
          Construído para reutilizar.
        </p>
        <NuxtLink to="/">Voltar ao site ↗</NuxtLink>
      </div>
    </aside>

    <main
      id="conteudo"
      class="style-guide-main"
    >
      <header class="style-guide-topbar">
        <span>SISTEMA VISUAL / FUNDAMENTOS</span>
        <UiBadge tone="outline">Versão 1.0</UiBadge>
      </header>
      <section class="style-guide-hero">
        <div class="style-guide-hero-intro">
          <UiBadge tone="soft">A essência em cada detalhe</UiBadge>
          <span
            class="style-guide-hero-star"
            aria-hidden="true"
          >
            ✳
          </span>
        </div>
        <h1>
          Uma identidade que
          <br />
          <em>acolhe.</em>
          Uma base
          <br />
          que conecta.
        </h1>
        <div class="style-guide-hero-bottom">
          <p>
            Cores, palavras e formas trabalhando juntas.
            <br />
            Nosso ponto de partida para criar experiências
            <br class="style-guide-desktop-break" />
            consistentes, humanas e cheias de cuidado.
          </p>
          <a
            href="#cores"
            class="style-guide-explore"
          >
            Explore o guia
            <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div
          class="style-guide-palette-ribbon"
          aria-label="Paleta da marca"
        >
          <span
            v-for="color in colors.slice(0, 6)"
            :key="color.token"
            :class="guideClass(color.token.slice(2))"
          ></span>
        </div>
      </section>

      <section
        id="cores"
        class="style-guide-section"
      >
        <UiSectionHeading
          eyebrow="01 / Fundamentos"
          title="Cores que conversam."
          description="Uma paleta leve e acolhedora. O azul transmite confiança; os tons claros dão espaço para respirar. Clique em uma cor para copiar sua variável."
        />
        <div class="style-guide-color-grid">
          <button
            v-for="color in colors"
            :key="color.token"
            type="button"
            class="style-guide-color-card"
            :aria-label="`Copiar variável ${color.token}, ${colorValue(color.token)}`"
            @click="copy(color.token)"
          >
            <span
              :class="[
                'style-guide-swatch',
                guideClass(color.token.slice(2)),
                !color.dark && 'style-guide-light-text',
              ]"
            >
              <span>{{ colorValue(color.token) }}</span>
              <span aria-hidden="true">↗</span>
            </span>
            <span class="style-guide-color-name">{{ color.name }}</span>
            <span class="style-guide-color-role">{{ color.role }}</span>
            <code>{{ color.token }}</code>
          </button>
        </div>
        <div class="style-guide-semantic">
          <div>
            <UiBadge tone="outline">Uso semântico</UiBadge>
            <h3>Escolha pela função.</h3>
            <p>
              Nos componentes, prefira tokens que dizem para que a cor serve. Assim, a identidade
              pode evoluir de um só lugar.
            </p>
          </div>
          <dl>
            <div
              v-for="pair in semanticColors"
              :key="pair[0]"
            >
              <dt>
                <code>{{ pair[0] }}</code>
              </dt>
              <dd>{{ pair[1] }}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        id="tipografia"
        class="style-guide-section"
      >
        <UiSectionHeading
          eyebrow="02 / Tipografia"
          title="Personalidade no título. Clareza na leitura."
          description="Fraunces traz expressão e proximidade aos títulos e à assinatura da marca. Manrope mantém a leitura leve nos textos e na interface. A escala usa rem: base de 16px no desktop, 15px até 1150px e 14px até 800px, respeitando a preferência de fonte do navegador."
        />
        <div class="style-guide-font-grid">
          <div class="style-guide-font-display">
            <span>01 / EXPRESSÃO</span>
            <strong>Aa</strong>
            <h3>Fraunces</h3>
            <p>
              Serifada, orgânica, com presença.
              <br />
              Pesos 700 e 900 · títulos
            </p>
          </div>
          <div class="style-guide-font-body">
            <span>02 / CLAREZA</span>
            <strong>Aa</strong>
            <h3>Manrope</h3>
            <p>
              Contemporânea, aberta, legível.
              <br />
              Pesos 400 a 700 · textos e interface
            </p>
          </div>
        </div>
        <div class="style-guide-type-scale">
          <div
            v-for="type in typeScale"
            :key="type.name"
            class="style-guide-type-row"
          >
            <div class="style-guide-type-meta">
              <strong>{{ type.name }}</strong>
              <span>{{ type.family }}</span>
              <span>{{ type.size }} rem</span>
              <code>{{ type.token }}</code>
            </div>
            <p :class="guideClass(type.class)">{{ type.sample }}</p>
          </div>
        </div>
      </section>

      <section
        id="botoes"
        class="style-guide-section"
      >
        <UiSectionHeading
          eyebrow="03 / Ações"
          title="Um convite para o próximo passo."
          description="Formas arredondadas, rótulos diretos e estados claros. Passe o mouse, navegue com Tab e experimente os tamanhos."
        />
        <div class="style-guide-button-table">
          <div class="style-guide-table-header">
            <span>VARIANTE</span>
            <span>PADRÃO</span>
            <span>DESABILITADO</span>
            <span>CARREGANDO</span>
          </div>
          <div
            v-for="variant in variants"
            :key="variant"
            class="style-guide-button-row"
          >
            <strong>{{ variantNames[variant] }}</strong>
            <UiButton
              :variant="variant"
              @click="feedback = 'Ação de exemplo executada.'"
            >
              Agendar consulta
            </UiButton>
            <UiButton
              :variant="variant"
              disabled
            >
              Agendar consulta
            </UiButton>
            <UiButton
              :variant="variant"
              loading
            >
              Agendando
            </UiButton>
          </div>
        </div>
        <p class="style-guide-note">
          O azul original da marca foi preservado. Para texto branco em ações, usamos um azul mais
          escuro ({{ colorValue('--color-action') }}). A variante Marca usa texto marinho para
          manter a leitura.
        </p>
        <div class="style-guide-playground">
          <div class="style-guide-controls">
            <h3>Experimente do seu jeito.</h3>
            <label>
              Texto do botão
              <input
                v-model="buttonLabel"
                maxlength="48"
                placeholder="Agendar consulta"
              />
            </label>
            <div class="style-guide-select-row">
              <label>
                Variante
                <select v-model="selectedVariant">
                  <option
                    v-for="variant in variants"
                    :key="variant"
                    :value="variant"
                  >
                    {{ variantNames[variant] }}
                  </option>
                </select>
              </label>
              <label>
                Tamanho
                <select v-model="selectedSize">
                  <option value="sm">Pequeno · 44px</option>
                  <option value="md">Médio · 50px</option>
                  <option value="lg">Grande · 58px</option>
                </select>
              </label>
            </div>
            <label class="style-guide-checkbox">
              <input
                v-model="buttonDisabled"
                type="checkbox"
              />
              Desabilitado
            </label>
          </div>
          <div class="style-guide-preview">
            <span>PRÉVIA INTERATIVA</span>
            <UiButton
              :variant="selectedVariant"
              :size="selectedSize"
              :disabled="buttonDisabled"
              :loading="loading"
              @click="previewAction"
            >
              {{ buttonLabel || 'Agendar consulta' }}
            </UiButton>
            <code>variant="{{ selectedVariant }}" size="{{ selectedSize }}"</code>
          </div>
        </div>
      </section>

      <section
        id="componentes"
        class="style-guide-section"
      >
        <UiSectionHeading
          eyebrow="04 / Componentes"
          title="Pequenas peças. Muitas possibilidades."
          description="Componentes com conteúdo flexível, preparados para compor as próximas páginas sem perder a identidade."
        />
        <div class="style-guide-specimen">
          <div class="style-guide-specimen-title">
            <h3>Badges & etiquetas</h3>
            <code>UiBadge</code>
          </div>
          <div class="style-guide-badges">
            <UiBadge>Sobre mim</UiBadge>
            <UiBadge tone="soft">Atendimento online</UiBadge>
            <UiBadge tone="outline">Psicanálise clínica</UiBadge>
          </div>
        </div>
        <div class="style-guide-cards">
          <UiCard
            title="Terapia individual"
            description="Espaço seguro para explorar seus sentimentos, pensamentos e comportamentos com acolhimento."
          >
            <template #icon>✳</template>
            <template #footer>
              <UiButton
                variant="ghost"
                size="sm"
                @click="feedback = 'Exemplo de ação do card.'"
              >
                Conheça o atendimento
                <span aria-hidden="true">↗</span>
              </UiButton>
            </template>
          </UiCard>
          <UiCard
            title="Cada história importa."
            tone="soft"
            description="“Um espaço em que pude me sentir ouvida e olhar para minha história com mais gentileza.”"
          >
            <UiBadge tone="outline">Depoimento ilustrativo</UiBadge>
            <template #footer>
              <span class="style-guide-card-caption">Exemplo de composição · UiCard + UiBadge</span>
            </template>
          </UiCard>
        </div>
        <div class="style-guide-specimen">
          <div class="style-guide-specimen-title">
            <h3>Perguntas que abrem conversas</h3>
            <code>UiAccordion</code>
          </div>
          <div class="style-guide-faq">
            <UiAccordion
              question="Como funciona a primeira sessão?"
              open
            >
              É um primeiro encontro para nos conhecermos, conversar sobre o que trouxe você até
              aqui e entender como o acompanhamento pode ajudar.
            </UiAccordion>
            <UiAccordion question="Posso fazer o atendimento online?">
              Sim. Este é um exemplo de resposta para demonstrar o comportamento de abrir e fechar.
              O conteúdo pode ser substituído em cada página.
            </UiAccordion>
          </div>
          <p class="style-guide-note">
            Clique para expandir. Também funciona com Tab, Enter e Espaço.
          </p>
        </div>
      </section>

      <section
        id="espacamento"
        class="style-guide-section"
      >
        <UiSectionHeading
          eyebrow="05 / Ritmo & forma"
          title="Espaço também é cuidado."
          description="Uma escala de 4px organiza o ritmo. Cantos suaves aproximam; sombras discretas criam profundidade."
        />
        <div class="style-guide-spacing-list">
          <div
            v-for="(space, index) in spaces"
            :key="space"
          >
            <code>--space-{{ spaceKeys[index] }}</code>
            <span
              :class="['style-guide-space-bar', guideClass(`space-${spaceKeys[index]}`)]"
            ></span>
            <span>{{ space }}px</span>
          </div>
        </div>
        <div class="style-guide-shape-grid">
          <div
            v-for="shape in shapes"
            :key="shape.token"
          >
            <div :class="['style-guide-shape', guideClass(shape.token.slice(2))]"></div>
            <strong>{{ shape.name }}</strong>
            <code>{{ shape.token }}</code>
            <span>{{ shape.value }}</span>
          </div>
          <div>
            <div class="style-guide-shadow-sample"></div>
            <strong>Elevação leve</strong>
            <code>--shadow-card</code>
            <span>Cards e superfícies</span>
          </div>
        </div>
      </section>

      <section
        id="uso"
        :class="['style-guide-section', 'style-guide-usage']"
      >
        <UiSectionHeading
          eyebrow="06 / Pronto para reutilizar"
          title="Da base à próxima página."
          description="Use os componentes Vue e os tokens CSS para criar novas telas com a mesma linguagem visual."
        />
        <div class="style-guide-usage-grid">
          <div>
            <h3>Uma única fonte de estilo.</h3>
            <p>
              <code>app/assets/scss/components/_variables.scss</code>
              <br />
              Guarda as cores, fontes, medidas e aliases semânticos.
            </p>
            <h3>Conteúdo livre. Forma consistente.</h3>
            <p>
              <code>app/components/ui/</code>
              <br />
              Botões, badges, cards, accordion e cabeçalhos de seção. Props e slots adaptam cada
              peça ao conteúdo.
            </p>
            <p class="style-guide-note">
              Esta página é independente do conteúdo do Sanity. Fontes hospedadas localmente.
              Estados de interação e o tom de ação escuro são extensões do layout.
            </p>
          </div>
          <div class="style-guide-code-block">
            <div>
              <span>Vue / exemplo de composição</span>
              <button
                type="button"
                @click="copy(example)"
              >
                Copiar código ↗
              </button>
            </div>
            <pre><code>{{ example }}</code></pre>
          </div>
        </div>
      </section>
      <footer class="style-guide-footer">
        <span>
          Ana Flávia
          <span aria-hidden="true">✳</span>
        </span>
        <p>Consistência para criar. Sensibilidade para conectar.</p>
        <a href="#conteudo">Voltar ao topo ↑</a>
      </footer>
    </main>
    <div
      role="status"
      aria-live="polite"
      :class="['style-guide-toast', feedback && 'style-guide-toast-visible']"
    >
      {{ feedback }}
    </div>
  </div>
</template>
