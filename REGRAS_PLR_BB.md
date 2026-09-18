# PLR Banco do Brasil — Regras, Fórmulas e Auditoria do Simulador

**Versão:** 1.0  
**Data de consolidação:** 18/09/2026  
**Projeto:** PLR BB  
**Objetivo:** consolidar as regras conhecidas da Participação nos Lucros e Resultados (PLR) do Banco do Brasil, formalizar fórmulas de cálculo e definir requisitos para que o simulador consiga reproduzir pagamentos conhecidos e projetar pagamentos futuros com rastreabilidade.

> Este documento é uma especificação de cálculo e uma base de conhecimento do projeto. Deve ser atualizado sempre que houver novo ACT/CCT, divulgação do BB, alteração tributária ou divulgação de parâmetros semestrais.

---

## 1. Hierarquia das fontes

Para conflito entre dados, adotar a seguinte prioridade:

1. **ACT/CCT vigente e instrumentos assinados aplicáveis à PLR**.
2. **Comunicados e materiais internos/oficiais do Banco do Brasil relativos ao período**.
3. **Legislação aplicável**, especialmente Lei nº 10.101/2000 e regras tributárias da Receita Federal.
4. **ACTs anteriores**, apenas para preencher lacunas quando a regra tiver continuidade confirmada.
5. **Reconstruções matemáticas**, identificadas como inferidas/provisórias.

### Fontes internas do projeto — BB, setembro/2026

Imagens usadas nesta consolidação:

- `20260918_091610(1).jpg`
- `20260918_091624.jpg`
- `20260918_091643.jpg`
- `20260918_091700.jpg`
- `20260918_091709.jpg`
- `20260918_091752.jpg`
- `20260918_091805.jpg`
- `20260918_091832.jpg`
- `20260918_091847(1).jpg`
- `20260918_091928(1).jpg`
- `20260918_091940.jpg`
- `20260918_092112.jpg`

### Fontes públicas de referência

- ACT PLR Banco do Brasil 2024–2026:
  - https://bancarios.org.br/wp-content/uploads/2024/09/ACT-PLR-CONTEC-2024-2026-Banco-do-Brasil-PLR.pdf
  - https://bancariosdf.com.br/media/media_documentos/BB-ACT-PLR-2024-2026_CAlwX14.pdf
- ACT PLR BB 2022–2023:
  - https://contec.org.br/wp-content/uploads/2022/09/BB-ACT-BANCO-DO-BRASIL-E-CONTEC-PLR-2022-E-2023.pdf
- Novo ACT do BB, assinado em 11/09/2026 e vigente até 2028:
  - https://spbancarios.com.br/09/2026/trabalhadores-assinam-act-do-bb-com-vigencia-ate-2028
  - https://contec.org.br/contec-assina-act-do-banco-do-brasil-com-avancos-e-plr-prevista-para-dia-16/
- Tabela de IR sobre PLR — Receita Federal:
  - https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2026

**Observação:** na data desta consolidação, o texto público facilmente localizável do novo instrumento específico de PLR 2026/2027 ainda não permitiu validar todas as cláusulas detalhadas. Onde o material novo do BB coincide com os ACTs anteriores, a regra é tratada como fortemente confirmada. Itens dependentes de redação específica do novo ACT permanecem marcados para validação documental.

---

# 2. Estrutura geral da PLR do Banco do Brasil

A PLR individual é formada por dois módulos:

## 2.1. Módulo BB

1. **Parcela Fixa / Linear BB**
2. **Parcela Variável BB**

## 2.2. Módulo Fenaban

1. **Parcela Fixa Fenaban**
2. **Parcela Variável Fenaban**, correspondente a até 45% do Salário Paradigma.

Assim:

```text
PLR_BRUTA =
    BB_FIXA
  + BB_VARIAVEL_PAGA
  + FENABAN_FIXA
  + FENABAN_VARIAVEL
```

A ordem de cálculo indicada no ACT 2024–2026 é:

