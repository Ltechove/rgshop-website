// Shopping Cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.cartCount = document.querySelector('.cart-count');
        this.cartItems = document.querySelector('.cart-items');
        this.totalAmount = document.querySelector('.total-amount');
        this.checkoutBtn = document.querySelector('.checkout-btn');
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.dataset.id;
                const productCard = e.target.closest('.product-card');
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''));
                const productImage = productCard.querySelector('.product-image').src;

                this.addItem({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage
                });
            });
        });

        // Checkout button
        this.checkoutBtn.addEventListener('click', () => {
            this.checkout();
        });
    }

    addItem(item) {
        this.items.push(item);
        this.updateCart();
    }

    removeItem(index) {
        this.items.splice(index, 1);
        this.updateCart();
    }

    updateCart() {
        // Update cart count
        this.cartCount.textContent = this.items.length;

        // Update cart items display
        this.cartItems.innerHTML = '';
        this.items.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <span class="remove-item" data-index="${index}">×</span>
            `;
            this.cartItems.appendChild(cartItem);
        });

        // Update total
        this.total = this.items.reduce((sum, item) => sum + item.price, 0);
        this.totalAmount.textContent = this.total.toFixed(2);

        // Add remove item event listeners
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.removeItem(index);
            });
        });
    }

    checkout() {
        if (this.items.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        // Here you would integrate with Payable
        // For now, we'll just show a success message
        alert('Proceeding to checkout with Payable...');
        // Reset cart after checkout
        this.items = [];
        this.updateCart();
    }
}

// Initialize the shopping cart
const cart = new ShoppingCart();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Scroll to top button
window.addEventListener('scroll', function() {
    const scrollTop = document.querySelector('.scroll-top');
    if (window.pageYOffset > 300) {
        if (!scrollTop) {
            const button = document.createElement('button');
            button.className = 'scroll-top';
            button.innerHTML = '↑';
            button.onclick = function() {
                window.scrollTo({top: 0, behavior: 'smooth'});
            };
            document.body.appendChild(button);
        }
    } else if (scrollTop) {
        scrollTop.remove();
    }
});

// Admin Authentication
const SUPER_ADMIN = {
    username: 'admin',
    password: 'admin123', // You should change this to a secure password
    role: 'super_admin'
};

// Store data in localStorage
let products = JSON.parse(localStorage.getItem('products')) || [];
let pages = JSON.parse(localStorage.getItem('pages')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const adminModal = document.getElementById('admin-modal');
const adminLoginForm = document.getElementById('admin-login-form');
const adminDashboard = document.getElementById('admin-dashboard');
const adminLogin = document.getElementById('admin-login');
const productGrid = document.querySelector('.product-grid');
const addProductBtn = document.querySelector('.add-product-btn');

// Admin Authentication
let currentUser = null;

adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = e.target.elements[0].value;
    const password = e.target.elements[1].value;

    if (username === SUPER_ADMIN.username && password === SUPER_ADMIN.password) {
        currentUser = SUPER_ADMIN;
        adminLogin.style.display = 'none';
        adminDashboard.style.display = 'block';
        loadAdminDashboard();
    } else {
        alert('Invalid credentials!');
    }
});

// Show/Hide Admin Modal
document.querySelector('.admin-link').addEventListener('click', (e) => {
    e.preventDefault();
    adminModal.style.display = 'block';
});

document.querySelector('.close').addEventListener('click', () => {
    adminModal.style.display = 'none';
});

// Tab Switching
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

// Product Management
function addProduct(product) {
    products.push({
        id: Date.now(),
        ...product,
        createdAt: new Date().toISOString()
    });
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}

function editProduct(id, updatedProduct) {
    products = products.map(product => 
        product.id === id ? { ...product, ...updatedProduct } : product
    );
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}

function deleteProduct(id) {
    products = products.filter(product => product.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}

// Display Products
function displayProducts() {
    const productList = document.querySelector('.product-list');
    const publicProductGrid = document.querySelector('.product-grid');
    
    // Admin product list
    if (productList) {
        productList.innerHTML = products.map(product => `
            <div class="admin-product-item">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-details">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <p>${product.category}</p>
                </div>
                <div class="product-actions">
                    <button onclick="editProductModal(${product.id})">Edit</button>
                    <button onclick="deleteProduct(${product.id})">Delete</button>
                </div>
            </div>
        `).join('');
    }

    // Public product grid
    if (publicProductGrid) {
        publicProductGrid.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-price">$${product.price}</p>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `).join('');
    }
}

