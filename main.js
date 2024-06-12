document.addEventListener('DOMContentLoaded', function() {
    const carPriceInput = document.getElementById('carPrice');
    const carPriceValue = document.getElementById('carPriceValue');
    const downPayment = document.getElementById('downPayment');

    function updateValues() {
        const carPrice = carPriceInput.value;
        carPriceValue.textContent = `$${Number(carPrice).toLocaleString()}`;
        downPayment.textContent = `$${(carPrice * 0.2).toLocaleString()}`;
    }

    carPriceInput.addEventListener('input', updateValues);

    // Initial update
    updateValues();
});
