# Daniel Almeida · Portfólio

Portfólio desenvolvido do zero com React, TypeScript e Vite. Conteúdo em português brasileiro, visual corporativo e publicação estática no GitHub Pages.

## Revisão atual — identidade e temas

A branch `melhoria/identidade-temas` parte da `main` atualizada (`c306248`). Consulte [o relatório desta revisão](docs/IDENTIDADE-TEMAS.md). O tema inicial segue o sistema; a escolha no cabeçalho fica salva em `localStorage`. O controle mantém nome acessível estável e estado pressionado para o tema claro.

`npm run test:themes` valida as quatro páginas nos dois temas em 1440 × 1000, 768 × 1024 e 390 × 844, gerando capturas e auditorias em `artifacts/final/themes/`. O workflow de qualidade executa essa suíte e a suíte de release; não publica.

## Executar

Requisito: Node.js 22 e npm.

```sh
npm ci
npm run dev
```

Abra o endereço indicado pelo Vite, seguido de `/portfolio/`.

Para rever o build já pronto no Windows, execute `./iniciar-preview.ps1` no PowerShell. O script usa o Node disponível no PATH, com fallback para a instalação portátil anterior.

```sh
npm run lint
npm run typecheck
npm run build
npm run preview
npm run test:ui
```

Para validar o pacote estático com servidor próprio, respostas 404 reais, links antigos e Axe nas quatro páginas: `npm run test:release`. Esse comando inicia e encerra o servidor automaticamente. Em Linux, execute `npx playwright install --with-deps chromium` antes. `npm run serve:dist` abre um preview estático com compressão gzip equivalente à observada no GitHub Pages.

O teste visual usa Google Chrome instalado no Windows. Em outros sistemas, execute `npx playwright install chromium` antes. O preview deve estar ativo em `http://127.0.0.1:4173/portfolio/`. `TEST_URL` permite mudar o endereço. Capturas e relatório são gravados em `artifacts/` (não versionados).

## Arquitetura

- `src/App.tsx`: página inicial, página de projeto e estado 404.
- `src/components.tsx`: cabeçalho, menu, rodapé, links, animação e diagramas vetoriais.
- `src/theme.tsx` e `src/themes.css`: preferência, controle acessível e tokens dos temas.
- `src/CloudArchitecture.tsx`: arquitetura conceitual em três níveis, com infraestrutura local explicitamente separada.
- `src/data.ts`: fonte tipada dos três projetos e links sociais.
- `src/styles.css`: tokens, componentes, breakpoints e movimento reduzido; Tailwind também disponível.
- `scripts/pages.mjs`: gera HTML de entrada por projeto, metadados específicos, sitemap e página 404.
- `.github/workflows/deploy.yml`: build, lint e publicação manual no GitHub Pages.

As páginas são renderizadas pelo React no cliente. Cada rota possui um HTML próprio gerado no build; abrir ou atualizar uma página de projeto não depende de redirecionamento de SPA. Metadados específicos existem no HTML entregue. O conteúdo principal requer JavaScript.

## Conceito visual

“Infraestrutura em camadas”: fundo azul-marinho, contraste azul-claro, linhas finas e arquitetura vetorial própria. A abertura conecta cloud, identidade e dispositivos; os três projetos recebem composições distintas. Manrope é servida localmente, sem depender de fontes de terceiros em tempo de execução. Ícones Lucide e animações CSS leves evitam bibliotecas extras de animação.

## Conteúdo e veracidade

Os dados biográficos e certificações vêm do briefing. Não há números de credenciais, links de validação, empresas, datas ou resultados inventados. Os diagramas são conceituais. As páginas de projeto identificam explicitamente etapas previstas e evidências indisponíveis. AvanceOS Microsoft 365 é independente do ERP homônimo.

Atualize `src/data.ts` quando houver documentação real. Substitua os espaços reservados de evidências por imagens reais com texto alternativo, contexto e informações sensíveis ocultadas. As certificações estão apresentadas conforme informadas, sem validação independente.

## Deploy e preservação — registro da entrega anterior

O remoto `origin` é `https://github.com/dalmeidait/portfolio.git`. A versão publicada e a `main` foram verificadas no commit `31032129ab8d5db4d480d3b5e7a779bcf9834f28` e preservadas na branch remota `backup/publicado-3103212`. Há também um bundle recuperável local em `artifacts/final/portfolio-remote-backup.bundle`. Nenhuma integração ou publicação foi executada.

A revisão parte de `9e20073`, preservado no histórico local. Veja `REVISAO-VISUAL.md` para as decisões visuais e `ENTREGA-FINAL.md` para o estado de validação desta entrega. Para conferir o backup:

```sh
git fetch origin
git show --no-patch origin/backup/publicado-3103212
git bundle verify artifacts/final/portfolio-remote-backup.bundle
```

Se `main` mudar antes da integração, preserve também o novo estado numa branch de backup. O workflow `quality.yml` valida a branch de revisão e o PR sem publicar.

Somente após aprovação, selecione **GitHub Actions** em Settings → Pages **antes do merge**: a versão anterior é publicada diretamente da branch, enquanto a nova precisa do build Vite. Depois da integração aprovada, execute “Publicar portfólio no GitHub Pages” na aba Actions da `main`. O workflow exige execução manual (`workflow_dispatch`) e recusa branches diferentes de `main`.

Os três endereços antigos `.html` são gerados como redirecionamentos para as páginas novas, preservando links já compartilhados. `docs/README_PERFIL.md`, existente no repositório remoto, foi preservado e seus links continuam atendidos por esses redirecionamentos.

O `base` padrão é `/portfolio/`. Para migrar ao repositório `dalmeidait.github.io`, altere `SITE_BASE` no workflow para `/`. Localmente, defina essa variável antes de executar o build. O gerador também usa a variável para canonical e sitemap. Não é necessário alterar links internos.

Referência de implantação: [documentação oficial do Vite](https://vite.dev/guide/static-deploy.html#github-pages).

## Acessibilidade e desempenho

Menu mobile com `aria-expanded`, fechamento com Escape e restauração de foco; link para pular navegação; foco visível; hierarquia de títulos; regiões semânticas; suporte a `prefers-reduced-motion`. Ícones decorativos são ocultados da árvore de acessibilidade; os rótulos dos projetos integram o nome dos links, e a composição principal tem descrição acessível. Sem formulários ou coleta de dados.

O teste automatizado verifica home e três projetos em desktop, tablet e mobile, abertura direta e atualização de rotas, ausência de overflow, navegação, âncoras e erros de execução. Métricas Core Web Vitals de usuários reais só poderão ser avaliadas após publicação e tráfego suficiente; não são prometidas pontuações não medidas.
