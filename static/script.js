document.addEventListener('DOMContentLoaded', () => {
    const passwordOutput = document.getElementById('generated-password');
    const strengthOutput = document.getElementById('strength');
    const copyBtn = document.getElementById('copy-btn');
    
    if (passwordOutput && strengthOutput) {
        evaluatePasswordStrength(passwordOutput.textContent);
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(passwordOutput.textContent).then(() => {
                alert('Password copied to clipboard!');
            }).catch(err => {
                alert('Failed to copy password!');
                console.error(err);
            });
        });
    }
    
    function evaluatePasswordStrength(password) {
        let strength = 'Weak';
        let reasons = [];
        
        if (password.length >= 12) {
            strength = 'Strong';
        } else if (password.length >= 8) {
            strength = 'Medium';
        }

        if (/[a-z]/.test(password)) {
            reasons.push('lowercase letters');
        }

        if (/[A-Z]/.test(password)) {
            reasons.push('uppercase letters');
        }

        if (/\d/.test(password)) {
            reasons.push('digits');
        }

        if (/[!@#]/.test(password)) {
            reasons.push('special characters');
        }

        if (reasons.length >= 3 && password.length >= 12) {
            strength = 'Super Strong';
        }

        strengthOutput.textContent = `Password Strength: ${strength}. Includes: ${reasons.join(', ')}.`;
    }
});
