// Application State - Versão Simplificada
const appState = {
    contexto: {
        tipoOrganizacao: 'citizen-developer', // padrão
        tamanhoOrganizacao: '',
        setorAtuacao: ''
    },
    parametros: [],
    analise: {
        nomeProcesso: '',
        areaResponsavel: '',
        responsavelProcesso: '',
        dataAnalise: '',
        desenvolvedor: '',
        status: 'Em análise',
        processoAsIs: '',
        processoToBe: '',
        tempoManual: 0,
        tempoAutomatizado: 0,
        tempoSupervisao: 0,
        frequenciaQtd: 0,
        frequenciaPeriodo: '',
        custoDesenvolvimento: 0,
        tempoDesenvolvimento: 0,
        custoManutencao: 0,
        valorHora: 0
    },
    impacto: []
};

// Tipos de organização
const organizationTypes = [
    {
        id: 'citizen-developer',
        nome: 'Citizen Developer',
        icone: '👨‍💼',
        descricao: 'Profissional de RH sem conhecimento técnico (PADRÃO)'
    },
    {
        id: 'setor-publico',
        nome: 'Setor Público',
        icone: '🏛️',
        descricao: 'Órgãos governamentais e autarquias'
    },
    {
        id: 'consultoria',
        nome: 'Consultoria em RH',
        icone: '💼',
        descricao: 'Empresas de consultoria especializada'
    },
    {
        id: 'ong',
        nome: 'ONG/Third Sector',
        icone: '🤝',
        descricao: 'Organizações não governamentais'
    },
    {
        id: 'clube-servico',
        nome: 'Clube de Serviço',
        icone: '🎯',
        descricao: 'Associações e clubes de serviço'
    }
];

// Benefícios base (sempre mostrados)
const defaultBeneficios = [
    {
        id: 1,
        nome: "Melhoria na Experiência do Candidato (Candidate Experience)",
        peso: 3,
        descricao: "Redução do tempo de resposta e garantia de feedback para 100% dos inscritos",
        tipo: 'base'
    },
    {
        id: 2,
        nome: "Redução do Viés Inconsciente (Diversidade & Inclusão)",
        peso: 3,
        descricao: "Triagem inicial baseada em critérios técnicos objetivos, garantindo isonomia",
        tipo: 'base'
    },
    {
        id: 3,
        nome: "Qualidade da Contratação (Quality of Hire)",
        peso: 3,
        descricao: "Tempo liberado para entrevistas profundas, melhorando adequação ao cargo",
        tipo: 'base'
    },
    {
        id: 4,
        nome: "Redução do Burnout do Recrutador",
        peso: 3,
        descricao: "Eliminação de tarefas repetitivas de análise manual de currículos",
        tipo: 'base'
    },
    {
        id: 5,
        nome: "Velocidade na Contratação (Time-to-Fill)",
        peso: 2,
        descricao: "Aceleração do fechamento de vagas através de triagem automatizada",
        tipo: 'base'
    },
    {
        id: 6,
        nome: "Precisão na Triagem de Currículos",
        peso: 2,
        descricao: "Uso de critérios predefinidos para identificar candidatos qualificados",
        tipo: 'base'
    },
    {
        id: 7,
        nome: "Satisfação do Gestor Requisitante",
        peso: 2,
        descricao: "Apresentação mais rápida de candidatos qualificados",
        tipo: 'base'
    },
    {
        id: 8,
        nome: "Redução de Custos Operacionais",
        peso: 2,
        descricao: "Redução de custos com processos manuais e retrabalho",
        tipo: 'base'
    },
    {
        id: 9,
        nome: "Escalabilidade do Processo",
        peso: 1,
        descricao: "Capacidade de processar grandes volumes sem aumentar equipe proporcionalmente",
        tipo: 'base'
    },
    {
        id: 10,
        nome: "Compliance e Rastreabilidade",
        peso: 1,
        descricao: "Rastreamento completo facilitando auditorias e conformidade LGPD",
        tipo: 'base'
    }
];