```text
1. BB — Parcela Linear
2. Fenaban
3. BB — Parcela Variável
```

Essa ordem é relevante porque a parcela variável BB é um **residual** após as demais parcelas.

---

# 3. Variáveis formais

| Símbolo | Definição |
|---|---|
| `LB` | Lucro Líquido Base de PLR do semestre |
| `N` | quantidade de participantes elegíveis utilizada na distribuição linear |
| `SP` | Salário Paradigma do empregado |
| `M` | multiplicador de salários aplicável ao grupamento/função |
| `FEN_FIXA` | parcela fixa Fenaban definida pelo BB para o semestre |
| `FEN_VAR` | parcela variável Fenaban |
| `BB_FIXA` | parcela linear BB |
| `ALVO` | quantidade de salários paradigma transformada em valor monetário |
| `BB_VAR_INT` | parcela variável BB integral antes do fator Conexão |
| `PC` | percentual de pagamento decorrente do Conexão |
| `BB_VAR` | parcela variável BB efetivamente paga |
| `FP` | fator de proporcionalidade/elegibilidade |
| `CAP_ANUAL` | teto individual anual da PLR |
| `PLR_BRUTA` | PLR antes de IR e contribuição negocial |
| `IR_PLR` | IR exclusivo sobre PLR |
| `CN` | contribuição negocial |
| `PLR_LIQ` | valor líquido estimado |

---

# 4. Lucro Líquido Base de PLR

O material do BB diferencia o lucro divulgado contabilmente da base utilizada para PLR.

Estrutura apresentada:

```text
Lucro Líquido Consolidado
+/- ajustes associados à remuneração variável
= Lucro Líquido antes da Remuneração Variável
- Prejuízos Acumulados
+ Reversão de provisões transferidas para lucros/prejuízos acumulados
= Lucro Líquido Base de PLR (LB)
```

Portanto, **não se deve usar automaticamente o “lucro líquido ajustado” divulgado ao mercado** como `LB`.

Para o 1S2026, o material interno informa:

- `BB_FIXA = R$ 3.241,99`
- `N = 87.409`

Como `BB_FIXA = 4% × LB / N`, a base reconstruída é:

```text
LB = BB_FIXA × N / 0,04

LB = 3.241,99 × 87.409 / 0,04
LB ≈ R$ 7.084.477.597,75
```

Ou aproximadamente:

```text
LB ≈ R$ 7,084477598 bilhões
```

Esse valor coincide com o valor cadastrado atualmente no simulador e é matematicamente consistente com o material do BB.

---

# 5. Percentual máximo do lucro distribuível

O material novo do BB informa que a governança limita o percentual máximo de lucro distribuível à PLR.

Para 2026, o teto informado é:

```text
11,25% do Lucro Líquido Base de PLR
```

O percentual efetivamente acionado depende do atingimento do indicador corporativo.

Valores explicitamente visíveis no material de 2026:

| Atingimento do indicador | Pagamento | % do lucro |
|---:|---:|---:|
| ≥ 100% | 100% | 11,25% |
| 99% a <100% | 99% | 11,14% |
| 98% a <99% | 98% | 11,03% |
| 97% a <98% | 97% | 10,91% |
| 96% a <97% | 96% | 10,80% |

A base atual do simulador também contém:

| Atingimento | Pagamento | % do lucro |
|---:|---:|---:|
| ≥95% | 95% | 10,69% |
| ≥90% | 75% | 8,44% |
| ≥80% | 50% | 5,63% |
| <80% | 0% | 0% |

Essas últimas faixas devem permanecer registradas, mas a versão final da especificação deve validá-las contra o instrumento 2026/2027 quando seu texto integral estiver disponível.

---

# 6. Parcela Fixa / Linear BB

Regra confirmada pelo material novo e por ACTs anteriores:

```text
BB_FIXA = 0,04 × LB / N
```

A parcela é distribuída linearmente entre os participantes elegíveis.

