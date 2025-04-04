// Admin Authentication
const SUPER_ADMIN = {
    username: 'admin',
    password: 'admin123'
};

document.addEventListener('DOMContentLoaded', function() {
    const adminModal = document.getElementById('admin-modal');
    const loginForm = document.getElementById('admin-login-form');
    const adminDashboard = document.getElementById('admin-dashboard');

    // Update date and time
    const dateTimeElement = document.querySelector('.date-time');
    if (dateTimeElement) {
        setInterval(() => {
            const now = new Date();
            dateTimeElement.textContent = now.toLocaleString();
        }, 1000);
    }

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
                    initializeAdminDashboard();
                }
            } else {
                alert('Invalid credentials. Please try again.');
            }
        });
    }

    // Initialize admin dashboard
    function initializeAdminDashboard() {
        initializeCharts();
        setupBarcodeScanner();
        setupEventListeners();
    }

    // Initialize Charts
    function initializeCharts() {
        // Sales Chart
        const salesCtx = document.getElementById('salesChart');
        if (salesCtx) {
            new Chart(salesCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Sales',
                        data: [12, 19, 3, 5, 2, 3],
                        borderColor: '#3498db',
                        tension: 0.4
                    }]
                }
            });
        }

        // Products Chart
        const productsCtx = document.getElementById('productsChart');
        if (productsCtx) {
            new Chart(productsCtx, {
                type: 'bar',
                data: {
                    labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
                    datasets: [{
                        label: 'Sales',
                        data: [12, 19, 3, 5, 2],
                        backgroundColor: '#3498db'
                    }]
                }
            });
        }

        // Demographics Chart
        const demographicsCtx = document.getElementById('demographicsChart');
        if (demographicsCtx) {
            new Chart(demographicsCtx, {
                type: 'pie',
                data: {
                    labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
                    datasets: [{
                        data: [15, 30, 25, 20, 10],
                        backgroundColor: ['#3498db', '#2ecc71', '#e74c3c', '#f1c40f', '#9b59b6']
                    }]
                }
            });
        }

        // Traffic Chart
        const trafficCtx = document.getElementById('trafficChart');
        if (trafficCtx) {
            new Chart(trafficCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Direct', 'Social', 'Search', 'Referral'],
                    datasets: [{
                        data: [40, 25, 20, 15],
                        backgroundColor: ['#3498db', '#2ecc71', '#e74c3c', '#f1c40f']
                    }]
                }
            });
        }
    }

    // Barcode Scanner Setup
    function setupBarcodeScanner() {
        const scanBtn = document.querySelector('.scan-btn');
        if (scanBtn) {
            scanBtn.addEventListener('click', function() {
                // Create scanner container
                const scannerContainer = document.createElement('div');
                scannerContainer.id = 'interactive';
                scannerContainer.className = 'viewport';
                document.body.appendChild(scannerContainer);

                Quagga.init({
                    inputStream: {
                        name: "Live",
                        type: "LiveStream",
                        target: scannerContainer,
                        constraints: {
                            facingMode: "environment"
                        },
                    },
                    decoder: {
                        readers: ["ean_reader", "ean_8_reader", "upc_reader", "upc_e_reader"]
                    }
                }, function(err) {
                    if (err) {
                        console.error(err);
                        alert('Failed to initialize barcode scanner. Please check if your device has a camera.');
                        return;
                    }
                    Quagga.start();
                });

                Quagga.onDetected(function(result) {
                    const code = result.codeResult.code;
                    document.querySelector('.barcode-scanner input').value = code;
                    Quagga.stop();
                    scannerContainer.remove();
                });
            });
        }
    }

    // Setup Event Listeners
    function setupEventListeners() {
        // Tab switching
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.style.display = 'none');
                
                btn.classList.add('active');
                document.getElementById(`${tabId}-tab`).style.display = 'block';
            });
        });

        // Import/Export functionality
        const importBtn = document.querySelector('.import-btn');
        if (importBtn) {
            importBtn.addEventListener('click', function() {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.csv,.xlsx';
                input.onchange = function(e) {
                    const file = e.target.files[0];
                    // Handle file import
                    console.log('Importing file:', file.name);
                };
                input.click();
            });
        }

        // Product search
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase();
                // Filter products based on search term
                filterProducts(searchTerm);
            });
        }

        // Product filters
        const filters = document.querySelectorAll('.product-filters select');
        filters.forEach(filter => {
            filter.addEventListener('change', function() {
                applyFilters();
            });
        });
    }

    // Filter products
    function filterProducts(searchTerm) {
        const products = document.querySelectorAll('.product-item');
        products.forEach(product => {
            const name = product.querySelector('h3').textContent.toLowerCase();
            if (name.includes(searchTerm)) {
                product.style.display = 'flex';
            } else {
                product.style.display = 'none';
            }
        });
    }

    // Apply filters
    function applyFilters() {
        const categoryFilter = document.querySelector('.category-filter').value;
        const stockFilter = document.querySelector('.stock-filter').value;
        const sortFilter = document.querySelector('.sort-filter').value;

        // Apply filters to products
        const products = Array.from(document.querySelectorAll('.product-item'));
        products.forEach(product => {
            const category = product.dataset.category;
            const stock = product.dataset.stock;

            const categoryMatch = !categoryFilter || category === categoryFilter;
            const stockMatch = !stockFilter || stock === stockFilter;

            product.style.display = categoryMatch && stockMatch ? 'flex' : 'none';
        });

        // Sort products
        sortProducts(products, sortFilter);
    }

    // Sort products
    function sortProducts(products, sortFilter) {
        const productList = document.querySelector('.product-list');
        products.sort((a, b) => {
            const aPrice = parseFloat(a.dataset.price);
            const bPrice = parseFloat(b.dataset.price);
            const aDate = new Date(a.dataset.date);
            const bDate = new Date(b.dataset.date);

            switch (sortFilter) {
                case 'price-high':
                    return bPrice - aPrice;
                case 'price-low':
                    return aPrice - bPrice;
                case 'newest':
                    return bDate - aDate;
                case 'oldest':
                    return aDate - bDate;
                default:
                    return 0;
            }
        });

        products.forEach(product => {
            productList.appendChild(product);
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === adminModal) {
            adminModal.style.display = 'none';
        }
    });
}); 