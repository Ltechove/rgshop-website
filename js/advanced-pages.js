// Advanced Pages JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all advanced page components
    initFaqAccordion();
    initTestimonialCarousel();
    initAdvancedPageBuilder();
});

// FAQ Accordion functionality
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle active class on the clicked item
            item.classList.toggle('active');
            
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
}

// Testimonial Carousel functionality
function initTestimonialCarousel() {
    const carousel = document.querySelector('.testimonial-carousel');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    
    if (!carousel || slides.length === 0) return;
    
    let currentSlide = 0;
    
    // Hide all slides except the first one
    slides.forEach((slide, index) => {
        if (index !== 0) {
            slide.style.display = 'none';
        }
    });
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.style.display = 'none';
        });
        
        // Show the selected slide
        slides[index].style.display = 'block';
        
        // Add fade-in animation
        slides[index].style.opacity = 0;
        setTimeout(() => {
            slides[index].style.opacity = 1;
            slides[index].style.transition = 'opacity 0.5s ease';
        }, 10);
    }
    
    // Event listeners for next and previous buttons
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
    }
    
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
    }
    
    // Auto-advance slides every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
}

// Advanced Page Builder functionality
function initAdvancedPageBuilder() {
    // This function will be called when the admin is creating a new page
    // It extends the existing page builder with advanced components
    
    const pageBuilderForm = document.getElementById('page-builder-form');
    if (!pageBuilderForm) return;
    
    // Create a component selector dropdown
    const componentSelector = document.createElement('div');
    componentSelector.className = 'component-selector';
    componentSelector.innerHTML = `
        <label for="component-type">Add Component:</label>
        <select id="component-type">
            <option value="">Select a component</option>
            <option value="hero">Hero Banner</option>
            <option value="features">Feature Grid</option>
            <option value="content">Content with Image</option>
            <option value="testimonials">Testimonials</option>
            <option value="cta">Call to Action</option>
            <option value="faq">FAQ Section</option>
        </select>
        <button type="button" id="add-component">Add</button>
    `;
    
    // Insert the component selector before the form's submit button
    const submitButton = pageBuilderForm.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.parentNode.insertBefore(componentSelector, submitButton);
    }
    
    // Get the content textarea
    const contentTextarea = document.getElementById('page-content');
    
    // Add event listener to the Add Component button
    const addComponentButton = document.getElementById('add-component');
    if (addComponentButton) {
        addComponentButton.addEventListener('click', () => {
            const componentType = document.getElementById('component-type').value;
            if (!componentType) return;
            
            // Get the HTML template for the selected component
            const componentHTML = getComponentTemplate(componentType);
            
            // Add the component HTML to the content textarea
            if (contentTextarea) {
                contentTextarea.value += componentHTML;
            }
        });
    }
}

// Function to get HTML templates for different components
function getComponentTemplate(componentType) {
    switch(componentType) {
        case 'hero':
            return `
<section class="advanced-hero" style="background-image: url('images/hero-bg.jpg');">
    <div class="advanced-hero-overlay">
        <div class="advanced-hero-content">
            <h1>Your Compelling Headline</h1>
            <p>A detailed subheading that explains your value proposition</p>
            <div class="advanced-hero-buttons">
                <a href="#" class="primary-button">Primary Action</a>
                <a href="#" class="secondary-button">Secondary Action</a>
            </div>
        </div>
    </div>
</section>
`;
        
        case 'features':
            return `
<section class="advanced-features">
    <div class="container">
        <div class="section-header">
            <h2>Key Features</h2>
            <p>Discover what makes our products special</p>
        </div>
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-star"></i>
                </div>
                <h3>Feature Title</h3>
                <p>Detailed description of this amazing feature and why it matters to your customers.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-bolt"></i>
                </div>
                <h3>Feature Title</h3>
                <p>Detailed description of this amazing feature and why it matters to your customers.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <h3>Feature Title</h3>
                <p>Detailed description of this amazing feature and why it matters to your customers.</p>
            </div>
        </div>
    </div>
</section>
`;
        
        case 'content':
            return `
<section class="advanced-content">
    <div class="container">
        <div class="content-with-image">
            <div class="content-text">
                <h2>Compelling Section Title</h2>
                <p>Detailed paragraph explaining this section. Make it engaging and informative. Explain the benefits and features in a way that resonates with your target audience.</p>
                <ul class="content-list">
                    <li><i class="fas fa-check"></i> Important point about your product</li>
                    <li><i class="fas fa-check"></i> Another key benefit to highlight</li>
                    <li><i class="fas fa-check"></i> A third reason why customers should care</li>
                </ul>
                <a href="#" class="content-button">Learn More</a>
            </div>
            <div class="content-image">
                <img src="images/content-image.jpg" alt="Content Image">
            </div>
        </div>
    </div>
</section>
`;
        
        case 'testimonials':
            return `
<section class="advanced-testimonials">
    <div class="container">
        <div class="section-header">
            <h2>What Our Customers Say</h2>
            <p>Real feedback from satisfied customers</p>
        </div>
        <div class="testimonial-carousel">
            <div class="testimonial-slide">
                <div class="testimonial-content">
                    <div class="testimonial-stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <p class="testimonial-text">"This product exceeded all my expectations. The quality is outstanding and the customer service was excellent!"</p>
                    <div class="testimonial-author">
                        <img src="images/avatar1.jpg" alt="Customer Avatar" class="author-avatar">
                        <div class="author-info">
                            <h4>Customer Name</h4>
                            <p>Verified Buyer</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="carousel-controls">
            <button class="prev-button"><i class="fas fa-chevron-left"></i></button>
            <button class="next-button"><i class="fas fa-chevron-right"></i></button>
        </div>
    </div>
</section>
`;
        
        case 'cta':
            return `
<section class="advanced-cta">
    <div class="container">
        <div class="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of satisfied customers today</p>
            <a href="#" class="cta-button">Shop Now</a>
        </div>
    </div>
</section>
`;
        
        case 'faq':
            return `
<section class="advanced-faq">
    <div class="container">
        <div class="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Find answers to common questions</p>
        </div>
        <div class="faq-accordion">
            <div class="faq-item">
                <div class="faq-question">
                    <h3>How long does shipping take?</h3>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer">
                    <p>We typically process orders within 1-2 business days. Shipping times vary depending on your location, but most customers receive their orders within 3-5 business days after processing.</p>
                </div>
            </div>
            <div class="faq-item">
                <div class="faq-question">
                    <h3>What is your return policy?</h3>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer">
                    <p>We offer a 30-day return policy on all unused items in their original packaging. Please contact our customer service team to initiate a return.</p>
                </div>
            </div>
        </div>
    </div>
</section>
`;
        
        default:
            return '';
    }
}

// Function to handle dynamic page content
function handleAdvancedPageContent() {
    // Initialize components on dynamically loaded pages
    initFaqAccordion();
    initTestimonialCarousel();
    
    // Add event listeners to interactive elements
    const buttons = document.querySelectorAll('.primary-button, .secondary-button, .content-button, .cta-button');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (button.getAttribute('href') === '#') {
                e.preventDefault();
                // You can add custom behavior here
            }
        });
    });
}

// Update the existing handlePageNavigation function to support advanced pages
const originalHandlePageNavigation = window.handlePageNavigation;
if (typeof originalHandlePageNavigation === 'function') {
    window.handlePageNavigation = function() {
        originalHandlePageNavigation();
        handleAdvancedPageContent();
    };
}