// Add Product Modal
addProductBtn.addEventListener('click', () => {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Add New Product</h2>
                <span class="close">&times;</span>
            </div>
            <form id="add-product-form">
                <input type="text" placeholder="Product Name" required>
                <input type="number" placeholder="Price" step="0.01" required>
                <select required>
                    <option value="">Select Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home & Living</option>
                </select>
                <input type="text" placeholder="Image URL" required>
                <textarea placeholder="Description" required></textarea>
                <button type="submit">Add Product</button>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'block';

    const form = modal.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newProduct = {
            name: e.target.elements[0].value,
            price: parseFloat(e.target.elements[1].value),
            category: e.target.elements[2].value,
            image: e.target.elements[3].value,
            description: e.target.elements[4].value
        };
        addProduct(newProduct);
        modal.remove();
    });

    modal.querySelector('.close').addEventListener('click', () => {
        modal.remove();
    });
});

// Page Management
function addPage(page) {
    pages.push({
        id: Date.now(),
        ...page,
        createdAt: new Date().toISOString()
    });
    localStorage.setItem('pages', JSON.stringify(pages));
    updateNavigation();
}

function updateNavigation() {
    const navLinks = document.querySelector('.nav-links');
    const customPages = pages.map(page => `
        <li><a href="#${page.slug}">${page.title}</a></li>
    `).join('');
    
    // Insert custom pages before the Admin link
    const adminLink = navLinks.querySelector('.admin-link').parentElement;
    adminLink.insertAdjacentHTML('beforebegin', customPages);
}

// Cart Functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push({
            ...product,
            quantity: 1
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartDropdown();
    }
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.length;
}

function updateCartDropdown() {
    const cartItems = document.querySelector('.cart-items');
    const totalAmount = document.querySelector('.total-amount');
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h3 class="cart-item-title">${item.name}</h3>
                <p class="cart-item-price">$${item.price}</p>
            </div>
            <i class="fas fa-times remove-item" onclick="removeFromCart(${item.id})"></i>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalAmount.textContent = total.toFixed(2);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDropdown();
}

// Page Builder Functionality
const pageBuilderForm = document.getElementById('page-builder-form');
const pageList = document.querySelector('.page-list');

pageBuilderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = e.target.elements[0].value;
    const slug = e.target.elements[1].value;
    const content = e.target.elements[2].value;

    const newPage = {
        title,
        slug,
        content,
        id: Date.now()
    };

    addPage(newPage);
    e.target.reset();
});

function displayPages() {
    if (pageList) {
        pageList.innerHTML = pages.map(page => `
            <div class="page-item">
                <span class="page-item-title">${page.title}</span>
                <div class="page-item-actions">
                    <button class="edit-btn" onclick="editPage(${page.id})">Edit</button>
                    <button class="delete-btn" onclick="deletePage(${page.id})">Delete</button>
                </div>
            </div>
        `).join('');
    }
}

function editPage(id) {
    const page = pages.find(p => p.id === id);
    if (!page) return;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Edit Page</h2>
                <span class="close">&times;</span>
            </div>
            <form class="page-builder-form">
                <input type="text" placeholder="Page Title" value="${page.title}" required>
                <input type="text" placeholder="Page URL Slug" value="${page.slug}" required>
                <textarea placeholder="Page Content (HTML supported)" required>${page.content}</textarea>
                <button type="submit">Update Page</button>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'block';

    const form = modal.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const updatedPage = {
            title: e.target.elements[0].value,
            slug: e.target.elements[1].value,
            content: e.target.elements[2].value
        };
        
        pages = pages.map(p => p.id === id ? { ...p, ...updatedPage } : p);
        localStorage.setItem('pages', JSON.stringify(pages));
        displayPages();
        updateNavigation();
        modal.remove();
    });

    modal.querySelector('.close').addEventListener('click', () => {
        modal.remove();
    });
}

function deletePage(id) {
    if (confirm('Are you sure you want to delete this page?')) {
        pages = pages.filter(p => p.id !== id);
        localStorage.setItem('pages', JSON.stringify(pages));
        displayPages();
        updateNavigation();
    }
}

// Update the loadAdminDashboard function
function loadAdminDashboard() {
    displayProducts();
    displayPages();
}

// Update the initialization
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartCount();
    updateCartDropdown();
    updateNavigation();
    
    // Handle dynamic page content
    window.addEventListener('hashchange', handlePageNavigation);
    handlePageNavigation();
});

function handlePageNavigation() {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const page = pages.find(p => p.slug === hash);
    if (page) {
        // Create a temporary container for the custom page
        const main = document.querySelector('main');
        const customPageSection = document.createElement('section');
        customPageSection.className = 'custom-page';
        customPageSection.innerHTML = `
            <h2>${page.title}</h2>
            <div class="page-content">
                ${page.content}
            </div>
        `;

        // Remove any existing custom page section
        const existingCustomPage = document.querySelector('.custom-page');
        if (existingCustomPage) {
            existingCustomPage.remove();
        }

        main.appendChild(customPageSection);
    }
} 