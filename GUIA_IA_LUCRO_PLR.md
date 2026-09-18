# Guia para IA — Reconstrução do lucro-base da PLR

## Objetivo

Este documento orienta uma IA a estimar o **lucro-base usado no cálculo da PLR** a partir dos resultados financeiros divulgados para o período.

O objetivo não é usar diretamente o lucro destacado em release, notícia ou apresentação. A IA deve reconstruir a base mais próxima possível da utilizada no programa de PLR e informar claramente o grau de confiança da estimativa.

---

## Regra principal

A reconstrução deve partir preferencialmente das demonstrações contábeis consolidadas do período.

Modelo-base:

```text
Lucro-base PLR estimado =
    Lucro líquido consolidado
  + Remuneração variável de funcionários e administradores considerada na regra
  - Prejuízos acumulados aplicáveis
  + Reservas de reavaliação transferidas
  + Outros ajustes líquidos comprovadamente aplicáveis
```

Não confundir:

- lucro líquido consolidado;
- lucro líquido ajustado divulgado ao mercado;
- lucro recorrente;
- lucro gerencial;
- lucro individual da controladora;
- lucro-base da PLR.

O número destacado no release de resultados pode ser útil como referência, mas **não deve ser usado automaticamente como lucro-base da PLR**.

---

## Hierarquia de fontes

A IA deve priorizar as fontes nesta ordem:

1. Demonstrações contábeis oficiais do período.
2. Notas explicativas oficiais.
3. Central de resultados / RI da instituição.
4. Documento oficial do programa de PLR, ACT/CCT ou comunicação corporativa.
5. Documentos públicos de órgãos de controle ou governança de empresas estatais.
6. Comunicados sindicais que reproduzam dados oficiais.
7. Imprensa econômica apenas como apoio ou conferência.

Se uma fonte secundária divergir das demonstrações oficiais, prevalece a fonte primária, salvo evidência documental em contrário.

---

## Período correto

A apuração deve ser feita sobre o período correspondente à PLR:

```text
1º semestre: janeiro a junho
2º semestre: julho a dezembro
```

Para o primeiro semestre, utilizar valores acumulados de 6 meses, e não apenas o resultado do segundo trimestre.

Para o segundo semestre, quando a demonstração publica apenas valores acumulados no ano, calcular quando necessário:

```text
2S = Ano completo - 1S
```

Aplicar o mesmo princípio a todas as rubricas utilizadas na reconstrução.

---

## Etapa 1 — Identificar o lucro líquido consolidado

Localizar nas demonstrações o valor de **lucro líquido consolidado** correspondente ao período.

Registrar:

```text
lucro_liquido_consolidado
fonte
página/nota
período
unidade monetária
```

Dar preferência ao consolidado, não ao resultado individual da controladora.

---

## Etapa 2 — Identificar remuneração variável / participação de empregados e administradores

Pesquisar nas demonstrações e notas por termos como:

```text
participação de empregados no lucro
participação de administradores no lucro
participação de empregados e administradores
remuneração variável
remuneração variável de administradores
remuneração baseada em ações
benefícios de curto prazo
pessoal-chave da administração
```

Atenção: uma única linha da DRE pode não conter todo o conceito de remuneração variável utilizado na fórmula interna da PLR.

A IA deve:

1. identificar a linha principal da demonstração;
2. verificar notas explicativas que detalhem remuneração variável;
3. evitar somar duas vezes valores que já estejam contidos em uma rubrica maior;
4. documentar qualquer diferença entre o conceito contábil encontrado e o conceito exigido pela regra da PLR.

---

## Etapa 3 — Verificar prejuízos acumulados

Pesquisar na Demonstração das Mutações do Patrimônio Líquido e nas notas explicativas por:

```text
prejuízos acumulados
lucros ou prejuízos acumulados
absorção de prejuízos
ajustes de exercícios anteriores
outros lançamentos em lucros acumulados
```

Somente deduzir valores que tenham relação com a fórmula aplicável ao programa de PLR.

Não assumir que qualquer lançamento na coluna de lucros acumulados deva ser deduzido.

---

## Etapa 4 — Verificar reservas de reavaliação

Pesquisar por:

```text
reserva de reavaliação
realização de reserva de reavaliação
transferência para lucros acumulados
```

Adicionar apenas valores efetivamente transferidos no período e compatíveis com a regra de apuração da PLR.

Se não houver lançamento, usar zero e registrar que não foi encontrado ajuste material.

---

## Etapa 5 — Outros ajustes

Somente incluir outros ajustes quando houver base documental clara.

Exemplos possíveis:

```text
ajustes diretamente em lucros/prejuízos acumulados
reclassificações patrimoniais previstas na regra
ajustes de exercícios anteriores expressamente considerados
```

Nunca utilizar um ajuste apenas para fazer o resultado "fechar" com um pagamento conhecido.

