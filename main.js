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

    function updateCarPrice() {
        const carPrice = parseFloat(carPriceInput.value) || 0;
        carPriceValue.textContent = `$${carPrice.toLocaleString()}`;
        downPayment.textContent = `$${(carPrice * 0.2).toLocaleString()}`;
        calculateAffordability();
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

    function calculateAffordability() {
        const carPrice = parseFloat(carPriceInput.value) || 0;
        const downPaymentValue = carPrice * 0.2;
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

            if (monthlyPaymentValue <= monthlyIncomeValue) {
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
        }
    }

    carPriceInput.addEventListener('input', updateCarPrice);
    repaymentTerm.addEventListener('change', updateRepaymentTerm);
    incomeAmount.addEventListener('input', updateIncome);
    incomeFrequency.addEventListener('change', updateIncome);

    updateCarPrice();
    updateRepaymentTerm();
    updateIncome();
});
