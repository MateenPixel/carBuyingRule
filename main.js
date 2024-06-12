document.addEventListener('DOMContentLoaded', function() {
    const carPriceInput = document.getElementById('carPrice');
    const carPriceValue = document.getElementById('carPriceValue');
    const downPayment = document.getElementById('downPayment');
    const repaymentTerm = document.getElementById('repaymentTerm');
    const repaymentTermDisplay = document.getElementById('repaymentTermDisplay');

    function updateValues() {
        const carPrice = carPriceInput.value;
        carPriceValue.textContent = `$${Number(carPrice).toLocaleString()}`;
        downPayment.textContent = `$${(carPrice * 0.2).toLocaleString()}`;
    }

    function updateRepaymentTerm() {
        repaymentTermDisplay.textContent = repaymentTerm.value;
    }

    carPriceInput.addEventListener('input', updateValues);
    repaymentTerm.addEventListener('change', updateRepaymentTerm);

    // Initial update
    updateValues();
    updateRepaymentTerm();
});
