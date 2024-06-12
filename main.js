document.addEventListener('DOMContentLoaded', function() {
    const carPriceInput = document.getElementById('carPrice');
    const carPriceValue = document.getElementById('carPriceValue');
    const downPayment = document.getElementById('downPayment');
    const repaymentTerm = document.getElementById('repaymentTerm');
    const repaymentTermDisplay = document.getElementById('repaymentTermDisplay');
    const incomeAmount = document.getElementById('incomeAmount');
    const incomeFrequency = document.getElementById('incomeFrequency');
    const monthlyIncome = document.getElementById('monthlyIncome');

    function updateValues() {
        const carPrice = carPriceInput.value;
        carPriceValue.textContent = `$${Number(carPrice).toLocaleString()}`;
        downPayment.textContent = `$${(carPrice * 0.2).toLocaleString()}`;
    }

    function updateRepaymentTerm() {
        repaymentTermDisplay.textContent = repaymentTerm.value;
    }

    function updateIncome() {
        const income = parseFloat(incomeAmount.value) || 0;
        const frequency = incomeFrequency.value;
        let monthlyIncomeValue = income;

        if (frequency === 'yearly') {
            monthlyIncomeValue = income / 12;
        }

        monthlyIncome.textContent = `$${(monthlyIncomeValue * 0.1).toFixed(2)}`;
    }

    carPriceInput.addEventListener('input', updateValues);
    repaymentTerm.addEventListener('change', updateRepaymentTerm);
    incomeAmount.addEventListener('input', updateIncome);
    incomeFrequency.addEventListener('change', updateIncome);

    updateValues();
    updateRepaymentTerm();
    updateIncome();
});
