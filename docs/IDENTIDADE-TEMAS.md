# Revisão — identidade e temas

Branch: `melhoria/identidade-temas`. Base: `main` em `c306248b0e51ce4f99643b425120f4e71ba5fc4f`.

## Alterações

- Nome público Daniel Almeida no Hero, rodapé, metadados, páginas geradas e documentação de apresentação. URLs sociais e nomes dos projetos preservados.
- CertiProf / AI Agent Manager / AIAM™ no quarto cartão; três primeiras certificações preservadas, conforme o conteúdo fornecido pelo proprietário.
- Remoção da frase solicitada e do separador na localização.
- Navegação com tipografia e contraste reforçados, foco visível e seção ativa acompanhada por rolagem com requestAnimationFrame e listener passivo. Menu recolhido em tablet para acomodar o controle de tema.
- Graduação em cartão acadêmico, com hierarquia de curso, grau e instituição. Cinco áreas de foco em blocos responsivos.
- Diagrama SVG e HTML em três níveis: nuvem; identidade e gerenciamento; infraestrutura e endpoints. Perspectiva, profundidade e azul corporativo preservados. Windows Server identificado como local, integração híbrida opcional tracejada e gerenciamento do Intune direcionado aos endpoints. A legenda explicita que a arquitetura é conceitual.
- Temas claro e escuro com tokens próprios, incluindo projetos, diagramas e páginas individuais. Preferência persistida, preferência inicial do sistema, atualização automática quando não há escolha salva e inicialização síncrona no HTML antes do React. Botão com ícones, nome acessível e estado aria-pressed.
- Correção de contraste no tema claro e de correspondência entre nomes acessíveis e textos dos links visuais dos projetos. Utilitário sr-only explícito.
- Preview estático pelo script existente, sem depender dos módulos nativos do bundler para servir um build pronto. Nova suíte de temas integrada ao workflow de qualidade.

## Validação

| Verificação                | Resultado                                                                                                                              |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| TypeScript                 | Aprovado                                                                                                                               |
| ESLint                     | Aprovado                                                                                                                               |
| Build de produção          | Aprovado localmente; build nativo padrão também exigido no CI                                                                          |
| Auditoria npm              | Zero vulnerabilidades                                                                                                                  |
| Suíte de release           | Aprovada: quatro páginas × três resoluções, rotas diretas/reload, URLs legadas, sitemap, canonical, HTTP 404 e 31 links internos       |
| Suíte de temas             | 24 combinações: dois temas × quatro páginas × três resoluções                                                                          |
| Axe WCAG 2 A/AA e 2.1 A/AA | Zero violações nas 24 combinações                                                                                                      |
| Comportamento dos temas    | Teclado, estado acessível, persistência em reload e entre páginas, preferência do sistema e bootstrap sem JavaScript externo aprovados |
| Navegação                  | Âncoras, indicador ativo, menu mobile, Escape, link de salto e movimento reduzido aprovados                                            |
| Execução                   | Nenhum erro JavaScript nas suítes                                                                                                      |

Resoluções de layout: desktop 1440 × 1000, tablet 768 × 1024 e mobile 390 × 844. Capturas isoladas de seções altas ampliam apenas a altura do viewport para evitar cortes do navegador sob o cabeçalho fixo; as capturas completas e testes de layout usam as resoluções pedidas.

### Lighthouse

Cache HTTP limpo antes de cada auditoria; somente a escolha de tema foi preservada. Servidor estático com gzip, Lighthouse 12.8.2 e Chrome headless, perfis padrão mobile/desktop. Não são métricas de usuários reais.

| Tema  | Dispositivo | Página     | Desempenho | Acessibilidade | Boas práticas | SEO |
| ----- | ----------- | ---------- | ---------: | -------------: | ------------: | --: |
| light | mobile      | home       |         98 |            100 |           100 | 100 |
| light | mobile      | avanceos   |         98 |            100 |           100 | 100 |
| light | mobile      | onpremises |         98 |            100 |           100 | 100 |
| light | mobile      | migracao   |         98 |            100 |           100 | 100 |
| light | desktop     | home       |        100 |            100 |           100 | 100 |
| light | desktop     | avanceos   |        100 |            100 |           100 | 100 |
| light | desktop     | onpremises |        100 |            100 |           100 | 100 |
| light | desktop     | migracao   |        100 |            100 |           100 | 100 |
| dark  | mobile      | home       |         98 |            100 |           100 | 100 |
| dark  | mobile      | avanceos   |         98 |            100 |           100 | 100 |
| dark  | mobile      | onpremises |         97 |            100 |           100 | 100 |
| dark  | mobile      | migracao   |         98 |            100 |           100 | 100 |
| dark  | desktop     | home       |        100 |            100 |           100 | 100 |
| dark  | desktop     | avanceos   |        100 |            100 |           100 | 100 |
| dark  | desktop     | onpremises |        100 |            100 |           100 | 100 |
| dark  | desktop     | migracao   |        100 |            100 |           100 | 100 |

Dados resumidos: [identity-theme-results.json](identity-theme-results.json). Relatórios completos JSON/HTML locais em `artifacts/final/themes/lighthouse-cold/`.

## Capturas reais

42 imagens em `artifacts/final/themes/`, geradas por Playwright no Chrome:

- `home-{desktop,tablet,mobile}-{dark,light}.png`: páginas iniciais completas.
- `hero-{desktop,tablet,mobile}-{dark,light}.png`: viewport inicial.
- `diagrama-{desktop,mobile}-{dark,light}.png`: diagrama completo.
- `formacao-{desktop,mobile}-{dark,light}.png`: graduação e certificações.
- `foco-{desktop,mobile}-{dark,light}.png`: faixa de atuação.
- `projeto-{1,2,3}-{desktop,tablet,mobile}-{dark,light}.png`: páginas individuais completas.

As capturas e o JSON de verificações também são gerados no artefato `revisao-visual-e-testes` pelo GitHub Actions. Arquivos de imagem e bundles locais não entram no pacote publicado.

## Preservação e limites

- Backups remotos existentes preservados, inclusive `backup/publicado-3103212`; bundle anterior verificado.
- Backup adicional local da base atual: `artifacts/final/themes/base-main-c306248.bundle`, verificado com `git bundle verify`.
- `/portfolio/` continua sendo a base de assets e rotas. Nenhuma alteração em deploy.yml, nenhum merge e nenhuma execução de publicação.
- No Windows desta sessão, o Controle de Aplicativo bloqueou o módulo nativo do Rollup. O build local utilizou o parser WebAssembly oficial na mesma versão (4.68.0), carregado apenas no processo de validação. Nenhuma política do Windows ou dependência do projeto foi alterada para contornar o bloqueio. O CI executa o build padrão em Linux.
- Acessibilidade validada por Axe, semântica e teclado; não houve sessão manual com NVDA/VoiceOver.
- Conteúdo técnico dos três projetos preservado. Evidências e resultados continuam explicitamente pendentes de documentação; nenhuma implementação, experiência ou credencial foi inventada.
- Integração e publicação dependem da aprovação do proprietário.