O pagamento conhecido pode ser usado para validação, não para inventar a composição contábil.

---

## Etapa 6 — Calcular o lucro-base estimado

Exemplo:

```text
Lucro líquido consolidado             6,264663 bi
+ remuneração variável                0,730278 bi
- prejuízos acumulados                0,000000 bi
+ reserva de reavaliação              0,000000 bi
+ outros ajustes                      0,000000 bi
--------------------------------------------------
Lucro-base PLR preliminar             6,994941 bi
```

Se forem encontrados outros ajustes comprovados, recalcular.

---

## Etapa 7 — Validar pela parcela linear

Quando houver informação sobre a parcela linear paga e o público-alvo, usar como teste independente:

```text
Parcela linear = 4% × Lucro-base PLR / participantes
```

Logo:

```text
Lucro-base implícito =
Parcela linear × participantes / 0,04
```

Esta validação é muito importante, mas não deve substituir a reconstrução contábil.

Classificação sugerida:

```text
Diferença <= 0,5%    excelente convergência
0,5% a 1,5%          boa convergência
1,5% a 3,0%          revisar ajustes e universo de participantes
> 3,0%                provável parâmetro incorreto ou conceito incompleto
```

---

## Etapa 8 — Estimar participantes quando o número oficial ainda não existir

Se o público-alvo exato não estiver disponível, usar:

```text
Participantes projetados =
Participantes do período anterior
× Quadro atual de empregados
/ Quadro do período anterior
```

Se não houver quadro atualizado, manter provisoriamente o último público-alvo conhecido.

Não tratar quadro total de empregados como equivalente automático ao público-alvo da PLR.

Registrar a qualidade da estimativa.

---

## Etapa 9 — Saída obrigatória da IA

A resposta deve sempre devolver uma estrutura semelhante a esta:

```text
Período: 2S2026

Lucro líquido consolidado: R$ X,XXXXXX bi
Remuneração variável considerada: R$ X,XXXXXX bi
Prejuízos acumulados: R$ X,XXXXXX bi
Reservas de reavaliação transferidas: R$ X,XXXXXX bi
Outros ajustes: R$ X,XXXXXX bi

Lucro-base PLR estimado: R$ X,XXXXXX bi
Confiança: XX%

Participantes projetados: XX.XXX
Parcela linear estimada: R$ X.XXX,XX

Fontes utilizadas:
- documento / data / página ou nota
- documento / data / página ou nota

Pendências:
- listar variáveis ainda não confirmadas
```

---

## Modelo de confiança

Sugestão de pesos para o lucro-base:

```text
Lucro líquido consolidado oficial                40%
Remuneração variável identificada                30%
Ajustes patrimoniais verificados                 15%
Convergência com parcela linear / histórico      15%
```

Regras adicionais:

- limitar a confiança a 95% enquanto o lucro-base não tiver sido divulgado de forma oficial para a PLR;
- reduzir a confiança se remuneração variável for inferida apenas por aproximação;
- reduzir a confiança se o número de participantes ainda for projetado;
- aumentar a confiança quando a parcela linear estimada convergir com pagamentos ou comunicados oficiais.

---

## Erros que a IA deve evitar

Não fazer:

```text
usar automaticamente lucro líquido ajustado do release;
usar resultado trimestral como se fosse semestral;
usar lucro individual quando a regra exige consolidado;
tratar número de empregados como público-alvo exato;
inventar ajustes para fechar com o valor esperado;
somar remuneração variável duas vezes;
confundir PLR total com parcela linear;
assumir que o multiplicador decorre diretamente do lucro por uma regra pública simples.
```

---

## Integração com a calculadora

Depois de reconstruir os dados, a IA deve fornecer para `configuracao.html`:

```text
lucro-base PLR estimado
qualidade/origem do lucro-base
participantes conhecidos ou projetados
VR atual e eventual reajuste até a data-base
parcela fixa Fenaban, se conhecida
metas corporativas
percentual do lucro destinado ao bolo da PLR
quantidade de pessoas por faixa, se disponível
VR médio por faixa, se disponível
```

Com esses dados, a página calcula:

```text
Parcela linear = 4% × lucro-base / participantes

VR referência =
VR atual / (1 + reajuste após a data-base)

Fenaban individual =
percentual Fenaban × VR referência + parcela fixa

Bolo total =
lucro-base × percentual destinado à PLR
```

Quando houver composição por faixa, a configuração pode estimar os multiplicadores preservando a relação histórica entre as faixas e ajustando a escala para o bolo disponível.

---

## Princípio final

A IA deve sempre distinguir:

```text
DADO OFICIAL
DADO RECONSTRUÍDO
DADO PROJETADO
DADO INFERIDO
```

O objetivo não é produzir falsa precisão. O objetivo é obter a melhor estimativa possível, explicar sua composição e permitir que a projeção seja atualizada progressivamente conforme novos dados oficiais forem publicados.
