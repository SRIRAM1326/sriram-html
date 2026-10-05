document.addEventListener('DOMContentLoaded', () => {
    
    // Toggle Logic
    const btnLogin = document.getElementById('show-login');
    const btnSignup = document.getElementById('show-signup');
    const formLogin = document.getElementById('login-form');
    const formSignup = document.getElementById('signup-form');

    btnLogin.addEventListener('click', () => {
        btnLogin.classList.add('active');
        btnSignup.classList.remove('active');
        formLogin.classList.add('active-form');
        formSignup.classList.remove('active-form');
    });

    btnSignup.addEventListener('click', () => {
        btnSignup.classList.add('active');
        btnLogin.classList.remove('active');
        formSignup.classList.add('active-form');
        formLogin.classList.remove('active-form');
    });

    // Password Visibility Toggle
    const toggleBtns = document.querySelectorAll('.toggle-password');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const input = document.getElementById(targetId);
            const icon = btn.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });

    // Form Validation Utility
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showError(inputId, message) {
        const input = document.getElementById(inputId);
        const errSpan = document.getElementById(`${inputId}-err`);
        if(input) input.classList.add('error-input');
        if(errSpan) errSpan.innerText = message;
    }

    function clearErrors(formId) {
        const form = document.getElementById(formId);
        const inputs = form.querySelectorAll('input');
        const errSpans = form.querySelectorAll('.error-msg');
        
        inputs.forEach(input => input.classList.remove('error-input'));
        errSpans.forEach(span => span.innerText = '');
    }

    // Login Form Submission
    document.getElementById('login').addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors('login');
        let isValid = true;

        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-password').value;

        if (!email || !validateEmail(email)) {
            showError('login-email', 'Please enter a valid email address.');
            isValid = false;
        }

        if (!pass) {
            showError('login-password', 'Password is required.');
            isValid = false;
        }

        if (isValid) {
            alert('Login successful! (Demo)');
            e.target.reset();
        }
    });

    // Signup Form Submission
    document.getElementById('signup').addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors('signup');
        let isValid = true;

        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const pass = document.getElementById('signup-password').value;
        const confirm = document.getElementById('signup-confirm').value;
        const terms = document.getElementById('terms').checked;

        if (name.length < 3) {
            showError('signup-name', 'Name must be at least 3 characters.');
            isValid = false;
        }

        if (!validateEmail(email)) {
            showError('signup-email', 'Please enter a valid email address.');
            isValid = false;
        }

        if (pass.length < 8) {
            showError('signup-password', 'Password must be at least 8 characters.');
            isValid = false;
        }

        if (pass !== confirm) {
            showError('signup-confirm', 'Passwords do not match.');
            isValid = false;
        }

        if (!terms) {
            document.getElementById('terms-err').innerText = 'You must agree to the terms.';
            isValid = false;
        }

        if (isValid) {
            alert('Account created successfully! (Demo)');
            e.target.reset();
            // Switch back to login
            btnLogin.click();
        }
    });

});
