document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const carPrice = parseFloat(urlParams.get('carPrice')) || 0;
    const downPayment = parseFloat(urlParams.get('downPayment')) || 0;
    const termYears = parseInt(urlParams.get('termYears')) || 0;
    const monthlyIncome = parseFloat(urlParams.get('monthlyIncome')) || 0;

    const maxLoanAmount = document.getElementById('maxLoanAmount');
    const monthlyPayment = document.getElementById('monthlyPayment');
    const affordabilityMessage = document.getElementById('affordabilityMessage');
    const chartCenterText = document.getElementById('chartCenterText');

    const ctx = document.getElementById('affordabilityChart').getContext('2d');
    let affordabilityChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Down Payment', 'Loan Amount', 'Monthly Payment'],
            datasets: [{
                label: 'Car Affordability',
                data: [0, 0, 0],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            cutout: '70%',
        }
    });

    function updateChart(downPaymentValue, loanAmount, monthlyPaymentValue, affordable) {
        affordabilityChart.data.datasets[0].data = [downPaymentValue, loanAmount, monthlyPaymentValue];
        affordabilityChart.update();
        chartCenterText.innerHTML = `$${monthlyPaymentValue.toFixed(2)}<span>${affordable ? 'Affordable' : 'Not Affordable'}</span>`;
        chartCenterText.style.color = affordable ? 'green' : 'red';
    }

    function calculateAffordability() {
        const loanAmount = carPrice - downPayment;
        const termYears = parseInt(urlParams.get('termYears')) || 0;

        if (termYears > 0) {
            const interestRate = 0.05; // Estimated interest rate
            const numberOfPayments = termYears * 12;
            const monthlyInterestRate = interestRate / 12;
            const monthlyPaymentValue = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

            maxLoanAmount.textContent = `$${loanAmount.toLocaleString()}`;
            monthlyPayment.textContent = `$${monthlyPaymentValue.toFixed(2)}`;

            const affordable = monthlyPaymentValue <= monthlyIncome;
            updateChart(downPayment, loanAmount, monthlyPaymentValue, affordable);

            if (affordable) {
                affordabilityMessage.textContent = "This car is affordable based on the 20/4/10 rule.";
                affordabilityMessage.style.color = "green";
            } else {
                affordabilityMessage.textContent = "This car may not be affordable based on the 20/4/10 rule.";
                affordabilityMessage.style.color = "red";
            }
        } else {
            maxLoanAmount.textContent = "$0";
            monthlyPayment.textContent = "$0";
            affordabilityMessage.textContent = "";
            updateChart(0, 0, 0, false);
        }
    }

    calculateAffordability();
});