Para 1S2026:

```text
BB_FIXA = R$ 3.241,99
```

A parcela fixa não é condicionada ao placar individual/unidade do Conexão.

---

# 7. Salário Paradigma

O material do BB e ACTs anteriores adotam, em essência:

### Comissionados / funções gratificadas

```text
SP = VR da função
```

### Escriturário em exercício de caixa

```text
SP = VP do A6 + Gratificação de Caixa
```

### Escriturário sem comissão

```text
SP = VP do A6
```

O cálculo deve trabalhar com o **Salário Paradigma aplicável ao período e à situação funcional**, não simplesmente com o salário bruto mensal.

---

# 8. Módulo Fenaban

## 8.1. Parcela variável Fenaban

Regra-base:

```text
FEN_VAR = 0,45 × SP
```

O ACT histórico e o material atual admitem ajuste quando necessário para respeitar o percentual máximo de distribuição definido pelo controlador.

Logo, a forma mais correta no motor é:

```text
FEN_VAR_BRUTA = 0,45 × SP
FEN_VAR = FEN_VAR_BRUTA × fator_de_ajuste_controlador
```

Onde, na situação normal:

```text
fator_de_ajuste_controlador = 1
```

## 8.2. Parcela fixa Fenaban

O material do BB esclarece que a parcela fixa Fenaban:

- é definida a cada semestre;
- funciona como instrumento para maximizar a distribuição do montante destinado à PLR;
- é calculada após as demais parcelas, conforme disponibilidade financeira do programa.

Portanto, para previsão futura ela **não deve ser presumida permanentemente como zero**. Quando ainda desconhecida, deve ser representada como:

```text
FEN_FIXA = desconhecida / cenário
```

Para 1S2026, os exemplos divulgados são consistentes com:

```text
FEN_FIXA = R$ 0,00
```

---

# 9. Multiplicadores por grupamento — 1S2026

Material oficial do BB:

| Grupamento | Multiplicador | Frequência |
|---|---:|---:|
| Primeiros Gestores de Unidade Estratégica | 0,85 | 30 |
| Executivos e Especialistas I | 0,85 | 255 |
| Super Comerciais e Primeiros Gestores Ce… | 0,85 | 262 |
| Gestores Exterior Grupo 1 | 0,85 | 16 |
| Gestores Exterior Grupo 2 | 0,85 | 11 |
| Gestores Grupo 1 e Especialistas II | 0,84 | 6.277 |
| Gestores Grupo 2 e Especialistas III | 0,73 | 1.769 |
| Demais Gestores | 0,73 | 24.769 |
| Técnico e Assessoramento — Grupo 1 | 0,84 | 18 |
| Técnico e Assessoramento — Grupo 2 | 0,73 | 5.352 |
| Técnico e Assessoramento — Grupo 3 | 0,71 | 4.335 |
| Técnico e Assessoramento — Grupo 4 | 0,71 | 4.116 |
| Técnico e Assessoramento — Grupo 5 | 0,71 | 833 |
| Operacional Grupo 1 | 0,71 | 15.733 |
| Operacional Grupo 2 | 0,71 | 2.000 |
| Não Comissionados | 0,00 | 21.634 |
| **Total** | — | **87.409** |

O simulador deve modelar explicitamente as cinco classes:

```text
0,00
0,71
0,73
0,84
0,85
```

---

# 10. Total-alvo e Parcela Variável BB

Para empregado elegível à parcela variável:

```text
ALVO = SP × M
```

A fórmula divulgada pelo BB é:

```text
BB_VAR_INT =
    ALVO
  - BB_FIXA
  - FENABAN_TOTAL
```

Onde:

```text
FENABAN_TOTAL = FEN_VAR + FEN_FIXA
```

Entretanto, o valor negativo não reduz as demais parcelas:

```text
BB_VAR_INT = max(
    0,
    SP × M - BB_FIXA - FENABAN_TOTAL
)
```