// Benefícios específicos por contexto
const contextSpecificBenefits = {
    'setor-publico': [
        {
            id: 11,
            nome: "Transparência e Accountability",
            peso: 3,
            descricao: "Processo documentado e auditável para prestação de contas",
            tipo: 'contexto'
        },
        {
            id: 12,
            nome: "Otimização de Recursos Públicos",
            peso: 3,
            descricao: "Melhor aproveitamento do orçamento e recursos limitados",
            tipo: 'contexto'
        }
    ],
    'consultoria': [
        {
            id: 13,
            nome: "Diferencial Competitivo",
            peso: 3,
            descricao: "Vantagem competitiva através de processos mais eficientes",
            tipo: 'contexto'
        },
        {
            id: 14,
            nome: "Padrão de Qualidade Replicável",
            peso: 2,
            descricao: "Garantia de padrão consistente em diferentes projetos",
            tipo: 'contexto'
        }
    ],
    'ong': [
        {
            id: 15,
            nome: "Otimização de Recursos Limitados",
            peso: 3,
            descricao: "Maior eficiência com orçamentos restritos",
            tipo: 'contexto'
        },
        {
            id: 16,
            nome: "Maior Impacto Social",
            peso: 3,
            descricao: "Recursos liberados para atividades-fim da organização",
            tipo: 'contexto'
        }
    ],
    'clube-servico': [
        {
            id: 17,
            nome: "Engajamento de Voluntários",
            peso: 2,
            descricao: "Maior satisfação e retenção de voluntários",
            tipo: 'contexto'
        },
        {
            id: 18,
            nome: "Gestão de Membros Eficiente",
            peso: 2,
            descricao: "Processos administrativos otimizados para associações",
            tipo: 'contexto'
        }
    ]
};

// Chart instances
let impactoChart = null;
let tempoChart = null;
let beneficiosChart = null;
let gaugeChart = null;

// Initialize application
function initApp() {
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('dataAnalise').value = today;
    
    // Initialize organization types
    renderOrganizationTypes();
    
    // Initialize parameters with default benefits
    updateParametrosByOrganizationType('citizen-developer');
    renderParametros();
    renderImpacto();
    
    // Add event listeners for form inputs
    addFormListeners();
}

// Render organization type selector
function renderOrganizationTypes() {
    const container = document.getElementById('orgTypeSelector');
    container.innerHTML = '';
    
    organizationTypes.forEach(orgType => {
        const card = document.createElement('div');
        card.className = 'org-type-card';
        if (orgType.id === 'citizen-developer') {
            card.classList.add('selected');
        }
        
        card.innerHTML = `
            <div class="org-type-icon">${orgType.icone}</div>
            <h4>${orgType.nome}</h4>
            <p style="font-size: 12px; color: var(--color-text-secondary)">${orgType.descricao}</p>
        `;
        
        card.addEventListener('click', () => selectOrganizationType(orgType.id));
        container.appendChild(card);
    });
}

// Select organization type
function selectOrganizationType(orgTypeId) {
    const cards = document.querySelectorAll('.org-type-card');
    cards.forEach(card => card.classList.remove('selected'));
    event.target.closest('.org-type-card').classList.add('selected');
    
    appState.contexto.tipoOrganizacao = orgTypeId;
    
    // Show/hide context-specific section
    const contextSection = document.getElementById('contextSpecificSection');
    if (orgTypeId === 'citizen-developer') {
        contextSection.style.display = 'none';
    } else {
        contextSection.style.display = 'block';
    }
    
    // Update parameters based on organization type
    updateParametrosByOrganizationType(orgTypeId);
}

// Update parameters based on organization type
function updateParametrosByOrganizationType(orgTypeId) {
    // Start with base benefits
    let benefits = [...defaultBeneficios];
    
    // Add context-specific benefits if not Citizen Developer
    if (orgTypeId !== 'citizen-developer' && contextSpecificBenefits[orgTypeId]) {
        benefits = [...benefits, ...contextSpecificBenefits[orgTypeId]];
    }
    
    appState.parametros = JSON.parse(JSON.stringify(benefits));
    renderParametros();
    renderImpacto();
}

// Tab navigation
function showTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const tabButtons = document.querySelectorAll('.tab');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
    
    // Update results if showing results tab
    if (tabName === 'resultados') {
        updateResultados();
    }
    
    // Update impacto chart if showing impacto tab
    if (tabName === 'impacto') {
        updateImpactoChart();
    }
}

// Render Parametros table
function renderParametros() {
    const tbody = document.getElementById('parametrosBody');
    tbody.innerHTML = '';
    
    appState.parametros.forEach((param, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${param.id}</td>
            <td>
                ${param.nome}
                ${param.tipo === 'contexto' ? '<br><small style="color: var(--color-purple)">✨ Benefício específico do contexto</small>' : ''}
            </td>
            <td>${param.peso}</td>
            <td>${param.descricao}</td>
        `;
        tbody.appendChild(row);
    });
}

// Render Impacto table
function renderImpacto() {
    const tbody = document.getElementById('impactoBody');
    tbody.innerHTML = '';
    
    // Initialize impacto array if empty
    if (appState.impacto.length === 0) {
        appState.impacto = appState.parametros.map(p => ({
            id: p.id,
            avaliacao: 0,
            observacoes: ''
        }));
    }
    
    appState.parametros.forEach((param, index) => {
        const impactoItem = appState.impacto.find(i => i.id === param.id) || {
            avaliacao: 0,
            observacoes: ''
        };
        
        const pontuacao = calcularPontuacao(impactoItem.avaliacao, param.peso);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${param.id}</td>
            <td>
                ${param.nome}
                ${param.tipo === 'contexto' ? '<span style="color: var(--color-purple)">✨</span>' : ''}
            </td>
            <td>${param.peso}</td>
            <td>
                <input 
                    type="number" 
                    class="table-input" 
                    min="0" 
                    max="10" 
                    step="1" 
                    value="${impactoItem.avaliacao}"
                    onchange="updateImpacto(${param.id}, 'avaliacao', parseFloat(this.value))"
                    style="width: 100%"
                >
            </td>
            <td style="text-align: center; font-weight: bold">${pontuacao.toFixed(1)}</td>
            <td>
                <input 
                    type="text" 
                    class="form-input" 
                    value="${impactoItem.observacoes}"
                    onchange="updateImpacto(${param.id}, 'observacoes', this.value)"
                    style="width: 100%"
                >
            </td>
        `;
        tbody.appendChild(row);
    });
    
    calcularScoreTotal();
}

