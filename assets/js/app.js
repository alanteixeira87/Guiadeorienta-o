        const fvpGuideSlides = [
            {
                id: 1,
                title: "Acesso à FVP",
                image: "assets/1.png",
                description: [
                    "Acesse a FVP pelo link oficial da ferramenta.",
                    "Em seguida, realize o acesso utilizando o e-mail e a senha cadastrados anteriormente."
                ]
            },
            {
                id: 2,
                title: "Validação no Microsoft Authenticator",
                image: "assets/2.png",
                description: [
                    "Valide o código de acesso no dispositivo móvel utilizando o Microsoft Authenticator.",
                    ]
            },
            {
                id: 3,
                title: "Login no Open Finance",
                image: "assets/3.png",
                description: [
                    "Após a validação, siga para a tela de login dentro do Open Finance.",
                    "Clique no botão vermelho em destaque para continuar o fluxo."
                ]
            },
            {
                id: 4,
                title: "Autorização de uso dos dados",
                image: "assets/4.png",
                description: [
                    "Aceite a autorização para uso dos dados dentro da ferramenta.",
                    "Essa etapa permite que a FVP prossiga com a validação necessária para o teste."
                ]
            },
            {
                id: 5,
                title: "Aceite dos termos e condições",
                image: "assets/5.png",
                description: [
                    "Faça o scroll da página até o final.",
                    "Em seguida, marque a opção de aceite e confirme que concorda com os termos e condições."
                ]
            },
            {
                id: 6,
                title: "Criação do plano de teste",
                image: "assets/7.png",
                description: [
                    "Após concluir o aceite, siga para a tela de criação de plano de teste.",
                    "Clique em Create New Test Plan para iniciar a criação de um novo plano."
                ]
            },
            {
                id: 7,
                title: "Seleção do plano de teste",
                image: "assets/6.png",
                description: [
                    "Na tela de seleção de plano de teste, selecione o plano correspondente ao teste indicado no SIGc.",
                    "É importante garantir que o plano selecionado esteja de acordo com a marca e o teste solicitado."
                ]
            },
            {
                id: 8,
                title: "Preenchimento dos dados do plano",
                image: "assets/8.png",
                description: [
                    "Realize o preenchimento utilizando o alias e o authorization-server disponíveis no SIGc, de acordo com a marca que será testada.",
                    "Para facilitar o preenchimento, utilize o menu Gerenciador FVP, onde existe a opção de gerar o JSON de acordo com o teste solicitado."
                ]
            },
            {
                id: 9,
                title: "Criação do plano",
                description: [
                    "Após preencher todos os dados necessários, clique em Create Test Plan.",
                    "O usuário será direcionado para a tela de seleção de teste."
                ]
            },
            {
                id: 10,
                title: "Execução do teste e coleta de evidências",
                description: [
                    "Selecione corretamente o teste que será executado.",
                    "Em seguida, realize a leitura do QR Code e siga normalmente com o fluxo de teste na marca selecionada.",
                    "Quando o fluxo retornar para a FVP, a ferramenta executará as validações e gerará o resultado do log como OK ou NOK.",
                    "Caso o teste apresente resultado NOK, o usuário deve realizar até 2 tentativas adicionais para confirmação."
                ],
                checklist: [
                    "Fazer o download do log;",
                    "Renomear o log corretamente;",
                    "Coletar as evidências necessárias;",
                    "Coletar print da versão do app, de acordo com o dispositivo utilizado;",
                    "Coletar evidência do saldo em conta;",
                    "Em caso de erro, coletar evidências do erro apresentado;",
                    "Caso a marca não permita tirar print diretamente no dispositivo, utilize outro aparelho para registrar as evidências necessárias."
                ]
            }
        ];

        const fvpGuide = {
            currentIndex: 0,

            render: function() {
                const slide = fvpGuideSlides[this.currentIndex];
                const total = fvpGuideSlides.length;
                const title = document.getElementById('fvp-guide-title');
                const counter = document.getElementById('fvp-guide-counter');
                const imagePanel = document.getElementById('fvp-guide-image-panel');
                const textPanel = document.getElementById('fvp-guide-text-panel');
                const image = document.getElementById('fvp-guide-image');
                const description = document.getElementById('fvp-guide-description');
                const checklist = document.getElementById('fvp-guide-checklist');
                const dots = document.getElementById('fvp-guide-dots');
                const prev = document.getElementById('fvp-guide-prev');
                const next = document.getElementById('fvp-guide-next');

                if (!title || !counter || !imagePanel || !textPanel || !image || !description || !checklist || !dots || !prev || !next) {
                    return;
                }

                title.textContent = slide.title;
                counter.textContent = `Etapa ${slide.id} de ${total}`;
                if (slide.image) {
                    imagePanel.classList.remove('hidden');
                    textPanel.classList.remove('lg:col-span-12');
                    textPanel.classList.add('lg:col-span-5');
                    image.src = slide.image;
                    image.alt = `Etapa ${slide.id}: ${slide.title}`;
                } else {
                    imagePanel.classList.add('hidden');
                    textPanel.classList.remove('lg:col-span-5');
                    textPanel.classList.add('lg:col-span-12');
                    image.removeAttribute('src');
                    image.alt = "";
                }
                description.innerHTML = slide.description.map(text => `<p>${text}</p>`).join('');
                checklist.innerHTML = (slide.checklist || []).map(item => `
                    <li class="flex gap-3 items-start">
                        <span class="mt-1 w-5 h-5 rounded-full bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center flex-shrink-0">
                            <i data-lucide="check" size="14"></i>
                        </span>
                        <span>${item}</span>
                    </li>
                `).join('');

                dots.innerHTML = fvpGuideSlides.map((item, index) => `
                    <button onclick="fvpGuide.goTo(${index})" class="h-2.5 rounded-full transition-all ${index === this.currentIndex ? 'w-8 bg-primary-600 dark:bg-primary-400' : 'w-2.5 bg-gray-300 dark:bg-slate-600'}" aria-label="Ir para etapa ${item.id}"></button>
                `).join('');

                prev.disabled = this.currentIndex === 0;
                next.innerHTML = this.currentIndex === total - 1
                    ? 'Finalizar <i data-lucide="check" size="18"></i>'
                    : 'Avançar <i data-lucide="arrow-right" size="18"></i>';

                lucide.createIcons();
            },

            previous: function() {
                if (this.currentIndex > 0) {
                    this.currentIndex -= 1;
                    this.render();
                }
            },

            next: function() {
                if (this.currentIndex === fvpGuideSlides.length - 1) {
                    this.currentIndex = 0;
                } else {
                    this.currentIndex += 1;
                }
                this.render();
            },

            goTo: function(index) {
                this.currentIndex = index;
                this.render();
            }
        };

        // Módulos de agendamento (Restricted FVP)
        const scheduleModules = [
            {
                plan: 'Automatic Payments API - v2.2.0 - Automatic Pix Scheduling - Restricted FVP',
                id: 'automatic-payments_api_automatic-pix-scheduling_1-2_test-module_v2',
                saldo: 'R$ 1,00 disponível na data de liquidação (D+2)',
                total: 'R$ 1,00',
                days: [
                    ['D+0', 'Criação e autorização', 'Sem débito', 'none'],
                    ['D+1', 'Aguardando', 'Sem débito', 'none'],
                    ['D+2', 'Liquidação', 'R$ 1,00', 'debit'],
                    ['D+3', 'Validação pelo teste 2-2', 'Sem novo débito', 'check']
                ],
                obs: 'Cria uma recorrência semanal, sem pagamento imediato. Garanta o saldo antes de D+2. Verifique cheque especial ou limite ativo: a liquidação pode deixar a conta negativa mesmo sem saldo.'
            },
            {
                plan: 'Automatic Payments API - v2.2.0 - Automatic Pix Scheduling - Restricted FVP',
                id: 'automatic-payments_api_automatic-pix-scheduling-retry_1-3_test-module_v2-2',
                saldo: 'R$ 0,00 de D+0 até D+2',
                total: 'R$ 0,00',
                days: [
                    ['D+0', 'Conta sem saldo', 'Sem débito', 'none'],
                    ['D+1', 'Conta sem saldo', 'Sem débito', 'none'],
                    ['D+2', 'Conta sem saldo', 'Sem débito', 'none'],
                    ['D+3', 'Saldo indiferente para a conclusão', 'Sem débito', 'check']
                ],
                obs: 'Qualquer crédito entre D+0 e D+2 pode liquidar o pagamento e invalidar o comportamento esperado. Cheque especial e qualquer limite devem estar DESABILITADOS.'
            },
            {
                plan: 'Enrollments API - v2.2.0 - Payments Scheduling - Restricted FVP',
                id: 'enrollments_api_payments_scheduled-pix-verification_1-2_test-module_v4',
                sub: 'Enrollments, Payments, Scheduled Pix Verification',
                saldo: 'Mínimo de R$ 2,00',
                total: 'R$ 2,00',
                days: [
                    ['D+0', 'Dois agendamentos criados', 'Sem débito', 'none'],
                    ['D+1', 'Primeira liquidação', 'R$ 1,00', 'debit'],
                    ['D+2', 'Segunda liquidação', 'R$ 1,00', 'debit'],
                    ['D+3', 'Apenas validação', 'Sem débito', 'check']
                ],
                obs: 'Realiza dois agendamentos. Tenha o valor total disponível antes de D+1 e confira novamente antes de D+2. A jornada ocorre por JSR, com as mesmas regras da Payments API v5.'
            },
            {
                plan: 'Payments API v5.0.1 - Scheduled Pix Verification',
                id: 'payments_api_scheduled-pix-verification_1-2_test-module_v5',
                saldo: 'Mínimo de R$ 2,00',
                total: 'R$ 2,00',
                days: [
                    ['D+0', 'Teste 1-2 cria e valida os dois agendamentos', 'Sem débito', 'none'],
                    ['D+1', 'Primeira liquidação', 'R$ 1,00', 'debit'],
                    ['D+2', 'Segunda liquidação', 'R$ 1,00', 'debit'],
                    ['D+3', 'Teste 2-2 confirma as liquidações', 'Sem débito', 'check']
                ],
                obs: 'Tenha o valor disponível antes de D+1 e confira novamente antes de D+2. Falta de saldo em qualquer uma das datas compromete a validação posterior.'
            }
        ];

        function renderScheduleModules() {
            const box = document.getElementById('schedule-modules');
            if (!box) return;
            const styles = {
                none: 'border-line bg-subtle',
                debit: 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20',
                check: 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20'
            };
            box.innerHTML = scheduleModules.map(m => `
                <section class="bg-surface p-6 rounded-xl border border-line shadow-sm">
                    <p class="text-xs font-bold uppercase tracking-wider text-ink-muted mb-2">${m.plan}</p>
                    <h3 class="font-mono text-sm sm:text-base font-bold text-ink break-all">${m.id}</h3>
                    ${m.sub ? `<p class="text-xs text-ink-muted mt-1">(${m.sub})</p>` : ''}
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm">
                        <div class="p-3 rounded-lg bg-primary-50 dark:bg-primary-500/10"><strong>Saldo necessário:</strong> ${m.saldo}</div>
                        <div class="p-3 rounded-lg bg-primary-50 dark:bg-primary-500/10"><strong>Total debitado:</strong> ${m.total}</div>
                    </div>
                    <ol class="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-5" aria-label="Cronograma D+0 a D+3">
                        ${m.days.map(d => `
                            <li class="rounded-xl border p-3 ${styles[d[3]]}">
                                <p class="font-mono text-sm font-bold text-primary-600 dark:text-primary-400">${d[0]}</p>
                                <p class="text-sm mt-1">${d[1]}</p>
                                <p class="text-sm font-bold mt-2">${d[2]}</p>
                            </li>`).join('')}
                    </ol>
                    <p class="mt-4 text-sm leading-relaxed text-ink-soft"><strong>Observações:</strong> ${m.obs}</p>
                </section>`).join('');
        }

        // Mockup JO com erro (app fictício)
        const jo = {
            scenario: 'ok',
            step: 1,

            legends: {
                1: 'Login no app da marca com dados fictícios. O erro esperado pode aparecer logo após o login ou só depois de tentar aprovar o consentimento.',
                2: 'Resumo do consentimento solicitado pela FVP. Ao tocar em “Autorizar”, o cenário de erro do teste é disparado.',
                3: 'A marca é obrigada a exibir uma mensagem de erro após a tentativa de aprovação. Sem mensagem, o teste FALHOU. Toque em “Ok, entendi”.',
                '4ok': 'O usuário foi redirecionado de volta para a FVP. Este é o comportamento esperado: teste PASSOU.',
                '4fail': 'O usuário foi levado para a home do app da marca em vez de voltar à FVP. Teste FALHOU.'
            },

            setScenario(s) {
                this.scenario = s;
                this.step = 1;
                this.render(false);
            },
            go(n) { this.step = n; this.render(true); },
            restart() { this.step = 1; this.render(true); },

            consent() {
                return `
                <div class="p-5">
                    <div class="flex items-center gap-2 mb-5 text-teal-700 font-bold"><i data-lucide="landmark" size="20"></i> Banco Exemplo</div>
                    <h2 tabindex="-1" class="text-lg font-bold mb-4 outline-none">Autorizar solicitação</h2>
                    <dl class="space-y-3 text-sm bg-white rounded-xl border border-slate-200 p-4">
                        <div><dt class="text-slate-600">Instituição solicitante</dt><dd class="font-bold">FVP (Ambiente de Validação)</dd></div>
                        <div><dt class="text-slate-600">Tipo de permissão</dt><dd class="font-bold">Pagamento por Pix</dd></div>
                        <div><dt class="text-slate-600">Valor</dt><dd class="font-bold">R$ 1,00</dd></div>
                        <div><dt class="text-slate-600">Data</dt><dd class="font-bold">24/11/2026</dd></div>
                    </dl>
                </div>`;
            },

            screen() {
                const btn = 'w-full py-3 rounded-xl font-bold text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700';
                if (this.step === 1) {
                    return `
                    <div class="p-6 pt-12">
                        <div class="flex items-center gap-2 mb-8 text-teal-700 font-bold text-lg"><i data-lucide="landmark" size="24"></i> Banco Exemplo</div>
                        <h2 tabindex="-1" class="text-xl font-bold mb-6 outline-none">Entrar</h2>
                        <label for="jo-cpf" class="block text-sm font-medium mb-1">CPF ou CNPJ</label>
                        <input id="jo-cpf" type="text" value="000.000.000-00" readonly class="w-full mb-4 px-3 py-3 rounded-lg border border-slate-300 bg-white text-sm">
                        <label for="jo-pass" class="block text-sm font-medium mb-1">Senha</label>
                        <input id="jo-pass" type="password" value="12345678" readonly class="w-full mb-6 px-3 py-3 rounded-lg border border-slate-300 bg-white text-sm">
                        <button onclick="jo.go(2)" class="${btn} bg-teal-700 text-white hover:bg-teal-800">Entrar</button>
                        <p class="mt-4 text-xs text-slate-600 text-center">Dados fictícios para demonstração.</p>
                    </div>`;
                }
                if (this.step === 2) {
                    return `
                    ${this.consent()}
                    <div class="px-5 space-y-3">
                        <button onclick="jo.go(3)" class="${btn} bg-teal-700 text-white hover:bg-teal-800">Autorizar</button>
                        <button onclick="jo.restart()" class="${btn} bg-white border border-slate-300 text-slate-800 hover:bg-slate-100">Cancelar</button>
                    </div>`;
                }
                if (this.step === 3) {
                    return `
                    <div aria-hidden="true" class="opacity-40 pointer-events-none">${this.consent()}</div>
                    <div class="absolute inset-0 bg-slate-900/50 flex items-center justify-center p-5">
                        <div role="alertdialog" aria-modal="true" aria-labelledby="jo-err-title" class="bg-white rounded-xl p-6 text-center w-full shadow-sm">
                            <div class="mx-auto w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-3"><i data-lucide="triangle-alert" size="26" aria-label="Alerta"></i></div>
                            <h2 id="jo-err-title" tabindex="-1" class="font-bold mb-5 outline-none">Não foi possível concluir sua solicitação.</h2>
                            <button onclick="jo.go(4)" class="${btn} bg-teal-700 text-white hover:bg-teal-800">Ok, entendi</button>
                        </div>
                    </div>`;
                }
                if (this.scenario === 'ok') {
                    return `
                    <div class="h-full flex flex-col items-center justify-center text-center p-8">
                        <div class="w-12 h-12 rounded-full border-4 border-teal-700 border-t-transparent animate-spin motion-reduce:animate-none mb-6" role="progressbar" aria-label="Carregando"></div>
                        <h2 tabindex="-1" class="text-lg font-bold outline-none">Você está sendo redirecionado à FVP</h2>
                        <p class="text-sm text-slate-600 mt-2">Aguarde um instante.</p>
                    </div>`;
                }
                return `
                <div class="p-5">
                    <p class="mb-4 px-3 py-2 rounded-lg bg-red-100 text-red-900 text-xs font-bold flex items-center gap-2"><i data-lucide="x-circle" size="16"></i> Falha: usuário não foi redirecionado à FVP</p>
                    <h2 tabindex="-1" class="text-lg font-bold outline-none">Olá, Maria Exemplo</h2>
                    <div class="mt-3 p-4 rounded-xl bg-teal-700 text-white">
                        <p class="text-xs opacity-90">Saldo em conta</p>
                        <p class="text-2xl font-bold">R$ 1.234,56</p>
                    </div>
                    <p class="text-sm font-bold mt-5 mb-2">Pix</p>
                    <div class="grid grid-cols-4 gap-2 text-center text-xs">
                        ${[['send', 'Pagar'], ['arrow-left-right', 'Transferir'], ['qr-code', 'Cobrar'], ['key-round', 'Chaves']].map(i => `<div class="p-2 rounded-lg bg-white border border-slate-200"><i data-lucide="${i[0]}" size="20" class="mx-auto mb-1 text-teal-700"></i>${i[1]}</div>`).join('')}
                    </div>
                    <p class="text-sm font-bold mt-5 mb-2">Extrato</p>
                    <ul class="text-sm bg-white rounded-xl border border-slate-200 divide-y divide-slate-200">
                        <li class="flex justify-between p-3"><span>Mercado Exemplo</span><span>- R$ 52,90</span></li>
                        <li class="flex justify-between p-3"><span>Pix recebido</span><span class="text-teal-700">+ R$ 120,00</span></li>
                        <li class="flex justify-between p-3"><span>Tarifa</span><span>- R$ 9,90</span></li>
                    </ul>
                </div>`;
            },

            render(moveFocus) {
                const isOk = this.scenario === 'ok';
                const screen = document.getElementById('jo-screen');
                if (!screen) return;
                screen.innerHTML = this.screen();
                screen.scrollTop = 0;

                // Abas
                ['ok', 'fail'].forEach(s => {
                    const tab = document.getElementById('jo-tab-' + s);
                    const active = this.scenario === s;
                    tab.setAttribute('aria-selected', active);
                    tab.className = 'px-5 py-2 rounded-lg text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500 ' +
                        (active ? 'bg-white dark:bg-slate-600 text-primary-700 dark:text-white shadow' : 'text-ink-soft');
                });

                // Etapa, pontos e legenda
                document.getElementById('jo-step').textContent = 'Passo ' + this.step + ' de 4';
                document.getElementById('jo-dots').innerHTML = [1, 2, 3, 4].map(n =>
                    `<span class="h-2 flex-1 rounded-full ${n <= this.step ? 'bg-primary-600' : 'bg-gray-300 dark:bg-slate-600'}"></span>`).join('');
                const key = this.step === 4 ? '4' + this.scenario : this.step;
                document.getElementById('jo-legend').textContent = this.legends[key];

                // Resultado
                const res = document.getElementById('jo-result');
                if (this.step === 4) {
                    res.className = 'p-5 rounded-xl border text-sm font-bold ' + (isOk
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200'
                        : 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700 text-red-900 dark:text-red-200');
                    res.textContent = isOk
                        ? '✅ PASSOU: o usuário clicou em “Ok, entendi” e voltou para a FVP.'
                        : '❌ FALHOU: o usuário clicou em “Ok, entendi” e caiu na home do app, sem voltar para a FVP.';
                } else {
                    res.className = 'hidden';
                    res.textContent = '';
                }

                lucide.createIcons();
                if (moveFocus) {
                    const h = screen.querySelector('h2');
                    if (h) h.focus();
                }
            }
        };

        // Lógica de UI da Wiki
        const wiki = {
            showSection: function(sectionId) {
                // Esconde todas as seções
                document.querySelectorAll('.content-section').forEach(el => {
                    el.classList.add('hidden');
                    el.classList.remove('fade-in');
                });
                
                // Mostra a seção desejada com animação
                const target = document.getElementById(sectionId);
                if (target) {
                    target.classList.remove('hidden');
                    // Pequeno delay para forçar reflow e ativar a animação CSS
                    setTimeout(() => target.classList.add('fade-in'), 10);
                }

                if (sectionId === 'fvp-guia-preenchimento') {
                    fvpGuide.render();
                }
                if (sectionId === 'testes-jo-mockup') {
                    jo.render(false);
                }
                document.getElementById('main').scrollTo(0, 0);
                wiki.closeSidebar();
                wiki.buildToc(target);
                try { history.replaceState(null, '', '#' + sectionId); } catch (e) {}

                const gerenciadorSections = [
                    'ferramentas-intro',
                    'ferramentas-nomenclatura',
                    'ferramentas-agendamento',
                    'ferramentas-relatorio',
                    'ferramentas-chicago'
                ];
                const activeTarget = gerenciadorSections.includes(sectionId) ? 'ferramentas-gerenciador'
                    : wiki.testOptions.some(o => o.id === sectionId) ? 'testes-intro' : sectionId;
                // Mantém os seletores de teste sincronizados
                document.querySelectorAll('.test-select').forEach(sel => {
                    sel.value = wiki.testOptions.some(o => o.id === sectionId) ? sectionId : '';
                });

                // Marca o item ativo da sidebar
                document.querySelectorAll('#sidebar .nav-btn').forEach(btn => {
                    const ativo = btn.getAttribute('data-target') === activeTarget;
                    btn.classList.toggle('ativo', ativo);
                    if (ativo) btn.setAttribute('aria-current', 'page'); else btn.removeAttribute('aria-current');
                });
            },

            // ----- Seletor de testes -----
            testOptions: [
                { id: 'testes-regras-gerais', label: 'Regras gerais de execução' },
                { id: 'testes-sweeping', label: 'Sweeping Payments' },
                { id: 'testes-agendamentos', label: 'Longa Duração (Agendamentos)' },
                { id: 'testes-jo-erro', label: 'Jornada Otimizada com erro esperado' },
                { id: 'testes-jo-mockup', label: 'Mockup da Jornada Otimizada com erro' }
            ],
            pickTest: function(id) {
                if (id) wiki.showSection(id);
            },
            initTestSelects: function() {
                const opts = '<option value="">Selecione o teste...</option>' +
                    wiki.testOptions.map(o => '<option value="' + o.id + '">' + o.label + '</option>').join('');
                document.getElementById('test-select-hub').innerHTML = opts;
                // Seletor compacto no topo de cada página de teste
                wiki.testOptions.forEach(o => {
                    const art = document.getElementById(o.id);
                    if (!art || art.querySelector('.test-switcher')) return;
                    const bar = document.createElement('div');
                    bar.className = 'test-switcher flex items-center gap-3 mb-6 text-sm';
                    bar.innerHTML = '<label for="sel-' + o.id + '" class="text-ink-muted font-medium whitespace-nowrap">Trocar de teste</label>' +
                        '<select id="sel-' + o.id + '" class="test-select flex-1 max-w-xs px-3 py-2 bg-subtle border border-line rounded-lg text-ink focus:border-primary-500 outline-none cursor-pointer" onchange="wiki.pickTest(this.value)">' + opts + '</select>';
                    art.insertBefore(bar, art.children[1] || null);
                });
            },

            // ----- Tema (persistente) -----
            toggleTheme: function() {
                const root = document.documentElement;
                const next = root.classList.contains('dark') ? 'light' : 'dark';
                root.setAttribute('data-theme', next);
                root.classList.toggle('dark', next === 'dark');
                try { localStorage.setItem('guia-theme', next); } catch (e) {}
            },

            // ----- Drawer mobile -----
            openSidebar: function() {
                document.getElementById('sidebar').classList.add('open');
                document.getElementById('sidebar-backdrop').classList.remove('hidden');
            },
            closeSidebar: function() {
                document.getElementById('sidebar').classList.remove('open');
                document.getElementById('sidebar-backdrop').classList.add('hidden');
            },

            // ----- Busca na navegação (título + conteúdo das páginas) -----
            filterNav: function(query) {
                const q = query.trim().toLowerCase();
                document.querySelectorAll('#sidebar [data-search-ids]').forEach(btn => {
                    const text = btn.dataset.searchIds.split(' ').map(i => {
                        const a = document.getElementById(i);
                        return a ? a.textContent : '';
                    }).join(' ') + ' ' + btn.textContent;
                    btn.classList.toggle('nav-hit-hidden', q !== '' && !text.toLowerCase().includes(q));
                });
            },

            // ----- Índice "Nesta página" com scroll spy -----
            buildToc: function(article) {
                const toc = document.getElementById('toc');
                const wrap = document.getElementById('toc-wrap');
                if (!toc || !article) return;
                const heads = [...article.querySelectorAll('h2')].filter(h => h.textContent.trim() && !h.closest('#jo-screen'));
                heads.forEach((h, i) => { if (!h.id) h.id = article.id + '-sec-' + i; });
                toc.innerHTML = heads.map(h => '<a href="#' + h.id + '" data-id="' + h.id + '">' + h.textContent.trim() + '</a>').join('');
                wrap.style.display = heads.length >= 2 ? '' : 'none';
                toc.querySelectorAll('a').forEach(a => a.addEventListener('click', e => {
                    e.preventDefault();
                    document.getElementById(a.dataset.id).scrollIntoView({ behavior: 'smooth', block: 'start' });
                }));
                wiki._tocHeads = heads;
                wiki.updateToc();
            },
            updateToc: function() {
                const heads = wiki._tocHeads || [];
                let current = heads[0];
                heads.forEach(h => { if (h.getBoundingClientRect().top <= 120) current = h; });
                document.querySelectorAll('#toc a').forEach(a => a.classList.toggle('active', current && a.dataset.id === current.id));
            },
        };

        // Inicializa ícones do Lucide
        renderScheduleModules();
        wiki.initTestSelects();
        document.getElementById('main').addEventListener('scroll', () => wiki.updateToc(), { passive: true });
        wiki.buildToc(document.getElementById('home'));
        // Link direto: index.html#testes-jsr abre a seção correspondente
        const initial = location.hash.slice(1);
        if (initial && document.getElementById(initial) && document.getElementById(initial).classList.contains('content-section')) {
            wiki.showSection(initial);
            const top = () => document.getElementById('main').scrollTo(0, 0);
            requestAnimationFrame(top); setTimeout(top, 150); window.addEventListener('load', () => setTimeout(top, 0));
        }
        lucide.createIcons();
    