Essa é uma regra crucial.

Portanto, o multiplicador é um **alvo para determinação do residual variável**, e não necessariamente um teto absoluto da PLR.

Se `BB_FIXA + FENABAN_TOTAL > ALVO`, a parcela variável é zerada, mas as parcelas já calculadas permanecem.

---

# 11. Fator Conexão

A parcela variável BB está vinculada ao resultado da unidade no Conexão.

Tabela divulgada pelo BB:

| Pontuação Conexão | Percentual da BB variável |
|---:|---:|
| ≥ 1.000 | 100% |
| 990 a 999,99 | 99% |
| 980 a 989,99 | 98% |
| 970 a 979,99 | 97% |
| 960 a 969,99 | 96% |
| 950 a 959,99 | 95% |
| 900 a 949,99 | 75% |
| 800 a 899,99 | 50% |
| < 800 | 0% |

Definir:

```text
PC = percentual_conexao(score)
```

E:

```text
BB_VAR = BB_VAR_INT × PC
```

Logo:

```text
PLR_BRUTA =
    BB_FIXA
  + FENABAN_TOTAL
  + BB_VAR
```

Para empregado sem parcela variável, `BB_VAR = 0`.

---

# 12. Proporcionalidade

O material do BB informa que o cálculo considera:

- dias efetivamente trabalhados/elegíveis;
- exercício de cargos e funções durante o período;
- ausências conforme regras do ACT;
- alterações de função durante o semestre.

Logo, um único código de função atual pode não ser suficiente.

O modelo recomendado é calcular por **segmentos funcionais**:

```text
segmento_i = {
    data_inicio,
    data_fim,
    SP_i,
    multiplicador_i,
    elegibilidade_i,
    score_conexao_i
}
```

Para cada componente sujeito à proporcionalidade:

```text
FP_i = dias_elegiveis_i / dias_base_do_semestre
```

E o valor do empregado deve ser a soma dos segmentos aplicáveis.

Ausências que o ACT expressamente considera como não-interruptivas devem manter elegibilidade.

A fórmula exata de proporcionalidade deve permanecer parametrizada para acompanhar o texto do ACT vigente.

---

# 13. Teto individual anual

O material novo do BB confirma a existência de teto individual negociado.

Na negociação de 2024, foi divulgada publicamente a elevação do teto anual da PLR para:

```text
7 salários paradigma por ano
```

Para implementação:

```text
CAP_ANUAL = 7 × SP_base_do_teto
```

Entretanto, antes de tornar esse cálculo rígido para 2026/2027, deve-se validar no texto integral do novo ACT:

- qual SP é usado no teto quando há alteração funcional;
- se o teto é proporcionalizado;
- se todas as parcelas entram no teto;
- como o adiantamento e a parcela final são conciliados.

Até essa validação, o motor deve sinalizar o teto como **regra existente, com parametrização pendente**.

---

# 14. Contribuição negocial

O material interno do BB de setembro/2026 informa:

```text
alíquota = até 1,5% do valor creditado como PLR
teto = R$ 274,37 por pagamento
```

Assim, quando aplicável:

```text
CN = min(
    PLR_BRUTA × 0,015,
    274,37
)
```

A aplicação concreta depende do instrumento coletivo/base sindical correspondente e de eventual condição específica de oposição ou elegibilidade prevista na convenção aplicável. O simulador deve permitir parametrização por base, em vez de assumir universalmente a cobrança.

---

# 15. Imposto de Renda sobre PLR — 2026

A PLR utiliza tabela exclusiva de IR.

Tabela vigente:

| PLR anual acumulada | Alíquota | Dedução |
|---:|---:|---:|
| até R$ 8.214,40 | 0% | R$ 0,00 |
| R$ 8.214,41 a R$ 9.922,28 | 7,5% | R$ 616,08 |
| R$ 9.922,29 a R$ 13.167,00 | 15% | R$ 1.360,25 |
| R$ 13.167,01 a R$ 16.380,38 | 22,5% | R$ 2.347,78 |
| acima de R$ 16.380,38 | 27,5% | R$ 3.166,80 |

