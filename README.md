# Ana Flavia

Site em Vue com Nuxt, TypeScript, SCSS e Sanity Studio integrado.

## Desenvolvimento

Requer Node.js 22.12 ou superior.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Preencha `NUXT_PUBLIC_SANITY_PROJECT_ID` no `.env.local`. O dataset padrão é
`production`. Nunca adicione tokens ao repositório.

- `/`: página inicial editável;
- `/blog`: lista de publicações;
- `/blog/[slug]`: publicação individual;
- `/studio`: painel administrativo, incluindo suas sub-rotas.

O site usa Vue. O Studio é uma aplicação React do próprio Sanity, carregada
apenas na rota `/studio`, sem o cabeçalho ou rodapé do site.
Cadastre `http://localhost:3000` nas origens CORS do projeto Sanity com
credenciais habilitadas para acessar o painel local.

O Nuxt lê `.env.local` nos comandos de desenvolvimento, build e preview.
Em produção, configure `NUXT_PUBLIC_SANITY_PROJECT_ID`,
`NUXT_PUBLIC_SANITY_DATASET` e `NUXT_PUBLIC_SANITY_API_VERSION` no ambiente.

## Validação e produção

```bash
npm run typecheck
npm run build
npm start
```

O build gera `.output/`, com o servidor em `.output/server/index.mjs`.
`npm run generate` é uma alternativa para hospedagem estática; configure a
hospedagem para servir as sub-rotas do Studio e refaça a geração ao publicar
conteúdo ou novos artigos. O build padrão renderiza o site no servidor e
consulta o conteúdo publicado no Sanity.

## Sanity MCP

O repositório configura o servidor MCP hospedado oficialmente pelo Sanity em
`.codex/config.toml`. Não é necessário instalar ou executar um servidor MCP local.

### Como usar no Codex

1. Abra este repositório no Codex e marque o projeto como confiável, para permitir
   que a configuração local seja carregada.
2. Confirme que o servidor está disponível:

   ```bash
   codex mcp list
   ```

3. Na primeira utilização, conclua o login OAuth solicitado pelo Sanity.
4. Peça ao agente para listar seus projetos ou trabalhar com um projeto e dataset
   específicos.

Exemplo de solicitação:

> Use o MCP do Sanity para listar os projetos aos quais tenho acesso.

## Segurança

- A autenticação padrão é feita por OAuth.
- Não salve tokens no Git. Se autenticação por token for necessária no futuro,
  configure-a somente no ambiente local ou em um gerenciador de segredos.
- Antes de qualquer escrita, confira sempre o projeto e o dataset selecionados.

## Referências

- [Sanity MCP server](https://www.sanity.io/docs/ai/mcp-server)
- [Configuração do Codex](https://learn.chatgpt.com/docs/config-file/config-basic)
