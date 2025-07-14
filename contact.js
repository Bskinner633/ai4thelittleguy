document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would normally send the data to your server
        // For now, we'll just show a success message and create a mailto link
        
        // Create mailto link
        const subject = encodeURIComponent('AI Consultation Request from ' + data.name);
        const body = encodeURIComponent(
            `Name: ${data.name}\n` +
            `Company: ${data.company || 'Not specified'}\n` +
            `Email: ${data.email}\n` +
            `Phone: ${data.phone || 'Not specified'}\n` +
            `Service Interest: ${data.service || 'Not specified'}\n\n` +
            `Message:\n${data.message}`
        );
        
        // Show success message
        formMessage.className = 'form-message success';
        formMessage.textContent = 'Thank you for your inquiry! We\'ll get back to you within 24 hours. Redirecting to email...';
        
        // Open email client after a short delay
        setTimeout(() => {
            window.location.href = `mailto:Blake.Skinner@ai4thelittleguy.com?subject=${subject}&body=${body}`;
        }, 2000);
        
        // Reset form
        setTimeout(() => {
            contactForm.reset();
            formMessage.style.display = 'none';
        }, 5000);
    });
    
    // Add form validation feedback
    const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = '';
            }
        });
    });
});