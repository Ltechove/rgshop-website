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