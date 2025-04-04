// Admin Authentication
const SUPER_ADMIN = {
    username: 'admin',
    password: 'admin123'
};

document.addEventListener('DOMContentLoaded', function() {
    const adminModal = document.getElementById('admin-modal');
    const loginForm = document.getElementById('admin-login-form');
    const adminDashboard = document.getElementById('admin-dashboard');

    // Show admin modal when clicking admin link
    document.querySelector('.admin-link').addEventListener('click', function(e) {
        e.preventDefault();
        if (adminModal) {
            adminModal.style.display = 'block';
        }
    });

    // Close modal when clicking the close button
    document.querySelector('.close').addEventListener('click', function() {
        if (adminModal) {
            adminModal.style.display = 'none';
        }
    });

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.querySelector('#admin-username').value;
            const password = document.querySelector('#admin-password').value;

            if (username === SUPER_ADMIN.username && password === SUPER_ADMIN.password) {
                document.getElementById('admin-login').style.display = 'none';
                if (adminDashboard) {
                    adminDashboard.style.display = 'block';
                }
            } else {
                alert('Invalid credentials. Please try again.');
            }
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === adminModal) {
            adminModal.style.display = 'none';
        }
    });
}); 