Função:

```text
IR_TOTAL(base_anual) =
    max(0, base_anual × aliquota - deducao)
```

Se já houve pagamento no mesmo ano:

```text
IR_PAGAMENTO_ATUAL =
    max(
        0,
        IR_TOTAL(PLR_ANTERIOR + PLR_ATUAL)
        - IR_JA_RETIDO
    )
```

Essa é a lógica atualmente usada pelo simulador e está correta para acumulação de pagamentos de PLR no ano pela mesma fonte pagadora.

---

# 16. Fórmula consolidada do cálculo individual

Sem proporcionalidade e sem teto anual, a versão-base é:

```text
BB_FIXA = 0,04 × LB / N

FEN_VAR = 0,45 × SP
FEN_TOTAL = FEN_VAR + FEN_FIXA

ALVO = SP × M

BB_VAR_INT =
    max(0, ALVO - BB_FIXA - FEN_TOTAL)

BB_VAR =
    BB_VAR_INT × PC

PLR_BRUTA =
    BB_FIXA + FEN_TOTAL + BB_VAR

CN =
    min(PLR_BRUTA × aliquota_CN, teto_CN)
    # somente se aplicável

IR_PAGAMENTO =
    max(
        0,
        IR_TOTAL(PLR_ANTERIOR + PLR_BRUTA)
        - IR_JA_RETIDO
    )

PLR_LIQ =
    PLR_BRUTA - IR_PAGAMENTO - CN
```

Depois devem ser aplicadas as regras de:

- proporcionalidade;
- histórico de funções;
- elegibilidade;
- teto individual anual;
- eventual ajuste global para respeitar o percentual máximo do lucro.

---

# 17. Validação contra exemplos oficiais do BB — 1S2026

## 17.1. Função 17037 — Ger. Geral UN

Dados:

```text
SP = 34.251,54
M = 0,84
BB_FIXA = 3.241,99
FEN_FIXA = 0
PC = 100%
```

Cálculo:

```text
ALVO = 34.251,54 × 0,84
ALVO = 28.771,29

FEN_VAR = 34.251,54 × 0,45
FEN_VAR = 15.413,19

BB_VAR_INT =
28.771,29 - 15.413,19 - 3.241,99
= 10.116,11

PLR_BRUTA =
15.413,19 + 3.241,99 + 10.116,11
= 28.771,29
```

Reproduz o exemplo do BB.

## 17.2. Função 17316 — Ger. Relac. UN

```text
SP = 10.489,46
M = 0,73
ALVO = 7.657,31
FEN_VAR = 4.720,26
BB_FIXA = 3.241,99

residual = -304,94
BB_VAR = 0

PLR_BRUTA = 7.962,25
```

O pagamento supera o alvo `SP × M` porque a variável negativa é zerada.

## 17.3. Função 17513 — Assist. Neg.

```text
SP = 6.697,55
M = 0,71
ALVO = 4.755,26
FEN_VAR = 3.013,90
BB_FIXA = 3.241,99

residual = -1.500,63
BB_VAR = 0

PLR_BRUTA = 6.255,89
```

## 17.4. Função 17408 — Especialista

```text
SP = 8.651,26
M = 0,71
ALVO = 6.142,39
FEN_VAR = 3.893,07
BB_FIXA = 3.241,99

residual = -992,66
BB_VAR = 0

PLR_BRUTA = 7.135,06
```

As diferenças de centavos eventualmente observadas no material decorrem de arredondamento intermediário.

---

# 18. Auditoria do simulador atual

Repositório auditado:

```text
bmachadovr/plr-bb
branch: main
versão de dados.js: 0.7.0
```

Arquivos principais:

- `index.html`
- `dados.js`
- `dados.csv`
- `README.md`

