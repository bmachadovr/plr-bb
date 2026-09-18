# Calculadora de PLR

Aplicação estática em HTML + JavaScript, sem servidor, banco ou dependências externas.
Pode ser publicada diretamente no GitHub Pages.

## Funcionamento

A calculadora permite selecionar apenas funções já cadastradas na base pública da aplicação. Não existe inclusão manual de código de função nem seleção manual de grupamento.

Cada função é associada internamente a uma faixa genérica conforme o multiplicador aplicável:

| Faixa | Multiplicador de referência |
|---|---:|
| Faixa 0 | 0,00 |
| Faixa 1 | 0,71 |
| Faixa 2 | 0,73 |
| Faixa 3 | 0,84 |

A Faixa 0 é mantida apenas como referência e não é calculada pela regra isolada de salários usada neste MVP.

## Simulação

O usuário informa:

- período;
- função disponível;
- salário-paradigma / VR;
- PLR bruta já recebida no ano, quando houver;
- IR de PLR já retido no ano, quando houver;
- lucro-base do período, caso deseje ajustar a projeção;
- aplicação ou não da contribuição sindical.

Quando existe multiplicador cadastrado para o período, ele é usado diretamente. Para períodos projetados, o multiplicador é estimado a partir do período de referência e da evolução do bolo de PLR.

## Tributação

A tabela exclusiva de IR sobre PLR cadastrada é a vigente em 2026, conforme a Receita Federal.

Para o segundo pagamento do ano, o cálculo considera a PLR bruta acumulada e desconta o IR de PLR já retido informado pelo usuário.

## GitHub Pages

No repositório: **Settings → Pages → Deploy from a branch → main → / (root)**.

## Observações

- Os valores históricos marcados como aproximação ou estimativa devem ser substituídos quando houver dado oficial validado para a finalidade do cálculo.
- O sistema é uma estimativa independente e não representa cálculo oficial de nenhuma instituição.
- Apenas funções presentes na base pública ficam disponíveis para simulação.
