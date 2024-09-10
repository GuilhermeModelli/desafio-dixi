🕒 Projeto de Cálculo de Horas Trabalhadas

Este projeto é uma aplicação JavaScript destinada ao cálculo preciso de horas trabalhadas, considerando horas normais, créditos, débitos, intervalos e adicional noturno. Ideal para o acompanhamento de jornadas de trabalho e controle de ponto.

🚀 Funcionalidades Principais

- **Cálculo de Horas Trabalhadas:** Calcula automaticamente o total de horas com base nas marcações de entrada e saída.
- **Cálculo de Horas Normais:** Verifica se as horas trabalhadas estão dentro da carga horária estabelecida.
- **Crédito e Débito de Horas:** Determina se há horas extras (crédito) ou horas faltantes (débito) em relação à carga horária.
- **Cálculo de Intervalo:** Calcula o tempo de intervalo entre as marcações para garantir que esteja dentro do previsto.
- **Adicional Noturno:** Avalia as horas trabalhadas durante o período noturno (22:00 - 05:00) e calcula o adicional correspondente.
- **Interface Dinâmica:** Os resultados dos cálculos são exibidos diretamente na interface do usuário, atualizando-se automaticamente conforme os dados são inseridos.

🗂️ Estrutura do Código

- **Variáveis Globais:**
    - `marcacoes`: Armazena as marcações de horário em minutos.
    - `cargaHoraria`: Representa a carga horária configurada, também em minutos.
    - `toleranciaGeral`: Define a tolerância para o cálculo de crédito e débito, em minutos.

- **Funções Principais:**
    - `calcular()`: Função principal que orquestra todos os cálculos. Ela é responsável por chamar as funções específicas para calcular as horas trabalhadas, horas normais, crédito, débito, intervalo e adicional noturno.
    - `calculaHorasTrabalhadas(indexMaximo)`: Calcula o total de horas trabalhadas com base nas marcações de entrada e saída.
    - `calculaTrabalhadaNormal(horasTrabalhadas, cargaHoraria)`: Determina se as horas trabalhadas excedem a carga horária e, em caso positivo, limita o valor às horas normais.
    - `calculaCredito(horasTrabalhadas, cargaHoraria)`: Calcula o crédito de horas extras, considerando a tolerância definida.
    - `calculaDebito(horasTrabalhadas, cargaHoraria)`: Calcula o débito de horas, caso as horas trabalhadas sejam menores que a carga horária.
    - `calculaIntervalo(indexMaximo)`: Calcula o tempo total de intervalo entre as marcações.
    - `calculaAdicionalNoturno(indexMaximo)`: Calcula as horas trabalhadas durante o período noturno, convertendo-as em adicional noturno.
    - `atualizaValores(...)`: Atualiza os valores calculados na interface do usuário, exibindo os resultados no DOM.

- **Funções Auxiliares:**
    - `pegaMaxIndex(lista)`: Retorna o índice máximo de marcações válidas, considerando pares de entrada e saída.
    - `validaMarcacao(input, e)`: Valida o formato das marcações inseridas pelo usuário, ajustando-o para "HH:MM".
    - `converteHorasEmMinutos(hora)`: Converte um horário no formato "HH:MM" para minutos, facilitando os cálculos.
    - `adicionarMarcacao()`: Adiciona um novo campo de marcação de horário na interface, permitindo ao usuário inserir mais horários.
    - `ajustaMarcacoes()`: Ajusta as marcações para garantir que estejam no formato correto e elimina inconsistências.
    - `calculaTempoEntrePeriodo(entrada, saida)`: Calcula o tempo decorrido entre duas marcações (entrada e saída).
    - `calculaTempoEntrePeriodoNoturno(entrada, saida)`: Avalia as horas trabalhadas durante o período noturno.
    - `converteAdicionalNoturno(tempoEmMinutos)`: Converte o tempo trabalhado no período noturno para adicional noturno em minutos.
    - `converteMinutosParaHoras(minutos)`: Transforma o total de minutos em horas no formato "HH:MM" para exibição.

🛠️ Como Utilizar

- **Inserir Marcações:** Adicione as marcações de entrada e saída no formato "HH:MM".
- **Definir Carga Horária:** Caso necessário, ajuste a carga horária na interface.
- **Visualizar Resultados:** Os cálculos serão realizados automaticamente, e os resultados serão exibidos na interface.
