document.addEventListener('DOMContentLoaded', function() {
    const carPriceInput = document.getElementById('carPrice');
    const carPriceValue = document.getElementById('carPriceValue');
    const downPayment = document.getElementById('downPayment');
    const repaymentTerm = document.getElementById('repaymentTerm');
    const repaymentTermDisplay = document.getElementById('repaymentTermDisplay');
    const incomeAmount = document.getElementById('incomeAmount');
    const incomeFrequency = document.getElementById('incomeFrequency');
    const monthlyIncome = document.getElementById('monthlyIncome');
    const maxLoanAmount = document.getElementById('maxLoanAmount');
    const monthlyPayment = document.getElementById('monthlyPayment');
    const affordabilityMessage = document.getElementById('affordabilityMessage');
    const chartCenterText = document.getElementById('chartCenterText');
    const car = document.getElementById('car');
    const backgroundOverlay = document.getElementById('background-overlay');

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

    function updateCarPrice() {
        const carPrice = parseFloat(carPriceInput.value) || 0;
        carPriceValue.textContent = `$${carPrice.toLocaleString()}`;
        const downPaymentValue = carPrice * 0.2;
        downPayment.textContent = `$${downPaymentValue.toLocaleString()}`;
        calculateAffordability(downPaymentValue);
    }

    function updateRepaymentTerm() {
        repaymentTermDisplay.textContent = repaymentTerm.value;
        calculateAffordability();
    }

    function updateIncome() {
        const income = parseFloat(incomeAmount.value) || 0;
        const frequency = incomeFrequency.value;
        let monthlyIncomeValue = income;

        if (frequency === 'yearly') {
            monthlyIncomeValue = income / 12;
        }

        monthlyIncome.textContent = `$${(monthlyIncomeValue * 0.1).toFixed(2)}`;
        calculateAffordability();
    }

    function calculateAffordability(downPaymentValue = null) {
        const carPrice = parseFloat(carPriceInput.value) || 0;
        downPaymentValue = downPaymentValue !== null ? downPaymentValue : carPrice * 0.2;
        const loanAmount = carPrice - downPaymentValue;
        const termYears = parseInt(repaymentTerm.value) || 0;
        const monthlyIncomeValue = parseFloat(monthlyIncome.textContent.replace('$', '').replace(',', '')) || 0;

        if (termYears > 0) {
            const interestRate = 0.05; // Estimated interest rate
            const numberOfPayments = termYears * 12;
            const monthlyInterestRate = interestRate / 12;
            const monthlyPaymentValue = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

            maxLoanAmount.textContent = `$${loanAmount.toLocaleString()}`;
            monthlyPayment.textContent = `$${monthlyPaymentValue.toFixed(2)}`;

            const affordable = monthlyPaymentValue <= monthlyIncomeValue;
            updateChart(downPaymentValue, loanAmount, monthlyPaymentValue, affordable);

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

    carPriceInput.addEventListener('input', updateCarPrice);
    repaymentTerm.addEventListener('change', updateRepaymentTerm);
    incomeAmount.addEventListener('input', updateIncome);
    incomeFrequency.addEventListener('change', updateIncome);

    updateCarPrice();
    updateRepaymentTerm();
    updateIncome();

    document.addEventListener('mousemove', (event) => {
        const carWidth = car.offsetWidth;
        const carHeight = car.offsetHeight;
        const centerX = event.clientX - carWidth / 2;
        const centerY = event.clientY - carHeight / 2;
        car.style.left = `${centerX}px`;
        car.style.top = `${centerY}px`;

        const angle = Math.atan2(event.clientY - (window.innerHeight / 2 + window.scrollY), event.clientX - (window.innerWidth / 2 + window.scrollX)) * 180 / Math.PI - 90;
        car.style.transform = `rotate(${angle}deg)`;
    });

    backgroundOverlay.addEventListener('mousemove', (event) => {
        car.style.display = 'block';
    });

    main.addEventListener('mousemove', (event) => {
        car.style.display = 'none';
    });
});