// Calculate pontuacao ponderada
function calcularPontuacao(avaliacao, peso) {
    return (avaliacao * peso * 3.33); // Normalizado para 100 pontos max
}

// Update impacto evaluation
function updateImpacto(id, field, value) {
    const index = appState.impacto.findIndex(i => i.id === id);
    
    if (index !== -1) {
        appState.impacto[index][field] = value;
    } else {
        const newImpacto = {
            id: id,
            avaliacao: 0,
            observacoes: ''
        };
        newImpacto[field] = value;
        appState.impacto.push(newImpacto);
    }
    
    renderImpacto();
}

// Calculate total score
function calcularScoreTotal() {
    let totalScore = 0;
    let count = 0;
    
    appState.parametros.forEach(param => {
        const impactoItem = appState.impacto.find(i => i.id === param.id);
        if (impactoItem) {
            const pontuacao = calcularPontuacao(impactoItem.avaliacao, param.peso);
            totalScore += pontuacao;
            count++;
        }
    });
    
    const score = count > 0 ? (totalScore / count) : 0;
    document.getElementById('scoreTotal').textContent = score.toFixed(1);
    
    // Update classification
    let classificacao = '';
    let color = '';
    if (score < 40) {
        classificacao = 'Baixo';
        color = '#E74C3C';
    } else if (score < 70) {
        classificacao = 'Médio';
        color = '#F5A623';
    } else {
        classificacao = 'Alto';
        color = '#7ED321';
    }
    
    const classElement = document.getElementById('classificacao');
    classElement.textContent = classificacao;
    classElement.style.color = color;
    
    return score;
}
// Converte string com vírgula ou ponto em número JS
function parseNumero(valor) {
  if (valor === undefined || valor === null) return 0;

  const normalizado = String(valor).replace(',', '.').trim();
  const n = parseFloat(normalizado);

  return isNaN(n) ? 0 : n;
}


        // Calculate ROI
        function calcularROI() {
                const custoDesenvolvimento = parseNumero(document.getElementById('custoDesenvolvimento').value);
            const custoManutencao      = parseNumero(document.getElementById('custoManutencao').value);
            const valorHora            = parseNumero(document.getElementById('valorHora').value);

            const tempoManual      = parseNumero(document.getElementById('tempoManual').value);
            const tempoAutomatizado = parseNumero(document.getElementById('tempoAutomatizado').value);
            const tempoSupervisao   = parseNumero(document.getElementById('tempoSupervisao').value);
            const frequenciaQtd     = parseNumero(document.getElementById('frequenciaQtd').value);
            const frequenciaPeriodo = document.getElementById('frequenciaPeriodo').value;
            
            if (custoDesenvolvimento > 0 && valorHora > 0 && tempoManual > 0 && frequenciaQtd > 0 && frequenciaPeriodo) {
                const tempoEconomizado = tempoManual - (tempoAutomatizado + tempoSupervisao);
                
                // Convert to annual
                let multiplicador = 1;
                switch(frequenciaPeriodo) {
                    case 'Por dia':
                        multiplicador = 252;
                        break;
                    case 'Por semana':
                        multiplicador = 52;
                        break;
                    case 'Por mês':
                        multiplicador = 12;
                        break;
                    case 'Por ano':
                        multiplicador = 1;
                        break;
                }
                
                const tempoEconomizadoAnual = tempoEconomizado * frequenciaQtd * multiplicador;
                const economiaAnual = (tempoEconomizadoAnual * valorHora) - (custoManutencao * 12);
                const economiaMensal = economiaAnual / 12;
                
                const investimentoTotal = custoDesenvolvimento;
                const roi = ((economiaAnual - investimentoTotal) / investimentoTotal) * 100;
                const payback = investimentoTotal / economiaMensal;
                
                // Update display
                document.getElementById('economiaMensal').textContent = economiaMensal.toFixed(2).replace('.', ',');
                document.getElementById('economiaAnual').textContent = economiaAnual.toFixed(2).replace('.', ',');
                document.getElementById('roi').textContent = roi.toFixed(1);
                document.getElementById('payback').textContent = payback.toFixed(1);
                document.getElementById('resultadosROI').style.display = 'block';
                
                // Save to state
                appState.analise.custoDesenvolvimento = custoDesenvolvimento;
                appState.analise.custoManutencao = custoManutencao;
                appState.analise.valorHora = valorHora;
            }
        }
