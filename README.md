# Calculadora de PLR

Aplicação estática em HTML + JavaScript, sem servidor, banco ou dependências externas.
Pode ser publicada diretamente no GitHub Pages.

## Escopo

O simulador foi desenhado para o público funcional atualmente cadastrado no projeto. Situações de mudança de função durante o semestre, proporcionalidade por dias trabalhados e grupamentos fora desse público não fazem parte do escopo atual.

## Funcionamento

A calculadora permite selecionar apenas funções já cadastradas na base pública da aplicação. Não existe inclusão manual de código de função nem seleção manual de grupamento.

Cada função é associada internamente a uma faixa genérica conforme o multiplicador aplicável ao público-alvo:

| Faixa | Multiplicador de referência 1S2026 |
|---|---:|
| Faixa 0 | 0,00 |
| Faixa 1 | 0,71 |
| Faixa 2 | 0,73 |
| Faixa 3 | 0,84 |

O multiplicador 0,85 divulgado para outros grupamentos do BB não faz parte do público-alvo deste simulador e, por isso, não é disponibilizado.

## Dados informados pelo usuário

O usuário informa:

- período;
- código da função;
- salário-paradigma / VR;
- percentual do Conexão aplicável à parcela variável;
- PLR bruta já recebida no ano, quando houver;
- IR de PLR já retido no ano, quando houver;
- aplicação ou não da contribuição negocial.

O campo Conexão é opcional. Quando deixado vazio, o simulador considera **100%**.

O lucro-base é um parâmetro do período cadastrado em `dados.csv` e não é editável pela interface. Para atualizar ou criar um cenário de novo período, o parâmetro deve ser alterado na base do projeto, preservando a rastreabilidade da fonte.

## Fórmula-base

```text
BB_FIXA = 4% × lucro-base / participantes

FENABAN = 45% × salário-paradigma + parcela fixa Fenaban

ALVO = salário-paradigma × multiplicador

BB_VARIAVEL_INTEGRAL =
  max(0, ALVO - FENABAN - BB_FIXA)

BB_VARIAVEL =
  BB_VARIAVEL_INTEGRAL × percentual_Conexão

PLR_BRUTA_ANTES_TETO =
  BB_FIXA + FENABAN + BB_VARIAVEL
```

O simulador aplica ainda:

- teto anual de **7 salários paradigma**, considerando a PLR bruta já recebida no ano;
- IR exclusivo sobre PLR pela tabela anual vigente;
- contribuição negocial de **1,5%**, quando marcada, limitada a **R$ 274,37 por pagamento**.

## Parcela fixa Fenaban ainda não divulgada

`0` e valor desconhecido são tratados de forma diferente:

- `0` em `dados.csv` significa parcela oficialmente ou deliberadamente cadastrada como zero;
- campo vazio significa parâmetro ainda não divulgado.

Quando a parcela fixa Fenaban estiver vazia, o simulador usa **R$ 0,00 apenas como premissa provisória de projeção** e exibe esse fato explicitamente na interface. O resultado não deve ser interpretado como valor consolidado.

## Projeção do multiplicador

Quando o período ainda não possui multiplicador oficial, o simulador usa a evolução do lucro distribuível por participante em relação ao período de referência.

A análise histórica disponível mostrou:

- 1S2025 → 2S2025: queda do lucro-base por participante de aproximadamente 21,8%, com queda dos multiplicadores do público-alvo de aproximadamente 23,5% a 23,8%;
- 2S2025 → 1S2026: queda do lucro-base por participante de aproximadamente 17,1%, com queda dos multiplicadores do público-alvo de aproximadamente 26,2% a 26,3%.

Isso confirma relação forte entre evolução do lucro e multiplicadores, mas não uma proporcionalidade linear exata.

Por isso, a projeção usa uma **elasticidade histórica de 1,35**:

```text
multiplicador_projetado =
  multiplicador_referencia
  × (indice_lucro_per_capita)^1,35
```

Esse coeficiente é **empírico e provisório**, derivado dos períodos históricos disponíveis. Não representa fórmula normativa divulgada pelo Banco do Brasil e deve ser recalibrado à medida que novos pagamentos oficiais forem conhecidos.

## Tributação

A tabela exclusiva de IR sobre PLR cadastrada é a vigente em 2026, conforme a Receita Federal.

Para o segundo pagamento do ano, o cálculo considera a PLR bruta acumulada e desconta o IR de PLR já retido informado pelo usuário.

## Arquivos de regra

- `dados.js`: regras fixas, IR, limites e mapeamento das funções do público-alvo;
- `dados.csv`: parâmetros semestrais;
- `REGRAS_PLR_BB.md`: consolidação das regras, fórmulas, fontes e decisões do projeto.

## GitHub Pages

No repositório: **Settings → Pages → Deploy from a branch → main → / (root)**.

## Observações

- Dados históricos classificados como aproximação ou projeção devem ser substituídos quando houver dado oficial validado.
- O sistema é uma estimativa independente e não representa cálculo oficial do Banco do Brasil.
- Apenas funções presentes na base ficam disponíveis para simulação.
