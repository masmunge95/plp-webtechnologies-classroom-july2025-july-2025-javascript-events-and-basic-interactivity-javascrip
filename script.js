// --- Feature 1: Theme Toggler ---
// Selects the theme toggle button.
const themeToggleButton = document.getElementById('toggleTheme');

// When the button is clicked, it toggles the 'dark-theme' class on the body.
themeToggleButton.addEventListener('click', function () {
    document.body.classList.toggle('dark-theme');
});

// --- Feature 2: Text Toggler ---
// Selects the text toggle button and the paragraph to be hidden/shown.
const toggleTextButton = document.getElementById('toggleText');
const textToToggle = document.getElementById('hidetext');

// When the button is clicked, it checks if the text is hidden and toggles its visibility.
toggleTextButton.addEventListener('click', function () {
    const isHidden = textToToggle.style.display === 'none';
    if (isHidden) {
        textToToggle.style.display = 'block';
        toggleTextButton.textContent = 'Hide Text';
    } else {
        textToToggle.style.display = 'none';
        toggleTextButton.textContent = 'Show Text';
    }
});

// --- Feature 3: Form Validation ---
const form = document.querySelector('#form1 form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const successMessage = document.getElementById('success-message');

// Helper function to display an error message for a specific field
const setError = (input, message) => {
    const errorDisplay = document.getElementById(`${input.id}-error`);
    errorDisplay.innerText = message;
    input.classList.add('invalid');
};

// Helper function to clear all error messages and invalid styles
const clearErrors = () => {
    document.querySelectorAll('.error-message').forEach(el => el.innerText = '');
    document.querySelectorAll('#form1 input').forEach(el => el.classList.remove('invalid'));
    successMessage.innerText = '';
};

// This function contains all the validation logic.
const validateForm = () => {
    clearErrors();
    let isValid = true;

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    // Name validation
    if (nameValue === '') {
        setError(nameInput, 'Username is required.');
        isValid = false;
    }

    // Email validation
    if (emailValue === '') {
        setError(emailInput, 'Email is required.');
        isValid = false;
    } else {
        const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailFormat.test(emailValue)) {
            setError(emailInput, 'Please enter a valid email address.');
            isValid = false;
        }
    }

    // Password validation
    if (passwordValue === '') {
        setError(passwordInput, 'Password is required.');
        isValid = false;
    } else {
        const passwordErrors = [];
        if (passwordValue.length < 8) passwordErrors.push('be at least 8 characters');
        if (!/[a-z]/.test(passwordValue)) passwordErrors.push('contain a lowercase letter');
        if (!/[A-Z]/.test(passwordValue)) passwordErrors.push('contain an uppercase letter');
        if (!/\d/.test(passwordValue)) passwordErrors.push('contain a number');
        if (!/[@$!%*?&]/.test(passwordValue)) passwordErrors.push('contain a special character');

        if (passwordErrors.length > 0) {
            setError(passwordInput, `Password must ${passwordErrors.join(', ')}.`);
            isValid = false;
        }
    }

    // If all checks pass, show success message and reset the form
    if (isValid) {
        successMessage.innerText = '✅ Form submitted successfully!';
        // Clear the form after a short delay.
        setTimeout(() => {
            form.reset();
            clearErrors();
        }, 2000);
    }
};

// When the form is submitted, run the validation. If it fails, prevent submission.
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Always prevent default submission to handle it via JS
    validateForm();
});

// --- Feature 4: Dropdown Menu ---
const dropdownBtn = document.getElementById('dropdownBtn');
const dropdownContent = document.getElementById('myDropdown');

// Toggles the 'show' class to display or hide the dropdown content
dropdownBtn.addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent the window click event from firing immediately
    dropdownContent.classList.toggle('show');
});

// Close the dropdown if the user clicks outside of it or on a dropdown item
window.addEventListener('click', function(event) {
    // Check if the click is outside the dropdown container
    if (!event.target.closest('.dropdown')) {
        dropdownContent.classList.remove('show');
    }
});

// --- Feature 5: Collapsible FAQ ---
const faqContainer = document.querySelector('.faq-container');

faqContainer.addEventListener('click', function(event) {
    const question = event.target.closest('.faq-question');
    if (!question) return;

    const answer = question.nextElementSibling;
    question.classList.toggle('active');

    // Animate the opening/closing of the answer
    if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
    } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
    }
});