// Add form listeners
function addFormListeners() {
  const inputs = [
    'nomeProcesso', 'areaResponsavel', 'responsavelProcesso',
    'dataAnalise', 'desenvolvedor', 'status',
    'processoAsIs', 'processoToBe',
    'tempoManual', 'tempoAutomatizado', 'tempoSupervisao',
    'frequenciaQtd', 'frequenciaPeriodo',
    'custoDesenvolvimento', 'tempoDesenvolvimento',
    'custoManutencao', 'valorHora'
  ];

  const numericFields = new Set([
    'tempoManual', 'tempoAutomatizado', 'tempoSupervisao',
    'frequenciaQtd',
    'custoDesenvolvimento', 'tempoDesenvolvimento',
    'custoManutencao', 'valorHora'
  ]);

  inputs.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('input', (e) => {
        const value = e.target.value;
        appState.analise[id] = numericFields.has(id) ? parseNumero(value) : value;
      });
    }
  });
}


// Update Resultados tab
function updateResultados() {
    updateCardsResumo();
    updateMatrizDecisao();
    updateChartsResultados();
}

// Update summary cards - FUNÇÃO CORRIGIDA
function updateCardsResumo() {
    const tempoManual = appState.analise.tempoManual || 0;
    const tempoAutomatizado = appState.analise.tempoAutomatizado || 0;
    const tempoSupervisao = appState.analise.tempoSupervisao || 0;
    const frequenciaQtd = appState.analise.frequenciaQtd || 0;
    const frequenciaPeriodo = appState.analise.frequenciaPeriodo || '';
    
    // Card Tempo
    const cardTempo = document.getElementById('cardTempo');
    if (tempoManual > 0 && frequenciaQtd > 0 && frequenciaPeriodo) {
        const tempoEconomizado = tempoManual - (tempoAutomatizado + tempoSupervisao);
        const percentualReducao = (tempoEconomizado / tempoManual) * 100;
        
        let multiplicador = 1;
        switch(frequenciaPeriodo) {
            case 'Por dia': multiplicador = 252; break;
            case 'Por semana': multiplicador = 52; break;
            case 'Por mês': multiplicador = 12; break;
            case 'Por ano': multiplicador = 1; break;
        }
        
        const tempoEconomizadoAnual = tempoEconomizado * frequenciaQtd * multiplicador;
        
        cardTempo.innerHTML = `
            <p><strong>Tempo economizado por execução:</strong> ${tempoEconomizado.toFixed(2)} horas</p>
            <p><strong>Tempo economizado anual:</strong> ${tempoEconomizadoAnual.toFixed(2)} horas</p>
            <p class="card-value" style="color: #7ED321">${percentualReducao.toFixed(1)}% de redução</p>
        `;
    } else {
        cardTempo.innerHTML = '<p>⏱️ Preencha os dados de tempo na aba "Análise de Processo"</p>';
    }
    
    // Card ROI - LÓGICA CORRIGIDA AQUI
    const cardROI = document.getElementById('cardROI');
    const custoDesenvolvimento = appState.analise.custoDesenvolvimento || 0;
    const valorHora = appState.analise.valorHora || 0;
    const custoManutencao = appState.analise.custoManutencao || 0;
    
    // Verifica se TODOS os campos financeiros estão preenchidos (com valores > 0)
    const custosPreenchidos = custoDesenvolvimento > 0 && valorHora > 0;
    
    if (custosPreenchidos && tempoManual > 0 && frequenciaQtd > 0 && frequenciaPeriodo) {
        // SE CUSTOS ESTÃO PREENCHIDOS: Calcula ROI normalmente
        const tempoEconomizado = tempoManual - (tempoAutomatizado + tempoSupervisao);
        
        let multiplicador = 1;
        switch(frequenciaPeriodo) {
            case 'Por dia': multiplicador = 252; break;
            case 'Por semana': multiplicador = 52; break;
            case 'Por mês': multiplicador = 12; break;
            case 'Por ano': multiplicador = 1; break;
        }
        
        const tempoEconomizadoAnual = tempoEconomizado * frequenciaQtd * multiplicador;
        const economiaAnual = (tempoEconomizadoAnual * valorHora) - (custoManutencao * 12);
        const roi = ((economiaAnual - custoDesenvolvimento) / custoDesenvolvimento) * 100;
        const payback = custoDesenvolvimento / (economiaAnual / 12);
        
        cardROI.innerHTML = `
            <p><strong>Economia anual:</strong> R$ ${economiaAnual.toFixed(2).replace('.', ',')}</p>
            <p class="card-value" style="color: #7ED321">ROI: ${roi.toFixed(1)}%</p>
            <p><strong>Payback:</strong> ${payback.toFixed(1)} meses</p>
        `;
        
    } else {
        // SE CUSTOS NÃO ESTÃO PREENCHIDOS: Mostra mensagem específica por contexto
        let mensagem = '';
        let titulo = '';
        let descricao = '';
        
        switch(appState.contexto.tipoOrganizacao) {
            case 'citizen-developer':
                titulo = 'Foco em TEMPO ECONOMIZADO';
                descricao = 'Custos não preenchidos. Para Citizen Developers, isso é perfeitamente adequado!';
                break;
                
            case 'setor-publico':
                titulo = 'Foco em EFICIÊNCIA PÚBLICA';
                descricao = 'Otimização de recursos públicos e transparência são os principais benefícios!';
                break;
                
            case 'ong':
                titulo = 'Foco em IMPACTO SOCIAL';
                descricao = 'Otimização de recursos limitados para maior impacto na causa!';
                break;
                
            case 'consultoria':
                titulo = 'Foco em DIFERENCIAL COMPETITIVO';
                descricao = 'Processos mais eficientes geram vantagem competitiva no mercado!';
                break;
                
            case 'clube-servico':
                titulo = 'Foco em ENGAJAMENTO';
                descricao = 'Processos otimizados liberam tempo para atividades de relacionamento!';
                break;
                
            default:
                titulo = 'Foco em TEMPO ECONOMIZADO';
                descricao = 'Custos não preenchidos. O benefício está na eficiência operacional!';
        }
        
        mensagem = `
            <p style="font-weight: 500; color: var(--color-primary)">${titulo}</p>
            <p style="font-size: 12px; margin-top: 8px">${descricao}</p>
        `;
        
        cardROI.innerHTML = mensagem;
    }
    
    // Card Impacto
    const cardImpacto = document.getElementById('cardImpacto');
    const score = calcularScoreTotal();
    
    let classificacao = '';
    if (score < 40) classificacao = 'Baixo';
    else if (score < 70) classificacao = 'Médio';
    else classificacao = 'Alto';
    
    // Find principal benefício
    let principalBeneficio = '--';
    let maxPontuacao = 0;
    
    appState.parametros.forEach(param => {
        const impactoItem = appState.impacto.find(i => i.id === param.id);
        if (impactoItem) {
            const pontuacao = calcularPontuacao(impactoItem.avaliacao, param.peso);
            if (pontuacao > maxPontuacao) {
                maxPontuacao = pontuacao;
                principalBeneficio = param.nome;
            }
        }
    });
    
    cardImpacto.innerHTML = `
        <p class="card-value" style="color: #9B59B6">${score.toFixed(1)} / 100</p>
        <p><strong>Classificação:</strong> ${classificacao}</p>
        <p style="font-size: 12px; margin-top: 8px"><strong>Principal benefício:</strong><br>${principalBeneficio}</p>
    `;
}

