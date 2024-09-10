let marcacoes = [];

let cargaHoraria = "xxx";
const toleranciaGeral = 10;

/** FUNÇÕES DE CÁLCULO */ 
function calcular() {
    // Valida marcações
    ajustaMarcacoes();

    let horasTrabalhadas = 0;
    let horasTrabalhadasNormais = 0;
    let credito = 0;
    let debito = 0;
    let intervalo = 0;
    let adicionalNoturno = 0;

    if (marcacoes.length > 0) {
        horasTrabalhadas = calculaHorasTrabalhadas();

        horasTrabalhadasNormais = calculaTrabalhadaNormal(
            horasTrabalhadas,
            cargaHoraria
        );

        credito = calculaCredito(
            horasTrabalhadas,
            cargaHoraria
        );

        debito = calculaDebito(
            horasTrabalhadas,
            cargaHoraria
        );

        intervalo = calculaIntervalo();

        adicionalNoturno = calculaAdicionalNoturno();
    }

    atualizaValores(
        horasTrabalhadas,
        horasTrabalhadasNormais,
        credito,
        debito,
        intervalo,
        adicionalNoturno
    );
}

function calculaHorasTrabalhadas() {
    let totalHoras = 0;
    let listaPar = [];

    for (let index = 0; index < marcacoes.length - 1; index += 2) {
        let entrada = marcacoes[index];
        let saida = marcacoes[index + 1];

        // Tratar "00:00" como 0 minutos
        if (entrada === 0) entrada = 0;
        if (saida === 0) saida = 1440;

        if (entrada && saida) {
            listaPar.push([entrada, saida]);
        }
    }

    for (let [entrada, saida] of listaPar) {
        totalHoras += calculaTempoEntrePeriodo(entrada, saida);
    }

    return totalHoras;
}


function calculaTrabalhadaNormal(
    horasTrabalhadas,
    cargaHoraria
) {
    if(horasTrabalhadas > cargaHoraria) {
        return cargaHoraria;
    }

    return horasTrabalhadas;
}

function calculaCredito(
    horasTrabalhadas,
    cargaHoraria
) {
    let credito = 0;

    if(horasTrabalhadas > cargaHoraria) {
        credito = horasTrabalhadas - cargaHoraria;
    }

    if(credito <= toleranciaGeral) {
        return 0;
    }

    return credito;
}

function calculaDebito(
    horasTrabalhadas,
    cargaHoraria
) {
    let debito = 0;

    if(horasTrabalhadas < cargaHoraria) {
        debito = cargaHoraria - horasTrabalhadas;
    }

    if(debito <= toleranciaGeral) {
        return 0;
    }

    return debito;
}

function calculaIntervalo() {
    let totalIntervalo = 0;
    let listaPar = [];

    for (let index = 1; index < marcacoes.length - 1; index += 2) {
        let entrada = marcacoes[index];
        let saida = marcacoes[index + 1];

        // Tratar "00:00" como 0 minutos
        if (entrada === 0) entrada = 0;
        if (saida === 0) saida = 1440;

        if (entrada && saida) {
            listaPar.push([entrada, saida]);
        }
    }

    for (let [entrada, saida] of listaPar) {
        totalIntervalo += calculaTempoEntrePeriodo(entrada, saida);
    }

    return totalIntervalo;
}



function calculaAdicionalNoturno() {
    let totalHoras = 0;
    let listaPar = [];

    for (let index = 0; index < marcacoes.length - 1; index += 2) {
        let entrada = marcacoes[index];
        let saida = marcacoes[index + 1];

        // Tratar "00:00" como 0 minutos
        if (entrada === 0) entrada = 0;
        if (saida === 0) saida = 1440;

        if (entrada && saida) {
            listaPar.push([entrada, saida]);
        }
    }

    for (let [entrada, saida] of listaPar) {
        totalHoras += calculaTempoEntrePeriodoNoturno(entrada, saida);
    }

    return converteAdicionalNoturno(totalHoras);
}

