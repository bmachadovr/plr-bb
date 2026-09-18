/* Regras fixas da Calculadora de PLR. Os parâmetros semestrais ficam em dados.csv. */

window.PLR_DATA = {
  versao: "0.8.0",
  atualizadoEm: "2026-09-18",

  app: {
    titulo: "Calculadora de PLR",
    periodoPadrao: "1S2026",
    margemProjecaoPct: 5,
    aviso: "Estimativa independente baseada nas regras e dados cadastrados. O valor oficial depende das regras e instrumentos vigentes aplicáveis."
  },

  regras: {
    percentualMaximoLucro: 11.25,
    tetoAnualSalariosParadigma: 7,
    conexaoDefaultPct: 100,
    projecaoMultiplicador: {
      metodo: "elasticidade_historica_lucro_per_capita",
      elasticidade: 1.35,
      amostra: "1S2025→2S2025 e 2S2025→1S2026",
      observacao: "Coeficiente empírico para projeção, não fórmula normativa do Banco."
    },
    faixasMetas: [
      { min: 100, pagamentoPct: 100, percentualLucro: 11.25 },
      { min: 99, pagamentoPct: 99, percentualLucro: 11.14 },
      { min: 98, pagamentoPct: 98, percentualLucro: 11.03 },
      { min: 97, pagamentoPct: 97, percentualLucro: 10.91 },
      { min: 96, pagamentoPct: 96, percentualLucro: 10.80 },
      { min: 95, pagamentoPct: 95, percentualLucro: 10.69 },
      { min: 90, pagamentoPct: 75, percentualLucro: 8.44 },
      { min: 80, pagamentoPct: 50, percentualLucro: 5.63 },
      { min: 0, pagamentoPct: 0, percentualLucro: 0 }
    ],
    contribuicaoSindical: {
      habilitadaPorPadrao: true,
      aliquotaPct: 1.5,
      tetoPorPagamento: 274.37
    }
  },

  irPlr: {
    ano: 2026,
    fonte: "Receita Federal — Tributação de 2026",
    fonteUrl: "https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2026",
    faixas: [
      { ate: 8214.40, aliquota: 0, deducao: 0 },
      { ate: 9922.28, aliquota: 0.075, deducao: 616.08 },
      { ate: 13167.00, aliquota: 0.15, deducao: 1360.25 },
      { ate: 16380.38, aliquota: 0.225, deducao: 2347.78 },
      { ate: null, aliquota: 0.275, deducao: 3166.80 }
    ]
  },

  faixas: {
    FAIXA_0: { nome: "Faixa 0", multiplicador1S2026: 0, somenteReferencia: true },
    FAIXA_1: { nome: "Faixa 1", multiplicador1S2026: 0.71 },
    FAIXA_2: { nome: "Faixa 2", multiplicador1S2026: 0.73 },
    FAIXA_3: { nome: "Faixa 3", multiplicador1S2026: 0.84 }
  },

  codigos: {
    "00282": "FAIXA_2",
    "04679": "FAIXA_2", "04685": "FAIXA_2", "04686": "FAIXA_2", "04687": "FAIXA_2", "04688": "FAIXA_2",
    "04689": "FAIXA_2", "04690": "FAIXA_2", "04691": "FAIXA_2", "04693": "FAIXA_2", "04699": "FAIXA_2",
    "04700": "FAIXA_2", "04701": "FAIXA_2", "04705": "FAIXA_2",
    "15021": "FAIXA_2", "15030": "FAIXA_2", "15031": "FAIXA_2",
    "16260": "FAIXA_2", "16261": "FAIXA_2", "16262": "FAIXA_2", "16270": "FAIXA_2", "16271": "FAIXA_2", "16280": "FAIXA_2", "16290": "FAIXA_2",
    "17286": "FAIXA_2", "17300": "FAIXA_2", "17301": "FAIXA_2", "17302": "FAIXA_2", "17303": "FAIXA_2", "17304": "FAIXA_2",
    "17305": "FAIXA_2", "17306": "FAIXA_2", "17307": "FAIXA_2", "17309": "FAIXA_2", "17310": "FAIXA_2", "17312": "FAIXA_2",
    "17313": "FAIXA_2", "17314": "FAIXA_2", "17315": "FAIXA_2", "17316": "FAIXA_2", "17317": "FAIXA_2", "17318": "FAIXA_2",
    "17319": "FAIXA_2", "17320": "FAIXA_2", "17322": "FAIXA_2", "17323": "FAIXA_2", "17324": "FAIXA_2", "17325": "FAIXA_2",
    "17326": "FAIXA_2", "17327": "FAIXA_2", "17332": "FAIXA_2", "17333": "FAIXA_2", "17334": "FAIXA_2", "17335": "FAIXA_2",
    "17340": "FAIXA_2", "17341": "FAIXA_2", "17342": "FAIXA_2", "17343": "FAIXA_2", "17344": "FAIXA_2", "17345": "FAIXA_2",
    "17346": "FAIXA_2", "17347": "FAIXA_2", "17400": "FAIXA_2", "17402": "FAIXA_2", "17403": "FAIXA_2", "17404": "FAIXA_2",
    "17407": "FAIXA_2", "17408": "FAIXA_2", "17409": "FAIXA_2", "17514": "FAIXA_2", "18012": "FAIXA_2", "18013": "FAIXA_2", "18016": "FAIXA_2", "18100": "FAIXA_2",

    "07116": "FAIXA_3", "07140": "FAIXA_3", "12200": "FAIXA_3",

    "04835": "FAIXA_2", "07105": "FAIXA_2", "07117": "FAIXA_2", "12307": "FAIXA_2", "12310": "FAIXA_2", "12320": "FAIXA_2",

    "04935": "FAIXA_1", "04940": "FAIXA_1", "04942": "FAIXA_1", "07006": "FAIXA_1", "07010": "FAIXA_1",
    "15050": "FAIXA_1", "15051": "FAIXA_1", "16460": "FAIXA_1", "16461": "FAIXA_1", "17511": "FAIXA_1", "17513": "FAIXA_1",
    "04954": "FAIXA_1", "04960": "FAIXA_1", "04961": "FAIXA_1", "04965": "FAIXA_1", "16480": "FAIXA_1", "16481": "FAIXA_1", "17520": "FAIXA_1",

    "00288": "FAIXA_0", "00394": "FAIXA_0", "00610": "FAIXA_0", "00621": "FAIXA_0", "00649": "FAIXA_0"
  }
};