function updateMatrizDecisao() {
    const tempoManual       = appState.analise.tempoManual       || 0;
    const tempoAutomatizado = appState.analise.tempoAutomatizado || 0;
    const tempoSupervisao   = appState.analise.tempoSupervisao   || 0;
    const frequenciaQtd     = appState.analise.frequenciaQtd     || 0;
    const frequenciaPeriodo = appState.analise.frequenciaPeriodo || '';

    let tempoEconomizado = 0;
    let tempoEconomizadoAnual = 0;
    let percentualReducao = 0;

    if (tempoManual > 0 && frequenciaQtd > 0 && frequenciaPeriodo) {
        tempoEconomizado = tempoManual - (tempoAutomatizado + tempoSupervisao);
        if (tempoManual > 0) {
            percentualReducao = (tempoEconomizado / tempoManual) * 100;
        }

        let multiplicador = 1;
        switch (frequenciaPeriodo) {
            case 'Por dia':   multiplicador = 252; break;
            case 'Por semana': multiplicador = 52;  break;
            case 'Por mês':   multiplicador = 12;  break;
            case 'Por ano':   multiplicador = 1;   break;
        }

        tempoEconomizadoAnual = tempoEconomizado * frequenciaQtd * multiplicador;
    }

    const score = calcularScoreTotal(); // 0–100

    // Classificação de impacto (mesma usada no card de impacto)
    const classificacaoImpacto =
        score < 40 ? 'Baixo' :
        score < 70 ? 'Médio' :
        'Alto';

    // Ajustar thresholds baseado no contexto
    let tempoThreshold = 200; // padrão
    let impactoThreshold = 70; // padrão

    if (appState.contexto.tipoOrganizacao === 'ong' ||
        appState.contexto.tipoOrganizacao === 'clube-servico') {
        tempoThreshold = 100; // menor threshold para organizações com menos recursos
    }
    if (appState.contexto.tipoOrganizacao === 'citizen-developer') {
        tempoThreshold = 50;  // ~1h/semana já é relevante para usuário final
    }

    const tempoAlto   = tempoEconomizadoAnual >= tempoThreshold;
    const impactoAlto = score >= impactoThreshold;

    // Determine quadrant (para pintar a matriz)
    let quadrant = '';
    let recomendacao = '';

    if (tempoAlto && impactoAlto) {
        quadrant = 'prioridade';
        recomendacao =
            '<strong>🚀 PRIORIDADE MÁXIMA</strong><br>' +
            'Implementar imediatamente. Esta automação traz ganhos significativos de tempo E melhoria na qualidade de vida da equipe.';
    } else if (tempoAlto && !impactoAlto) {
        quadrant = 'eficiencia';
        recomendacao =
            '<strong>⚡ QUICK WIN</strong><br>' +
            'Implementar para ganho rápido de tempo. Avalie se há oportunidades de aumentar impacto qualitativo.';
    } else if (!tempoAlto && impactoAlto) {
        quadrant = 'impacto';

        // Mensagem específica por contexto
        if (appState.contexto.tipoOrganizacao === 'setor-publico') {
            recomendacao =
                '<strong>⭐ IMPACTO INSTITUCIONAL</strong><br>' +
                'Considerar implementação. Os ganhos em transparência, accountability e conformidade justificam o investimento.';
        } else if (appState.contexto.tipoOrganizacao === 'ong') {
            recomendacao =
                '<strong>⭐ IMPACTO NA CAUSA</strong><br>' +
                'Considerar implementação. A otimização de recursos permite maior foco nas atividades-fim da organização.';
        } else if (appState.contexto.tipoOrganizacao === 'consultoria') {
            recomendacao =
                '<strong>⭐ DIFERENCIAL COMPETITIVO</strong><br>' +
                'Considerar implementação. Processos mais eficientes geram vantagem competitiva e padronização de qualidade.';
        } else if (appState.contexto.tipoOrganizacao === 'clube-servico') {
            recomendacao =
                '<strong>⭐ ENGAJAMENTO DE MEMBROS</strong><br>' +
                'Considerar implementação. Processos otimizados aumentam satisfação e retenção de voluntários.';
        } else {
            recomendacao =
                '<strong>⭐ IMPACTO QUALITATIVO</strong><br>' +
                'Considerar implementação. Mesmo com ROI financeiro limitado, os benefícios humanos justificam o investimento.';
        }
    } else {
        quadrant = 'repensar';
        recomendacao =
            '<strong>⏸️ REPENSAR</strong><br>' +
            'Reavaliar a solução. Considere redesenhar o processo ou buscar alternativas com maior impacto.';
    }

    // ===============================
    // BLOCO DE RECOMENDAÇÃO DINÂMICA PARA CITIZEN DEVELOPER
    // ===============================
    if (appState.contexto.tipoOrganizacao === 'citizen-developer') {
        if (tempoEconomizadoAnual <= 0) {
            recomendacao =
                '<strong>🟡 EXPERIMENTO DE APRENDIZADO</strong><br>' +
                'Os ganhos de tempo ainda não aparecem nos dados informados. Use este fluxo para praticar automação, mas priorize outros processos se o seu tempo for limitado.';
        } else {
            let fraseTempo;
            if (tempoEconomizadoAnual >= 1000) {
                fraseTempo =
                    `Esta automação economiza cerca de ${tempoEconomizadoAnual.toFixed(0)} horas por ano ` +
                    `(~${(tempoEconomizadoAnual / 12).toFixed(0)} horas por mês, ${percentualReducao.toFixed(1)}% de redução por execução).`;
            } else if (tempoEconomizadoAnual >= 200) {
                fraseTempo =
                    `Esta automação economiza aproximadamente ${tempoEconomizadoAnual.toFixed(0)} horas por ano ` +
                    `(~${(tempoEconomizadoAnual / 12).toFixed(1)} horas por mês, ${percentualReducao.toFixed(1)}% de redução por execução).`;
            } else {
                fraseTempo =
                    `Esta automação economiza cerca de ${tempoEconomizadoAnual.toFixed(1)} horas por ano ` +
                    `(${percentualReducao.toFixed(1)}% de redução por execução), o que representa algumas horas liberadas ao longo dos meses.`;
            }

            if (score >= 80) {
                recomendacao =
                    '<strong>🚀 PRIORIDADE MÁXIMA PARA O SEU DIA A DIA</strong><br>' +
                    `${fraseTempo} Além disso, o impacto qualitativo foi classificado como "` +
                    `${classificacaoImpacto}", então vale inclusive discutir com o time de TI/Automações uma versão mais robusta e segura.`;
            } else if (score >= 40) {
                recomendacao =
                    '<strong>✅ VÁ EM FRENTE COMO AUTOMAÇÃO CIDADÃ</strong><br>' +
                    `${fraseTempo} O impacto qualitativo foi classificado como "` +
                    `${classificacaoImpacto}", o que reforça a utilidade dessa automação na sua rotina de trabalho.`;
            } else {
                recomendacao =
                    '<strong>✅ VÁ EM FRENTE COMO AUTOMAÇÃO CIDADÃ</strong><br>' +
                    `${fraseTempo} Mesmo com impacto qualitativo classificado como "` +
                    `${classificacaoImpacto}", o ganho de tempo é relevante para o seu dia a dia e justifica manter esta automação.`;
            }
        }
    }

    // Acrescenta sempre o tempo estimado no rodapé da mensagem
    if (tempoEconomizadoAnual > 0) {
        recomendacao += `<br><br><strong>Tempo economizado estimado:</strong> ${tempoEconomizadoAnual.toFixed(2)} horas/ano.`;
    }

    // Render matrix
    // Render matrix
    const matriz = document.getElementById('matrizDecisao');
    matriz.innerHTML = `
        <div class="matrix-cell"></div>
        <div class="matrix-cell header">
            <strong>Tempo Alto</strong><br>(≥${tempoThreshold}h/ano)
        </div>
        <div class="matrix-cell header">
            <strong>Tempo Baixo</strong><br>(&lt;${tempoThreshold}h/ano)
        </div>

        <div class="matrix-cell header">
            <strong>Impacto Alto</strong><br>(≥${impactoThreshold})
        </div>
        <div class="matrix-cell ${quadrant === 'prioridade' ? 'highlighted' : ''}" style="background-color:#D4EDDA;">
            <div class="matrix-emoji">🚀</div>
            <strong>PRIORIDADE MÁXIMA</strong>
        </div>
        <div class="matrix-cell ${quadrant === 'impacto' ? 'highlighted' : ''}" style="background-color:#D1ECF1;">
            <div class="matrix-emoji">⭐</div>
            <strong>IMPACTO ${
                appState.contexto.tipoOrganizacao === 'setor-publico'
                    ? 'INSTITUCIONAL'
                    : appState.contexto.tipoOrganizacao === 'ong'
                    ? 'SOCIAL'
                    : 'QUALITATIVO'
            }</strong>
        </div>

        <div class="matrix-cell header">
            <strong>Impacto Baixo</strong><br>(&lt;${impactoThreshold})
        </div>
        <div class="matrix-cell ${quadrant === 'eficiencia' ? 'highlighted' : ''}" style="background-color:#FFF3CD;">
            <div class="matrix-emoji">⚡</div>
            <strong>QUICK WIN</strong>
        </div>
        <div class="matrix-cell ${quadrant === 'repensar' ? 'highlighted' : ''}" style="background-color:#F8D7DA;">
            <div class="matrix-emoji">⏸️</div>
            <strong>REPENSAR</strong>
        </div>
    `;

    document.getElementById('recomendacao').innerHTML =
        `<h4>📋 Recomendação</h4><p>${recomendacao}</p>`;
}