function atualizaValores(
    horasTrabalhadas,
    trabalhadasNormais,
    credito,
    debito,
    intervalo,
    adicionalNoturno
) {
    let horaTrabalhadaHTML = document.querySelector('.resultado-trabalhada');
    let debitoHTML = document.querySelector('.resultado-debito');
    let creditoHTML = document.querySelector('.resultado-credito');
    let horaTrabalhadaNormalHTML = document.querySelector('.resultado-trabalhada-normal');
    let adicionalNoturnoHTML = document.querySelector('.resultado-adicional-noturno');
    let intervaloHTML = document.querySelector('.resultado-intervalo');

    horaTrabalhadaHTML.textContent = converteMinutosParaHoras(horasTrabalhadas);
    debitoHTML.textContent = converteMinutosParaHoras(debito);
    creditoHTML.textContent = converteMinutosParaHoras(credito);
    horaTrabalhadaNormalHTML.textContent = converteMinutosParaHoras(trabalhadasNormais);
    adicionalNoturnoHTML.textContent = converteMinutosParaHoras(adicionalNoturno);
    intervaloHTML.textContent = converteMinutosParaHoras(intervalo);
}


function pegaMaxIndex(lista) {
    if(lista.length === 0) return 0;

    let maxIndex = 0;
    let contador = 1;

    for(let index = 0; index < lista.length; index++) {
        contador++;
        if(contador == 2) {
            maxIndex++;
            contador = 0;
        }
    }

    return maxIndex;
}
// FUNÇÕES DE CÁLCULO

// escuta todos os inputs para criar máscara e adicionar na lista
document.addEventListener('input', function(e) {
    if (e.target 
            && e.target.classList.contains('input-hora')) {
        let input = e.target.value;

        input = input.replace(/[^0-9:]/g, '');

        if (input.length === 3 
            && !input.includes(':') 
            || input.includes(':') && input.indexOf(':') !== 2) {
            input = `${input.slice(0, 2)}:${input.slice(2)}`;
        }

        if (input.length > 5) {
            input = input.slice(0, 5);
        }

        e.target.value = input;

        validaMarcacao(input, e);
    }
});

// funções utilitárias
function validaMarcacao(input, e) {
    if (input.length === 5) {
        let [hours, minutes] = input.split(':');

        if ((parseInt(hours) > 23 
            && parseInt(minutes) > 59) 
            || parseInt(hours) >= 24
            || parseInt(minutes) >= 60) {
            hours = '23';
            minutes = '59';
        }

        e.target.value = `${hours}:${minutes}`;

        if(!e.target.classList.contains('carga-horaria-input')) {
            let liElement = e.target.closest('li');
            let index = Array.from(liElement.parentNode.children).indexOf(liElement);
            marcacoes[index] = converteHorasEmMinutos(e.target.value);
        } else {
            if(e.target.value !== '') {
                cargaHoraria = converteHorasEmMinutos(e.target.value);
            } else {
                cargaHoraria = 'xxx';
            }
        }
    }
}

function converteHorasEmMinutos(hora) {
    let [hours, minutes] = hora.split(':');
    return parseInt(hours) * 60 + parseInt(minutes);
}

function adicionarMarcacao() {
    let ulMarcacao = document.querySelector('.lista-marcacoes');

    ulMarcacao.insertAdjacentHTML('beforeend', `
        <li class="item-marcacao">
            <input class="input-hora" type="text" maxlength="5" placeholder="00:00">
        </li>
    `);
}

function ajustaMarcacoes() {
    let ulMarcacao = document.querySelector('.lista-marcacoes');

    if (cargaHoraria === 'xxx') {
        let cargaHorariaInput = document.querySelector('.carga-horaria-input');
        cargaHorariaInput.value = "08:00";
        cargaHoraria = converteHorasEmMinutos(cargaHorariaInput.value);
    }

    let marcacoesEmHora = Array.from(ulMarcacao.children).map(li => {
        return li.querySelector('.input-hora').value;
    });

    let listaNova = [];

    for (let i = 0; i < marcacoesEmHora.length; i++) {
        if (marcacoesEmHora[i] === '') continue;

        let marcacao = marcacoesEmHora[i].split(':').join('');

        marcacao = adicionarZerosEsquerda(marcacao, 4);
        marcacao = `${marcacao.slice(0, 2)}:${marcacao.slice(2)}`;

        if (marcacao === '00:00') {
            // Adiciona "00:00" no início da lista de marcações
            listaNova.push(marcacao);
        } else {
            listaNova.push(marcacao);
        }
    }

    let novaListaMarcacoes = [];

    for (let i = 0; i < listaNova.length; i++) {
        if (listaNova[i] === '00:00') {
            novaListaMarcacoes.push(0);
        } else {
            novaListaMarcacoes.push(converteHorasEmMinutos(listaNova[i]));
        }
    }

    marcacoes = novaListaMarcacoes;
}



