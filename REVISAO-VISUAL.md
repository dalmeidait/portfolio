# Revisão visual premium

Revisão implementada na branch local `revisao/visual-premium`. A primeira versão foi preservada no commit `1e4d791`, na branch `versao-inicial`. O repositório local foi inicializado nesta revisão porque a pasta ainda não tinha Git. Nenhum remoto foi configurado, nenhuma branch remota foi alterada e nada foi publicado.

## Comparação com a primeira versão

| Área         | Primeira versão                                          | Revisão                                                                                                                                       |
| ------------ | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero         | Diagrama frontal discreto, hierarquia próxima à do texto | SVG maior, nuvem em relevo, planos em perspectiva, trilhas e módulos de identidade, infraestrutura e dispositivos                             |
| Ritmo visual | Seções em tons escuros semelhantes                       | Competências em azul-acinzentado claro; formação em azul intermediário; demais seções em azul-marinho                                         |
| Leitura      | Textos secundários pequenos                              | Hero de 13 para 15 px no desktop e 12 para 14 px no mobile; resumos de projeto de 11 para 14 px; textos técnicos maiores e linhas controladas |
| Projetos     | Três cartões com peso equivalente                        | AvanceOS em destaque horizontal no desktop; dois projetos complementares abaixo; empilhamento natural no mobile                               |
| Ilustrações  | Pequenas variações entre os cartões                      | Cloud com camadas, servidores em perspectiva e migração com conexão entre origem e destino, em paletas próprias                               |
| Acabamento   | Bordas e sombras discretas                               | Bordas iluminadas, profundidade estática, espaçamento ampliado e feedback sutil em links e cartões                                            |

Não foram incluídas dependências, imagens externas, canvas, WebGL ou animações contínuas. O novo hero usa SVG e CSS. Formas vetoriais são decorativas e a descrição acessível original foi preservada. Movimento reduzido continua respeitado.

## Conteúdo e arquitetura

`src/data.ts`, metadados, configuração de deploy, dependências e teste original `scripts/verify.mjs` permanecem inalterados. Os componentes existentes foram preservados. As mudanças funcionais em `App.tsx` se limitam à classe de destaque e ao rótulo editorial “PROJETO PRINCIPAL”.

O teste adicional `scripts/review-visual.mjs` comparou os textos renderizados com o build anterior: apresentação, biografia, competências, projetos, formação, contato, rodapé e documentação técnica permaneceram iguais, exceto pelo rótulo editorial. Não foram adicionados resultados ou evidências.

## Validação

- Build TypeScript/Vite e ESLint: aprovados.
- Suíte original: aprovada, sem modificar ou enfraquecer suas asserções.
- Home e três projetos em 1440 × 1000, 768 × 1024 e 390 × 844: rotas diretas, atualização, âncoras e ausência de erros aprovadas.
- Teste adicional de overflow: aprovado em 320, 620, 621, 900, 1024 e 1920 px.
- Menu mobile, Escape, link para pular conteúdo e navegação por teclado: aprovados.
- Axe/WCAG A e AA: zero violações detectadas na home nas três resoluções; zero nas três páginas de projeto em desktop e mobile.
- Revelação ao rolar e suporte a movimento reduzido: verificados.
- Capturas de desktop, tablet e mobile inspecionadas; comparações lado a lado de hero, competências e projetos geradas.

## Lighthouse mobile — build final

| Categoria      | Anterior | Revisão |
| -------------- | -------- | ------- |
| Desempenho     | 97       | 97      |
| Acessibilidade | 100      | 100     |
| Boas práticas  | 100      | 100     |
| SEO            | 100      | 100     |
| LCP            | 2,1 s    | 2,1 s   |
| CLS            | 0,001    | 0,021   |
| TBT            | 0 ms     | 0 ms    |

Medição local em Chrome headless, configuração mobile padrão do Lighthouse. Desempenho acima do mínimo solicitado de 90. Não representa métricas de campo ou INP de usuários reais. Fonte: `artifacts/lighthouse-mobile-final.json`; versão anterior em `artifacts/before/lighthouse-mobile.json`.

## Revisão visual

- Abra `artifacts/review/comparacao.html` no navegador para alternar entre desktop/mobile e hero/competências/projetos.
- Comparações prontas: `comparacao-desktop.png`, `comparacao-mobile.png`, `comparacao-projetos.png`, na mesma pasta.
- Capturas integrais atuais: `artifacts/home-desktop.png`, `home-tablet.png` e `home-mobile.png`.
- Capturas e build anteriores: `artifacts/before/`.
- Relatório da suíte original: `artifacts/verification.json`.
- Relatório adicional: `artifacts/review/validation.json`.

Esses artefatos de QA permanecem locais e não integram o deploy. O script adicional requer o build anterior em `artifacts/before/dist` e o preview atual em 4173; ele inicia e encerra seu próprio preview de referência na porta 4175.

## Publicação

A revisão está pronta para avaliação. Publicação e integração na branch principal permanecem pendentes de aprovação. Antes de substituir o repositório remoto, continua obrigatório preservar a versão remota numa branch de backup. A branch local `versao-inicial` guarda a primeira implementação criada aqui, não o conteúdo anterior do GitHub.

A imagem de referência citada pelo usuário não estava disponível no contexto recebido; não foi possível compará-la diretamente. A direção foi revisada a partir das prioridades textuais e da comparação com a primeira versão.
