# Ana Flavia

Site em Next.js com TypeScript, SCSS Modules, Sanity Studio integrado e acesso ao
Sanity por meio do Model Context Protocol (MCP).

## Desenvolvimento

Instale as dependências e inicie o site:

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). O painel administrativo fica
em [http://localhost:3000/studio](http://localhost:3000/studio).

Antes de abrir o Studio, copie `.env.example` para `.env.local` e informe o ID do
seu projeto Sanity:

```bash
cp .env.example .env.local
```

Estrutura inicial:

- `/`: página inicial editável;
- `/blog`: lista de publicações;
- `/blog/[slug]`: publicação individual;
- `/studio`: painel administrativo do Sanity.

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