// Update charts in Resultados tab
function updateChartsResultados() {
    updateTempoChart();
    updateBeneficiosChart();
    updateGaugeChart();
}

// Update tempo comparison chart
function updateTempoChart() {
    const ctx = document.getElementById('tempoChart');
    if (!ctx) return;
    
    const tempoManual = appState.analise.tempoManual || 0;
    const tempoAutomatizado = appState.analise.tempoAutomatizado || 0;
    const tempoSupervisao = appState.analise.tempoSupervisao || 0;
    const tempoTotal = tempoAutomatizado + tempoSupervisao;
    
    if (tempoChart) {
        tempoChart.destroy();
    }
    
    tempoChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Tempo Manual', 'Tempo Automatizado + Supervisão'],
            datasets: [{
                label: 'Horas',
                data: [tempoManual, tempoTotal],
                backgroundColor: ['#E74C3C', '#7ED321'],
                borderColor: ['#C0392B', '#6AB81E'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            indexAxis: 'y',
            plugins: {
                legend: { display: false },
                title: { display: false }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: { display: true, text: 'Horas' }
                }
            }
        }
    });
}

// Update benefícios distribution chart
function updateBeneficiosChart() {
    const ctx = document.getElementById('beneficiosChart');
    if (!ctx) return;
    
    const labels = [];
    const data = [];
    const colors = [];
    
    appState.parametros.forEach(param => {
        const impactoItem = appState.impacto.find(i => i.id === param.id);
        if (impactoItem) {
            const pontuacao = calcularPontuacao(impactoItem.avaliacao, param.peso);
            labels.push(param.nome);
            data.push(pontuacao);
            
            if (pontuacao < 40) colors.push('#E74C3C');
            else if (pontuacao < 70) colors.push('#F5A623');
            else colors.push('#7ED321');
        }
    });
    
    const combined = labels.map((label, i) => ({ label, data: data[i], color: colors[i] }));
    combined.sort((a, b) => b.data - a.data);
    
    const sortedLabels = combined.map(c => c.label);
    const sortedData = combined.map(c => c.data);
    const sortedColors = combined.map(c => c.color);
    
    if (beneficiosChart) {
        beneficiosChart.destroy();
    }
    
    beneficiosChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedLabels,
            datasets: [{
                label: 'Pontuação',
                data: sortedData,
                backgroundColor: sortedColors,
                borderColor: sortedColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            indexAxis: 'y',
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    title: { display: true, text: 'Pontuação (0-100)' }
                }
            }
        }
    });
}