## 18.1. Pontos corretos

### A. Base PLR reconstruída do 1S2026

O valor:

```text
7,084477598 bilhões
```

é consistente com:

```text
BB_FIXA = 3.241,99
N = 87.409
```

### B. Parcela linear

O código usa:

```javascript
(lucro * 1e9 * .04) / participantes
```

Correto.

### C. Fenaban variável

O código usa:

```javascript
vr * 45%
```

Correto para a regra-base.

### D. Residual variável

O código usa:

```javascript
max(0, alvo - Fenaban - linear)
```

Correto e compatível com os exemplos oficiais.

### E. IR

A tabela e a lógica acumulada de IR estão corretas para 2026.

---

# 19. Inconsistências e lacunas encontradas

## CRÍTICO 1 — Conexão não é considerado

O código calcula a BB variável integral e paga 100% sempre que positiva.

Atual:

```text
BB_VAR = max(0, ALVO - FENABAN - BB_FIXA)
```

Necessário:

```text
BB_VAR =
    max(0, ALVO - FENABAN - BB_FIXA)
    × percentual_conexao
```

**Impacto:** pode superestimar significativamente empregados em unidades com pontuação inferior a 1.000.

---

## CRÍTICO 2 — Faixa 0,85 não está implementada de forma utilizável

`dados.csv` possui `mult_nivel_085 = 0.85`, mas `dados.js` só possui faixas:

```text
0,00
0,71
0,73
0,84
```

e a função de cálculo usa exclusivamente o mapeamento de código para essas faixas.

**Impacto:** cargos dos grupamentos superiores não podem ser calculados corretamente.

**Correção:** criar `FAIXA_085` ou, preferencialmente, abandonar nomes genéricos de faixa e usar `grupamento_id` + `multiplicador`.

---

## CRÍTICO 3 — Proporcionalidade e histórico funcional ausentes

O simulador considera um único:

- código de função;
- SP;
- multiplicador;

para o semestre inteiro.

O material oficial diz que dias trabalhados e exercício de funções no período são considerados.

**Impacto:** erro para promoção, mudança de função, afastamento, cessão ou ingresso/saída no período.

---

## ALTO 4 — Teto anual da PLR não é aplicado

O simulador não possui qualquer conciliação com o teto individual anual.

**Impacto:** especialmente relevante nas faixas de maior remuneração e na soma dos dois semestres.

---

## ALTO 5 — Contribuição negocial sem teto

Atual:

```text
CN = PLR_BRUTA × 1,5%
```

Novo material do BB:

```text
CN = min(PLR_BRUTA × 1,5%, R$ 274,37)
```

**Impacto:** o simulador desconta valor excessivo em PLRs superiores a aproximadamente R$ 18.291,33.

Além disso, a aplicação deve ser configurável conforme base/instrumento aplicável.

---

## ALTO 6 — Projeção automática do multiplicador não tem fórmula normativa validada

Para períodos projetados, o código faz:

```text
multiplicador_futuro =
    multiplicador_referencia
    ×
    (
      lucro_distribuível_per_capita_futuro
      /
      lucro_distribuível_per_capita_referencia
    )
```

O material do BB apenas afirma que os multiplicadores por grupamento consideram a evolução percentual do lucro. Não há, nas fontes consolidadas até aqui, suporte para afirmar que essa relação seja linear e per capita.

**Impacto:** a projeção pode produzir multiplicadores artificialmente altos ou baixos.

**Recomendação:** até haver regra oficial:
1. usar último multiplicador conhecido como cenário-base;
2. permitir cenário manual;
3. mostrar intervalo;
4. não chamar o multiplicador projetado de resultado derivado de regra oficial.

---

## ALTO 7 — Fenaban fixa desconhecida é silenciosamente tratada como zero

Para 2S2026 o campo está vazio, mas o motor transforma a ausência em zero para cálculo.

Embora a confiança seja reduzida, o resultado numérico parece completo.