function adicionarZerosEsquerda(numero, tamanho) {
    let numeroStr = numero;

    while (numeroStr.length < tamanho) {
        numeroStr = '0' + numeroStr;
    }

    return numeroStr;
}

function calculaTempoEntrePeriodo(entrada, saida) {
    if(entrada > saida) {
        return (saida += 1440) - entrada;
    }

    return saida - entrada;
}

function calculaTempoEntrePeriodoNoturno(entrada, saida) {
    // Fixo em 22:00 - 05:00
    let inicioNoturno = 1320;
    let fimNoturno = 300;
    let meiaNoite = 1440;

    let marcacaoMesmoDia = true;

    if(entrada >= saida) {
        marcacaoMesmoDia = false;
    }

    if(marcacaoMesmoDia) {
        if(entrada < fimNoturno) {
            if(saida <= fimNoturno) {
                return calculaTempoEntrePeriodo(entrada, saida);
            }

            let noturnoInicio = calculaTempoEntrePeriodo(entrada, fimNoturno);

            if(saida > inicioNoturno) {
                // tenho +1 períodos para somar tempo noturno
                let noturnoFim = calculaTempoEntrePeriodo(inicioNoturno, saida);

                return noturnoInicio + noturnoFim;
            } else {
                return noturnoInicio;
            }
        } else if(entrada > fimNoturno) {
            if(saida <= inicioNoturno) {
                return 0;
            } else if(saida > inicioNoturno) {
                return calculaTempoEntrePeriodo(inicioNoturno, saida);
            }
        }
    } else {
        if(entrada < fimNoturno) {
            let noturno1 = calculaTempoEntrePeriodo(entrada, fimNoturno);

            if(saida < fimNoturno) {
                // tenho +2 períodos para somar tempo noturno
                let noturno2 = calculaTempoEntrePeriodo(inicioNoturno, meiaNoite);
                let noturno3 = saida;

                return noturno1 + noturno2 + noturno3;
            }
        } else if(entrada > fimNoturno && entrada <= inicioNoturno) {
            if(saida <= fimNoturno) {
                let noturnoInicio = calculaTempoEntrePeriodo(inicioNoturno, meiaNoite);
                let noturnoFim = saida;

                return noturnoInicio + noturnoFim;
            } else if(saida > fimNoturno) {
                return inicioNoturno;
            }
        } else if(entrada > inicioNoturno) {
            let noturno1 = calculaTempoEntrePeriodo(entrada, meiaNoite);

            if(saida <= fimNoturno) {
                return noturno1 + saida;
            } else if(saida > fimNoturno && saida <= inicioNoturno) {
                return noturno1 + fimNoturno;
            } else if(saida > inicioNoturno) {
                // tenho +2 noturnos
                let noturnoInicio = fimNoturno;
                let noturnoFim = calculaTempoEntrePeriodo(saida, inicioNoturno);

                return noturno1 + noturnoInicio + noturnoFim;
            }
        }
    }
}

function converteAdicionalNoturno(tempoEmMinutos) {
    const minutosEquivalentes = 52.5;
    const horasAdicionalNoturno = tempoEmMinutos / minutosEquivalentes;
    const minutosAdicionalNoturno = horasAdicionalNoturno * 60;
    return Math.trunc(minutosAdicionalNoturno);
}

function converteMinutosParaHoras(minutos) {
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;
    const horasFormatadas = horas.toString().padStart(2, '0');
    const minutosFormatados = minutosRestantes.toString().padStart(2, '0');
    return `${horasFormatadas}:${minutosFormatados}`;
}
