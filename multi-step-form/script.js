const form = document.getElementById('multiForm');
const steps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.next');
const prevBtns = document.querySelectorAll('.prev');
const progress = document.getElementById('progress');
const stepsCircles = document.querySelectorAll('.step');
const result = document.getElementById('result');

let currentStep = 0;

// When the "Next" button is clicked, proceed to the next step only if the input is valid. Otherwise, stay on the current step.
nextBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (!validateStep(currentStep)) return;
    currentStep++;
    updateFormSteps();
    updateProgress();
  });
});

prevBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    currentStep--;
    updateFormSteps();
    updateProgress();
  });
});

// When the "Submit" button is clicked, check if all input fields are valid.
// If any input is invalid, show an error and stop the submission.
// If all inputs are valid, submit the form successfully and reset it to the first step.

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validateStep(currentStep)) return;

  result.textContent = "Form submitted successfully!";
  form.reset();
  currentStep = 0;
  updateFormSteps();
  updateProgress();

  // The success message will automatically disappear after 3 seconds.
  setTimeout(() => {
    result.textContent = "";
  }, 3000);

  steps[0].querySelector('input').focus();
});

// Track the current step of the form and keep the input field focused.
function updateFormSteps() {
  steps.forEach((step, index) => {
    step.classList.toggle('active', index === currentStep);
  });
  currentInputFocus();
}

// A visual progress design is implemented for each step.
// The progress bar's width updates based on the current step:
// 0% for the first step, 50% for the middle step, and 100% for the final step.

function updateProgress() {
  stepsCircles.forEach((circle, idx) => {
    circle.classList.toggle('active', idx <= currentStep);
  });
  const width = (currentStep / (steps.length - 1)) * 100;
  progress.style.width = `${width}%`;
}

// This function validates the input fields for name, email, and password.
// If any input is invalid, it shows an error on the current step
// and prevents moving to the next step.
// Validation rules can be easily updated or customized as needed, including password requirements.

function validateStep(stepIndex) {
  const current = steps[stepIndex];
  const input = current.querySelector('input');
  const error = current.querySelector('.error');

  if (!input.value.trim()) {
    error.textContent = "This field is required.";
    return false;
  }

  if (input.type === "email" && !input.value.includes('@')) {
    error.textContent = "Enter a valid email.";
    return false;
  }

  if (input.type === "password" && input.value.length < 6) {
    error.textContent = "Minimum 6 characters.";
    return false;
  }

  error.textContent = '';
  return true;
}

// When the Enter key is pressed, move to the next step.
// If on the last step, submit the form.

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        currentStep++;
        updateFormSteps();
        updateProgress();
      } else {
        form.requestSubmit();
      }
    }
  }

  // When the right arrow key is pressed, move to the next step only if the input is valid.
// Do not submit the form on right arrow key press.
// Proceed to the next step only when the input field is valid.

  if (e.key === "ArrowRight" && currentStep < steps.length - 1) {
    if (validateStep(currentStep)) {
      currentStep++;
      updateFormSteps();
      updateProgress();
    }
  }

  // When the left arrow key is pressed, go back to the previous step.
  if (e.key === "ArrowLeft" && currentStep > 0) {
    currentStep--;
    updateFormSteps();
    updateProgress();
  }
});

// After the DOM is fully loaded, automatically focus the active input box with a 100ms delay.

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    currentInputFocus();
  }, 100);
});

// Automatically keep the input box focused on the current active step.

function currentInputFocus() {
  const activeStep = steps[currentStep];
  const input = activeStep.querySelector('input');
  if (input) {
    input.focus();
  }
}