**Impacto:** risco de subestimar a PLR.

**Correção:** diferenciar explicitamente:

```text
0 = valor oficial zero
null = ainda não conhecido
```

Se `null`, retornar cenário ou intervalo, não um valor pontual sem ressalva forte.

---

## MÉDIO 8 — Indicador corporativo não reconcilia efetivamente o bolo

A tabela de acionamento do percentual de lucro existe em `dados.js`, porém seu efeito principal no simulador está associado à projeção do multiplicador.

Para uma previsão robusta, deve existir uma etapa global:

```text
BOLO_MAX = LB × percentual_lucro_acionado
```

e uma reconciliação entre:

```text
soma(BB fixa)
+ soma(Fenaban)
+ soma(BB variável)
<= BOLO_MAX
```

com os ajustes previstos no acordo.

---

## MÉDIO 9 — README diverge da interface

O README afirma que o usuário pode informar/ajustar o lucro-base projetado.

Na interface, `lucroProjetado` é `readonly`.

**Correção:** alinhar documentação e produto. Para previsão, faz sentido oferecer um modo de cenário, sem permitir editar dados oficiais históricos.

---

## MÉDIO 10 — Mapeamento função → faixa é opaco e incompleto

A lista de códigos é manual e não registra:

- nome da função;
- grupamento oficial;
- período de vigência;
- origem da classificação.

**Correção recomendada:**

```text
codigo_funcao
nome_funcao
grupamento_id
multiplicador
inicio_vigencia
fim_vigencia
fonte
```

---

## MÉDIO 11 — Não há mecanismo formal de arredondamento

Os exemplos do BB podem arredondar parcelas em etapas diferentes.

Definir política explícita, por exemplo:

```text
- cálculos internos: precisão decimal alta;
- parcelas apresentadas: 2 casas;
- valor creditado: reproduzir a sequência de arredondamento do BB quando validada.
```

Criar testes tolerando inicialmente diferença de até R$ 0,02, até confirmar a política oficial.

---

# 20. Nova arquitetura recomendada do motor de cálculo

Separar o sistema em quatro camadas.

## 20.1. Camada A — Parâmetros do programa

Por período:

```json
{
  "periodo": "1S2026",
  "lucro_base": 7084477597.75,
  "participantes": 87409,
  "bb_fixa": 3241.99,
  "fenaban_fixa": 0,
  "percentual_fenaban": 0.45,
  "percentual_max_lucro": 0.1125,
  "teto_anual_salarios": 7
}
```

## 20.2. Camada B — Tabelas

- grupamentos e multiplicadores;
- códigos de função e vigência;
- tabela Conexão;
- tabela de acionamento corporativo;
- tabela de IR;
- contribuição negocial.

## 20.3. Camada C — Histórico individual

```json
{
  "segmentos": [
    {
      "inicio": "...",
      "fim": "...",
      "codigo_funcao": "...",
      "salario_paradigma": 0,
      "conexao": 1000
    }
  ],
  "ausencias": [],
  "plr_anterior_ano": 0,
  "ir_plr_retido_ano": 0
}
```

## 20.4. Camada D — Motor puro

Funções sem dependência de interface:

```text
calcularBBFixa()
calcularFenaban()
calcularAlvo()
calcularPercentualConexao()
calcularBBVariavel()
calcularProporcionalidade()
aplicarTetoAnual()
calcularIRPLR()
calcularContribuicaoNegocial()
calcularPLR()
```

Isso permitirá testes unitários e evita que regras de negócio fiquem embutidas no HTML.

---

# 21. Modelo de previsão futura

Uma previsão deve separar claramente três classes de dado:

## Oficial

Já publicado pelo BB/ACT.

## Inferido

Reconstruído matematicamente a partir de valores oficiais.

## Cenário

Hipótese ainda não divulgada.

Para um semestre futuro, os principais parâmetros são:

