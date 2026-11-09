# Portfólio — revisão final e preparação para publicação

## Escopo e resultado

Revisão realizada a partir de `revisao/visual-premium`, commit `9e20073`, preservando a direção visual aprovada: arquitetura Microsoft Cloud em perspectiva, competências em fundo claro e AvanceOS em destaque. Hero, apresentação, biografia, competências, projetos, formação, contato e rodapé foram inspecionados em desktop, tablet e mobile. Não foi necessário redesenhar as seções.

As páginas de projeto mantêm o escopo conceitual, os objetivos e o status fornecido. AvanceOS permanece em desenvolvimento; On-Premises permanece identificado como laboratório; a migração permanece com documentação em consolidação. Capturas, resultados e validações dos laboratórios continuam explicitamente pendentes. Não se declara nenhuma implementação concluída sem evidência.

## Ajustes finais

- Corrigida a abertura explícita de `index.html` nas páginas de projeto.
- Restringida a identificação das rotas ao caminho configurado do portfólio.
- Mantidos os três endereços antigos `.html` por redirecionamentos estáticos, com link de fallback.
- Corrigido o nome acessível da marca para incluir seu texto visível; monograma decorativo oculto para leitores de tela.
- Adicionado servidor de teste baseado nos arquivos de `dist`, sem fallback de SPA e com HTTP 404 real.
- Servidor de QA usa gzip para arquivos de texto, conforme o transporte confirmado no GitHub Pages publicado.
- Adicionado `npm run typecheck` e teste completo `npm run test:release`.
- Preparado workflow de qualidade para branch e PR, com capturas e relatório como artefatos. Sem permissão ou etapa de deploy.
- Mantido deploy exclusivamente manual, agora limitado à `main`.
- Preservado `docs/README_PERFIL.md` existente no remoto, sem reutilizar o código visual antigo.

## Testes

Build de produção, TypeScript e ESLint aprovados. Auditoria completa npm: **zero vulnerabilidades reportadas**.

Home e três projetos verificados em **1440 × 1000**, **768 × 1024** e **390 × 844**. Testes incluem abertura direta, atualização, menu mobile, Escape, foco por teclado, âncoras, ausência de rolagem horizontal, fontes e assets locais, metadados, canonical, sitemap, redirecionamentos antigos e HTTP 404. **31 links internos** verificados. Nenhum erro JavaScript detectado.

Axe/WCAG A e AA: **zero violações detectadas nas 12 combinações de página/resolução**. Rolagem com revelação e `prefers-reduced-motion` verificados. A suíte original foi mantida e executada junto com os testes adicionais, sem enfraquecer suas asserções.

## Lighthouse

| Página                     | Perfil  | Desempenho | Acessibilidade | Boas práticas | SEO |
| -------------------------- | ------- | ---------- | -------------- | ------------- | --- |
| home                       | mobile  | 97         | 100            | 100           | 100 |
| avanceos-microsoft-365     | mobile  | 97         | 100            | 100           | 100 |
| oficina-avance-on-premises | mobile  | 97         | 100            | 100           | 100 |
| oficina-avance-migracao    | mobile  | 97         | 100            | 100           | 100 |
| home                       | desktop | 100        | 100            | 100           | 100 |
| avanceos-microsoft-365     | desktop | 100        | 100            | 100           | 100 |
| oficina-avance-on-premises | desktop | 100        | 100            | 100           | 100 |
| oficina-avance-migracao    | desktop | 100        | 100            | 100           | 100 |

Relatórios executados sobre o build de produção em Chrome headless, com perfis padrão mobile e desktop. Os testes de layout usam as três resoluções exatas solicitadas; os perfis Lighthouse usam seus parâmetros padrão de simulação. As notas são de laboratório local, não métricas de campo do site publicado nem uma medição de INP real.

O diagnóstico inicial sem compressão registrou desempenho mobile de 86–87. Os relatórios foram preservados em `artifacts/final/diagnostico-sem-gzip/`. Após confirmar que o GitHub Pages serve gzip e igualar o transporte do preview, os testes foram repetidos nas oito combinações página/perfil. Nenhum elemento visual foi removido para elevar pontuação.

## Capturas reais

Em `artifacts/final/`:

- `home-desktop.png`, `home-tablet.png`, `home-mobile.png`: página inicial completa.
- `hero-desktop.png`, `hero-tablet.png`, `hero-mobile.png`: primeira tela.
- `avanceos-microsoft-365-{desktop,tablet,mobile}.png`.
- `oficina-avance-on-premises-{desktop,tablet,mobile}.png`.
- `oficina-avance-migracao-{desktop,tablet,mobile}.png`.
- `section-*-{desktop,tablet,mobile}.png`: recortes das seções para revisão.
- `release-validation.json`, `original-suite.json`, `axe-*.json`, `npm-audit.json` e `lighthouse-*.json`: evidências dos testes.

Os artefatos ficam fora do código publicado. O workflow de qualidade gera suas próprias capturas e as disponibiliza para download em Actions → Qualidade do portfólio → `revisao-visual-e-testes`.

## Preservação da versão publicada

O conteúdo publicado foi comparado com `main`, commit **`31032129ab8d5db4d480d3b5e7a779bcf9834f28`**. O HTML público corresponde ao arquivo desse commit, e a execução Pages correspondente foi concluída com sucesso.

- Backup remoto confirmado: [`backup/publicado-3103212`](https://github.com/dalmeidait/portfolio/tree/backup/publicado-3103212), apontando para o mesmo commit.
- Backup local: `artifacts/final/portfolio-remote-backup.bundle`, verificado com `git bundle verify`, contendo o histórico completo desse estado.
- Os backups anteriores do repositório foram mantidos.
- O histórico local com `9e20073` é preservado numa branch `backup/local-qualidade-*` durante o envio pelo conector.

## Integração e publicação

O Git local não tem credenciais para push. O conector GitHub autenticado é usado para enviar uma árvore de arquivos idêntica à validada, criar a branch remota `revisao/visual-premium` baseada na `main` verificada e abrir o PR. O SHA do commit remoto pode diferir do commit local consolidado; a equivalência da árvore é verificada antes da sincronização local. Não há merge nessa etapa.

**Pendência para a publicação definitiva:** após aprovação, selecionar **GitHub Actions** em Settings → Pages **antes do merge**, pois o site anterior é servido pelo fluxo de publicação de branch e a nova versão exige build. A configuração atual de hospedagem não foi alterada para evitar impacto na versão em produção.

Depois da aprovação e da integração, executar manualmente o workflow de publicação na `main`. O `base` do Vite e os endereços gerados permanecem em **`/portfolio/`**. O workflow de revisão não publica, e o de deploy não executa em branches de revisão.

As únicas pendências de conteúdo são as evidências reais dos laboratórios, já sinalizadas no site. Não bloqueiam a apresentação honesta do portfólio, mas devem ser adicionadas somente quando fornecidas e verificáveis.
