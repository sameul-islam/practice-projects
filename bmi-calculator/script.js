const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const resultDiv = document.getElementById('result');
const calcBtn = document.getElementById('calculate-btn');
calcBtn.addEventListener('click', () => {
    const height = parseFloat(heightInput.value) / 100;
    const weight = parseFloat(weightInput.value);
    if (!height || !weight || height <= 0 || weight <= 0) {
        resultDiv.innerHTML = "<p style='color:red;'>Please enter valid height and weight.</p>";
        return;
    }
    const bmi = (weight / (height * height)).toFixed(2);
    let status = "";
    if (bmi < 18.5) status = "Underweight";
    else if (bmi < 25) status = "Normal";
    else if (bmi < 30) status = "Overweight";
    else status = "Obese";
    resultDiv.innerHTML = `
    Your BMI is <strong>${bmi}</strong> <br>
    Status: <strong>${status}</strong>
    `;
    heightInput.value = "";
    weightInput.value = "";
});
addEventListener('keypress', (e) => {
    if (e.key === "Enter"){
        calcBtn.click();
    }
})