# Decisões de escopo e cálculo do simulador

**Data:** 18/09/2026  
**Complementa:** `REGRAS_PLR_BB.md`

## Decisões de escopo

1. **Conexão** faz parte do cálculo da parcela variável BB. O usuário pode informar o percentual; quando o campo estiver vazio, o default é **100%**.
2. O multiplicador **0,85** existe no programa do BB, mas os respectivos grupamentos **não fazem parte do público-alvo deste simulador** e permanecem fora da interface e do mapeamento funcional.
3. Mudança de função durante o semestre, proporcionalidade por dias trabalhados, admissões/desligamentos e demais situações individuais de proporcionalidade **não fazem parte do escopo atual**.
4. Para o limite individual anual, o simulador utiliza o parâmetro já definido no projeto de **7 salários paradigma por ano**, considerando a PLR bruta anteriormente informada no mesmo ano.
5. A contribuição negocial, quando aplicável, é calculada como **1,5% da PLR bruta**, limitada a **R$ 274,37 por pagamento**.
6. Valor vazio de parcela fixa Fenaban não equivale a zero oficial. Enquanto desconhecida, o simulador usa **R$ 0,00 somente como premissa provisória**, exibe aviso e reduz a confiança da projeção.

## Conexão

```text
BB_VARIAVEL_INTEGRAL = max(0, ALVO - FENABAN - BB_FIXA)
BB_VARIAVEL_PAGA = BB_VARIAVEL_INTEGRAL × percentual_conexao
```

Se o usuário não preencher o campo:

```text
percentual_conexao = 100%
```

## Contribuição negocial

```text
CONTRIBUICAO = min(PLR_BRUTA × 1,5%, 274,37)
```

Somente aplicada quando a opção correspondente estiver marcada.

## Teto anual

```text
TETO_ANUAL = 7 × SALARIO_PARADIGMA
TETO_REMANESCENTE = max(0, TETO_ANUAL - PLR_BRUTA_JA_RECEBIDA_NO_ANO)
PLR_BRUTA_PAGAMENTO = min(PLR_BRUTA_CALCULADA, TETO_REMANESCENTE)
```

## Verificação histórica da evolução do multiplicador

A cláusula 8ª do ACT de PLR 2024/2025 estabelece que a quantidade de salários paradigma é definida pelo Banco a cada período e **pode sofrer alterações em função do montante de recursos a distribuir decorrente do lucro líquido obtido no período**.

Para testar empiricamente essa relação foram usados os dados oficiais/reconstruídos de 1S2025, 2S2025 e 1S2026.

### 1S2025

- Público-alvo: **88.921**
- BB Fixa: **R$ 4.999,37**
- Lucro-base reconstruído: aproximadamente **R$ 11,1137 bi**
- Multiplicadores relevantes ao público do simulador: **1,26 / 1,30 / 1,49**

### 2S2025

- Público-alvo: **88.497**
- BB Fixa: **R$ 3.911,68**
- Lucro-base reconstruído: aproximadamente **R$ 8,6543 bi**
- Multiplicadores equivalentes: **0,96 / 0,99 / 1,14**

### 1S2026

- Público-alvo: **87.409**
- BB Fixa: **R$ 3.241,99**
- Lucro-base reconstruído: aproximadamente **R$ 7,0845 bi**
- Multiplicadores equivalentes: **0,71 / 0,73 / 0,84**

### Relações observadas

Entre **1S2025 e 2S2025**:

- lucro-base por participante: queda de aproximadamente **21,8%**;
- multiplicadores: queda de aproximadamente **23,5% a 23,8%**.

Entre **2S2025 e 1S2026**:

- lucro-base por participante: queda de aproximadamente **17,1%**;
- multiplicadores: queda de aproximadamente **26,2% a 26,3%**.

Conclusão: a direção e a intensidade dos multiplicadores guardam forte relação com a evolução do lucro, confirmando a informação do Banco/ACT. Porém, os dados não sustentam uma proporcionalidade linear 1:1.

A elasticidade implícita observada foi de aproximadamente:

```text
1S2025 → 2S2025: 1,11
2S2025 → 1S2026: 1,62
```

Como estimador provisório, o projeto passa a usar o ponto intermediário arredondado:

```text
ELASTICIDADE_PROJECAO = 1,35

multiplicador_projetado =
  multiplicador_referencia
  × (indice_lucro_distribuivel_per_capita ^ 1,35)
```

Esse fator é **empírico, não normativo**. Deve ser recalibrado quando novos períodos oficiais forem conhecidos. O simulador deve continuar identificando esse multiplicador como projeção, nunca como dado oficial.

## Tratamento de dado ausente

Regra geral do projeto:

```text
0    = valor conhecido igual a zero
null = valor ainda não conhecido
```

Nunca converter silenciosamente `null` em dado oficial igual a zero. Quando uma hipótese numérica for necessária para permitir projeção, a hipótese deve aparecer claramente na interface e na memória de cálculo.
