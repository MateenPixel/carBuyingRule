document.addEventListener('DOMContentLoaded', function() {
    const carPriceInput = document.getElementById('carPrice');
    const carPriceValue = document.getElementById('carPriceValue');
    const downPayment = document.getElementById('downPayment');
    const repaymentTerm = document.getElementById('repaymentTerm');
    const repaymentTermDisplay = document.getElementById('repaymentTermDisplay');
    const incomeAmount = document.getElementById('incomeAmount');
    const incomeFrequency = document.getElementById('incomeFrequency');
    const monthlyIncome = document.getElementById('monthlyIncome');
    const calculateBtn = document.getElementById('calculateBtn');
    const car = document.getElementById('car');

    function updateCarPrice() {
        const carPrice = parseFloat(carPriceInput.value) || 0;
        carPriceValue.textContent = `$${carPrice.toLocaleString()}`;
        const downPaymentValue = carPrice * 0.2;
        downPayment.textContent = `$${downPaymentValue.toLocaleString()}`;
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
        car.style.display = 'block'; // Ensure car is visible when moving
    });

    calculateBtn.addEventListener('click', () => {
        const carPrice = carPriceInput.value;
        const downPaymentValue = carPrice * 0.2;
        const termYears = repaymentTerm.value;
        const income = incomeAmount.value;
        const frequency = incomeFrequency.value;
        let monthlyIncomeValue = income;

        if (frequency === 'yearly') {
            monthlyIncomeValue = income / 12;
        }

        monthlyIncomeValue *= 0.1;

        const queryString = `carPrice=${carPrice}&downPayment=${downPaymentValue}&termYears=${termYears}&monthlyIncome=${monthlyIncomeValue}`;
        window.location.href = `results.html?${queryString}`;
    });
});
