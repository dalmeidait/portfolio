# Revisão da primeira versão

## Entrega

Página inicial completa, três páginas individuais e página 404. Implementação nova, sem reutilizar HTML, CSS, JavaScript ou identidade do repositório anterior. Nenhuma alteração enviada ao GitHub.

O conceito visual usa azul-marinho, azul-claro, tipografia Manrope local, linhas discretas e diagramas vetoriais de arquitetura. Cada laboratório tem uma composição própria. Conteúdo fornecido no briefing, sem credenciais, métricas profissionais ou evidências inventadas.

## Verificações realizadas

- Build de produção e TypeScript: aprovados.
- ESLint: aprovado.
- Auditoria npm: nenhuma vulnerabilidade reportada após correção da dependência transitiva de minimatch usada pelo lint.
- Home e três projetos: testados em 1440 × 1000, 768 × 1024 e 390 × 844.
- Abertura direta e atualização das três rotas: aprovadas.
- Menu mobile: abertura, fechamento por Escape, retorno de foco e fechamento ao navegar aprovados.
- Navegação por teclado: link de salto para o conteúdo e foco aprovados.
- Âncoras: destinos existentes; seção de projetos não fica encoberta pelo cabeçalho ao navegar no celular.
- Layout: sem rolagem horizontal nas resoluções testadas; capturas inspecionadas visualmente.
- Console e assets locais: sem erros nos testes.
- Links sociais: destinos conferidos com os endereços fornecidos; novas abas usam `noopener noreferrer`. Disponibilidade das plataformas externas não é garantida pelo teste local.
- Axe/WCAG A e AA na home: nenhuma violação detectada nas três resoluções. O teste automatizado não substitui uma auditoria humana completa.
- Migração de `/portfolio/` para `/`: build separado e testes de home, rotas, atualização, assets e canonical aprovados.

## Lighthouse mobile local

| Categoria      | Pontuação |
| -------------- | --------- |
| Desempenho     | 97        |
| Acessibilidade | 100       |
| Boas práticas  | 100       |
| SEO            | 100       |

LCP: 2,1 s. CLS: 0,001. TBT: 0 ms. Uma execução em Chrome headless, sobre build de produção servido localmente, com configuração mobile padrão do Lighthouse. Resultados podem variar conforme computador e condições de execução. Não são métricas de campo do GitHub Pages nem uma medição de INP de usuários reais.

Relatório bruto: `artifacts/lighthouse-mobile.json`. Testes: `artifacts/verification.json` e `artifacts/root-verification.json`.

## Capturas

- `artifacts/hero-desktop.png`, `hero-tablet.png`, `hero-mobile.png`: primeira tela.
- `artifacts/home-desktop.png`, `home-tablet.png`, `home-mobile.png`: página inicial inteira.
- `artifacts/<slug>-desktop.png`, `<slug>-tablet.png`, `<slug>-mobile.png`: páginas de cada projeto.

## Limites e próxima etapa

A imagem de referência mencionada no briefing não estava disponível no envio; a revisão usou os critérios textuais. Evidências dos laboratórios permanecem identificadas como pendentes. Não foram adicionadas capturas fictícias.

O workflow do GitHub Pages está preparado, mas sua execução remota ainda não foi realizada. Não existe checkout Git local e a branch principal remota não foi modificada. Antes de substituir o conteúdo existente, criar e enviar a branch de backup conforme o README. A publicação definitiva depende da revisão desta versão e da integração autorizada ao repositório.

Para abrir novamente o preview neste computador, execute `powershell -ExecutionPolicy Bypass -File .\iniciar-preview.ps1` na pasta do projeto e acesse o endereço exibido. O script usa Node portátil já preparado em `%LOCALAPPDATA%\portfolio-tools` quando Node não está no PATH. Não altera a política de execução permanentemente.