```text
LB
N
percentual de acionamento corporativo
Fenaban fixa
multiplicadores por grupamento
SP por período
Conexão
proporcionalidade individual
teto anual remanescente
tabela de IR
contribuição negocial
```

Nunca transformar automaticamente um parâmetro desconhecido em zero.

---

# 22. Cenários recomendados

Para pagamentos ainda não divulgados:

### Cenário conservador

- lucro-base inferior;
- Conexão real;
- Fenaban fixa = 0 somente como hipótese explicitada;
- multiplicador igual ao último oficial ou limite inferior do intervalo.

### Cenário-base

- consenso/projeção escolhida para `LB`;
- participantes atualizados;
- último multiplicador oficial, salvo nova regra;
- Conexão informado pelo usuário.

### Cenário otimista

- lucro-base superior;
- atingimento corporativo máximo;
- sem inventar multiplicador além de limite plausível/documentado.

O resultado deve ser exibido como intervalo enquanto existirem parâmetros materiais desconhecidos.

---

# 23. Testes mínimos obrigatórios

## Testes de regressão 1S2026

1. `17037`, SP 34.251,54, M 0,84 → bruto ≈ 28.771,29.
2. `17316`, SP 10.489,46, M 0,73 → BB variável = 0; bruto ≈ 7.962,25.
3. `17513`, SP 6.697,55, M 0,71 → BB variável = 0; bruto ≈ 6.255,89.
4. `17408`, SP 8.651,26, M 0,71 → BB variável = 0; bruto ≈ 7.135,06.
5. Não comissionado → M = 0; BB variável = 0; mantém Fenaban + BB fixa.
6. Cargo de grupo 0,85 → deve aceitar e calcular 0,85.
7. Conexão 950 → pagar 95% apenas da BB variável.
8. Conexão 899 → pagar 50% apenas da BB variável.
9. Conexão <800 → BB variável = 0.
10. Contribuição de 1,5% acima do teto → limitar a R$ 274,37.
11. Segundo pagamento do ano → IR = IR sobre acumulado menos IR já retido.
12. Fenaban fixa `null` → não produzir silenciosamente estimativa pontual equivalente a zero.

---

# 24. Prioridade de correções do projeto

## P0 — antes de usar para previsão individual confiável

- implementar Conexão;
- implementar faixa/multiplicador 0,85;
- aplicar teto da contribuição negocial;
- distinguir `null` de `0` em parâmetros;
- criar testes de regressão com os exemplos oficiais.

## P1 — antes da projeção do próximo semestre

- remover/substituir projeção linear não validada dos multiplicadores;
- modelar histórico funcional/proporcionalidade;
- implementar teto anual;
- estruturar códigos de função com vigência;
- criar reconciliação do bolo máximo de PLR.

## P2 — qualidade e manutenção

- mover regras de negócio para módulo separado do HTML;
- versionar fontes por regra;
- registrar confiança por parâmetro, não apenas um percentual agregado;
- alinhar README à interface;
- documentar política de arredondamento.

---

# 25. Conclusão técnica

O simulador atual **reproduz corretamente a mecânica central dos exemplos oficiais do 1S2026** quando:

- o empregado permanece a mesma função no semestre;
- Conexão = 100%;
- não há efeito do teto anual;
- não há Fenaban fixa;
- usa-se um dos multiplicadores atualmente mapeados;
- a contribuição negocial não ultrapassa seu teto.

Portanto, a base existente é útil, mas **ainda não é um motor completo de PLR**.

A principal mudança conceitual necessária é deixar de tratar o cálculo como apenas:

```text
SP + multiplicador + lucro
```

e passar a tratá-lo como:

```text
programa global
+ parâmetros semestrais
+ grupamento funcional
+ histórico individual
+ Conexão
+ limites coletivos
+ teto individual
+ tributação
```

Com essa estrutura, os próximos pagamentos poderão ser previstos de forma progressivamente mais precisa à medida que o BB divulgar cada parâmetro, sem precisar reescrever a lógica do simulador.