// Update gauge chart
function updateGaugeChart() {
    const ctx = document.getElementById('gaugeChart');
    if (!ctx) return;
    
    const score = calcularScoreTotal();
    
    if (gaugeChart) {
        gaugeChart.destroy();
    }
    
    gaugeChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Score', 'Restante'],
            datasets: [{
                data: [score, 100 - score],
                backgroundColor: [
                    score < 40 ? '#E74C3C' : score < 70 ? '#F5A623' : '#7ED321',
                    '#E0E0E0'
                ],
                borderWidth: 0,
                circumference: 180,
                rotation: 270
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            }
        },
        plugins: [{
            id: 'gaugeText',
            afterDatasetDraw(chart) {
                const { ctx, chartArea: { width, height } } = chart;
                ctx.save();
                
                const centerX = width / 2;
                const centerY = height * 0.8;
                
                ctx.font = 'bold 32px FKGroteskNeue, sans-serif';
                ctx.fillStyle = '#1F2121';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(score.toFixed(1), centerX, centerY);
                
                ctx.font = '16px FKGroteskNeue, sans-serif';
                ctx.fillStyle = '#626C71';
                ctx.fillText('/ 100', centerX, centerY + 25);
                
                const classificacao = score < 40 ? 'Baixo' : score < 70 ? 'Médio' : 'Alto';
                ctx.font = 'bold 18px FKGroteskNeue, sans-serif';
                ctx.fillStyle = score < 40 ? '#E74C3C' : score < 70 ? '#F5A623' : '#7ED321';
                ctx.fillText(classificacao, centerX, centerY + 50);
                
                ctx.restore();
            }
        }]
    });
}

