document.addEventListener('DOMContentLoaded', () => {

  // --- Éléments du DOM ---
  const form = document.getElementById('calculator-form');
  const currencySelect = document.getElementById('currency');
  const initialCapitalInput = document.getElementById('initial-capital');
  const monthlyDepositInput = document.getElementById('monthly-deposit');
  const interestRateInput = document.getElementById('interest-rate');
  const durationInput = document.getElementById('duration');

  const finalBalanceEl = document.getElementById('final-balance');
  const totalDepositsEl = document.getElementById('total-deposits');
  const totalInterestEl = document.getElementById('total-interest');
  const exportCsvBtn = document.getElementById('export-csv-btn');
  const currSymbolLabels = document.querySelectorAll('.curr-symbol');

  let myChart = null;
  let scheduleData = [];

  // Mappings des devises pour la mise en forme Intl
  const currencyConfigs = {
    EUR: { locale: 'fr-FR', currency: 'EUR', symbol: '€' },
    USD: { locale: 'en-US', currency: 'USD', symbol: '$' },
    NGN: { locale: 'en-NG', currency: 'NGN', symbol: '₦' },
    XOF: { locale: 'fr-BJ', currency: 'XOF', symbol: 'FCFA' }
  };

  // Obtenir le formateur monétaire en fonction de la devise sélectionnée
  function getFormatter() {
    const code = currencySelect.value;
    const config = currencyConfigs[code] || currencyConfigs.XOF;

    return new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: config.currency,
      maximumFractionDigits: 0
    });
  }

  // Mettre à jour les symboles affichés à côté des labels
  function updateCurrencyLabels() {
    const selectedOption = currencySelect.options[currencySelect.selectedIndex];
    const symbol = selectedOption.getAttribute('data-symbol');
    
    currSymbolLabels.forEach(label => {
      label.textContent = symbol;
    });
  }

  // --- Calcul de l'épargne ---
  function calculateSavings() {
    const initialCapital = parseFloat(initialCapitalInput.value) || 0;
    const monthlyDeposit = parseFloat(monthlyDepositInput.value) || 0;
    const annualRate = (parseFloat(interestRateInput.value) || 0) / 100;
    const years = parseInt(durationInput.value) || 1;

    const labels = [];
    const depositsData = [];
    const interestData = [];
    scheduleData = [];

    let currentBalance = initialCapital;
    let totalDeposited = initialCapital;

    // Année 0
    labels.push('Année 0');
    depositsData.push(Math.round(initialCapital));
    interestData.push(0);

    scheduleData.push({
      year: 0,
      deposited: Math.round(initialCapital),
      interest: 0,
      totalBalance: Math.round(initialCapital)
    });

    // Progression année par année
    for (let year = 1; year <= years; year++) {
      for (let month = 1; month <= 12; month++) {
        currentBalance += monthlyDeposit;
        totalDeposited += monthlyDeposit;
        currentBalance *= (1 + annualRate / 12);
      }

      const totalInterestAccrued = currentBalance - totalDeposited;

      labels.push(`Année ${year}`);
      depositsData.push(Math.round(totalDeposited));
      interestData.push(Math.round(totalInterestAccrued));

      scheduleData.push({
        year: year,
        deposited: Math.round(totalDeposited),
        interest: Math.round(totalInterestAccrued),
        totalBalance: Math.round(currentBalance)
      });
    }

    // Mise à jour de l'affichage des KPI
    const formatter = getFormatter();
    const finalInterest = currentBalance - totalDeposited;

    finalBalanceEl.textContent = formatter.format(currentBalance);
    totalDepositsEl.textContent = formatter.format(totalDeposited);
    totalInterestEl.textContent = formatter.format(finalInterest);

    // Redessiner le graphique
    updateChart(labels, depositsData, interestData);
  }

  // --- Graphique Chart.js ---
  function updateChart(labels, depositsData, interestData) {
    const ctx = document.getElementById('savingsChart').getContext('2d');
    const formatter = getFormatter();

    if (myChart) {
      myChart.destroy();
    }

    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Capital Déposé',
            data: depositsData,
            backgroundColor: '#0284c7',
            borderRadius: 6
          },
          {
            label: 'Intérêts Cumulés',
            data: interestData,
            backgroundColor: '#4ade80',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: { color: '#cbd5e1', font: { size: 13 } }
          },
          tooltip: {
            padding: 12,
            callbacks: {
              label: (context) => `${context.dataset.label}: ${formatter.format(context.raw)}`
            }
          }
        },
        scales: {
          x: {
            stacked: true,
            ticks: { color: '#94a3b8' },
            grid: { color: '#334155' }
          },
          y: {
            stacked: true,
            ticks: { 
              color: '#94a3b8',
              callback: (value) => formatter.format(value)
            },
            grid: { color: '#334155' }
          }
        }
      }
    });
  }

  // --- Exportation CSV ---
  function exportToCSV() {
    if (scheduleData.length === 0) return;

    const currCode = currencySelect.value;
    let csvContent = `Annee;Capital Depose (${currCode});Interets Cumules (${currCode});Total Epargne (${currCode})\n`;

    scheduleData.forEach(row => {
      csvContent += `${row.year};${row.deposited};${row.interest};${row.totalBalance}\n`;
    });

    const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `echeancier_epargne_${currCode}.csv`);
    document.body.appendChild(link);
    
    link.click();
    document.body.removeChild(link);
  }

  // --- Événements ---
  currencySelect.addEventListener('change', () => {
    updateCurrencyLabels();
    calculateSavings();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateSavings();
  });

  form.addEventListener('input', () => {
    calculateSavings();
  });

  exportCsvBtn.addEventListener('click', exportToCSV);

  // Initialisation au chargement
  updateCurrencyLabels();
  calculateSavings();
});