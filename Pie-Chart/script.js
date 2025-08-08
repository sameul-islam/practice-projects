function readJSON(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        if (raw === null) return fallback;
        const parsed = JSON.parse(raw);
        return (parsed ?? fallback);
    } catch (e) {
        console.warn(`Invalid JSON for key "${key}":`, e);
        return fallback;
    }
}

function readNumber(key, fallback = 0) {
    const value = parseFloat(localStorage.getItem(key));
    return isNaN(value) ? fallback : value;
}

const form = document.getElementById('expense-form');
const titleInput = document.getElementById('title');
const amountInput = document.getElementById('amount');
const categorySelect = document.getElementById('category');
const expensesDiv = document.getElementById('expenses');
const totalDisplay = document.getElementById('total');
const ctx = document.getElementById('pieChart').getContext('2d');

let expenses = readJSON('expenses', []);
let total = readNumber('total', 0);
let categoryTotal = readJSON('categoryTotal', {
    Food: 0,
    Transport: 0,
    Shopping: 0,
    Other: 0
});

let pieChart = new Chart(ctx, {
    type: 'pie',  // or "bar", "line", "doughnut"
    data: {
        labels: Object.keys(categoryTotal),
        datasets: [{
            label: "Expenses",
            data: Object.values(categoryTotal),
            backgroundColor: ["#ff6384", "#36a2eb", "#ffc356", "#7bc043"]
        }]
    },
    options: {
        responsive: true
    }
});

function updateChart() {
    pieChart.data.labels = Object.keys(categoryTotal);
    pieChart.data.datasets[0].data = Object.values(categoryTotal);
    pieChart.update();
}

function saveData() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('total', total.toString());
    localStorage.setItem('categoryTotal', JSON.stringify(categoryTotal));
}

function renderExpenses() {
    expensesDiv.innerHTML = '';
    expenses.forEach((expense, index) => {
        const div = document.createElement('div');
        div.classList.add("expense");
        div.innerHTML = `
            <span>${expense.title} (${expense.category})</span>
            <span>$${expense.amount.toFixed(2)} 
                <button data-index="${index}" class="delete-btn" title="Delete">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </span>
        `;
        expensesDiv.appendChild(div);
    });
    totalDisplay.textContent = total.toFixed(2);
}

function deleteExpense(index) {
    const expense = expenses[index];
    total -= expense.amount;
    categoryTotal[expense.category] -= expense.amount;
    expenses.splice(index, 1);
    saveData();
    renderExpenses();
    updateChart();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const category = categorySelect.value;

    if (!title || isNaN(amount) || amount <= 0 || !category) return;

    const expense = { title, amount, category };
    expenses.push(expense);
    total += amount;
    categoryTotal[category] += amount;

    saveData();
    renderExpenses();
    updateChart();

    titleInput.value = '';
    amountInput.value = '';
    categorySelect.value = '';
});

expensesDiv.addEventListener('click', (e) => {
    const btn = e.target.closest('.delete-btn');
    if (btn) {
        const index = parseInt(btn.getAttribute('data-index'));
        deleteExpense(index);
    }
});

renderExpenses();
updateChart();