// Update impacto chart in Impacto tab
function updateImpactoChart() {
    const ctx = document.getElementById('impactoChart');
    if (!ctx) return;
    
    const labels = [];
    const data = [];
    const colors = [];
    
    appState.parametros.forEach(param => {
        const impactoItem = appState.impacto.find(i => i.id === param.id);
        if (impactoItem) {
            const pontuacao = calcularPontuacao(impactoItem.avaliacao, param.peso);
            labels.push(param.nome);
            data.push(pontuacao);
            
            if (pontuacao < 40) colors.push('#E74C3C');
            else if (pontuacao < 70) colors.push('#F5A623');
            else colors.push('#7ED321');
        }
    });
    
    if (impactoChart) {
        impactoChart.destroy();
    }
    
    impactoChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Pontuação Ponderada',
                data: data,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            indexAxis: 'y',
            plugins: {
                legend: { display: false },
                title: { display: true, text: 'Pontuação por Benefício' }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    title: { display: true, text: 'Pontuação (0-100)' }
                }
            }
        }
    });
}

// Toggle checklist item
function toggleCheck(element) {
    if (element.classList.contains('checked')) {
        element.classList.remove('checked');
        element.textContent = '☐' + element.textContent.substring(1);
    } else {
        element.classList.add('checked');
        element.textContent = '✅' + element.textContent.substring(1);
    }
}

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// ===== Ações da aba de Resultados =====

function exportarPDF() {
  // Abre a janela de impressão; no navegador você escolhe "Salvar como PDF"
  window.print();
}

function salvarJSON() {
  // Exporta o estado atual da aplicação (appState) como arquivo .json
  const dados = JSON.stringify(appState, null, 2);
  const blob = new Blob([dados], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `matriz-rpa-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

function limparReiniciar() {
  // Reinicia completamente a aplicação (mais simples e seguro)
  const confirmar = window.confirm(
    'Deseja realmente limpar todos os dados e reiniciar a matriz?'
  );
  if (confirmar) {
    window.location.reload();
  }
}

