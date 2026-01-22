/**
 * ANIME CASE - CUSTOM PHONE CASES
 * Main JavaScript File
 * 
 * SHOPIFY MIGRATION NOTES:
 * - Cart functions will be replaced with Shopify Ajax Cart API
 * - File uploads will use line item properties or Shopify app
 * - Product variants will use Shopify variant selection API
 * - Form submissions will use Shopify's native form handlers
 * - Consider splitting into modules for better organization
 */

// ========================================
// GLOBAL STATE
// ========================================

const AppState = {
    cart: [],
    cartCount: 0,
    selectedVariant: null,
    uploadedFiles: {
        selfie: null,
        reference: null
    },
    quantity: 1
};

// ========================================
// DOM READY
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initHeroSlider();
    initScrollReveal();
    // initParallax(); // Disabled to prevent sections from sliding
    initTiltEffect();
    initFileUploads();
    initProductPage();
    initContactForm();
    initFAQ();
    initCart();
    initProductShowcase();
    
    // Load cart from localStorage (for standalone version)
    loadCartFromStorage();
});

// ========================================
// HERO SLIDER
// ========================================

function initHeroSlider() {
    const slider = document.querySelector('.hero-slider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.hero-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    let isTransitioning = false;
    let autoplayInterval;
    
    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    function showSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        
        // Update current slide
        currentSlide = (index + slides.length) % slides.length;
        
        // Add active class to new slide
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
        
        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Button controls
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Indicator controls
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            resetAutoplay();
        });
    });
    
    // Touch/Swipe support
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            resetAutoplay();
        }
    }
    
    // Autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
    }
    
    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoplay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoplay();
        }
    });
    
    // Pause autoplay on hover
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
    
    // Start autoplay
    startAutoplay();
}

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-scroll-reveal]');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: unobserve after reveal
                // revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

// ========================================
// PARALLAX SCROLL EFFECT
// ========================================

function initParallax() {
    const parallaxSections = document.querySelectorAll('[data-parallax]');
    
    if (parallaxSections.length === 0) return;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxSections.forEach(section => {
            const speed = 0.3;
            const yPos = -(scrolled * speed);
            const rect = section.getBoundingClientRect();
            
            // Only apply parallax when section is in viewport
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                section.style.transform = `translateY(${yPos}px)`;
            }
        });
    }
    
    // Throttled scroll event
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ========================================
// 3D TILT EFFECT ON CARDS
// ========================================

function initTiltEffect() {
    const tiltCards = document.querySelectorAll('[data-tilt]');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * 10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// ========================================
// NAVIGATION
// ========================================

function initNavigation() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                navLinks.classList.remove('active');
            }
        });
    }
}

// ========================================
// FILE UPLOAD HANDLING
// ========================================

function initFileUploads() {
    const selfieUpload = document.getElementById('selfieUpload');
    const referenceUpload = document.getElementById('referenceUpload');
    
    if (selfieUpload) {
        setupFileUpload(selfieUpload, 'selfie');
    }
    
    if (referenceUpload) {
        setupFileUpload(referenceUpload, 'reference');
    }
}

function setupFileUpload(uploadArea, type) {
    const input = uploadArea.querySelector('.file-input');
    const placeholder = uploadArea.querySelector('.upload-placeholder');
    const preview = uploadArea.querySelector('.file-preview');
    const previewImage = uploadArea.querySelector('.preview-image');
    const removeBtn = uploadArea.querySelector('.remove-file');
    
    if (!input) return;
    
    // Click to upload
    input.addEventListener('change', (e) => {
        handleFileSelect(e.target.files[0], type, placeholder, preview, previewImage);
    });
    
    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            input.files = e.dataTransfer.files;
            handleFileSelect(file, type, placeholder, preview, previewImage);
        }
    });
    
    // Remove file
    if (removeBtn) {
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeFile(type, input, placeholder, preview);
        });
    }
}

function handleFileSelect(file, type, placeholder, preview, previewImage) {
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showNotification('Please upload an image file (PNG, JPG)', 'error');
        return;
    }
    
    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
        showNotification('File size must be less than 10MB', 'error');
        return;
    }
    
    // Store file in state
    AppState.uploadedFiles[type] = file;
    
    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
        previewImage.src = e.target.result;
        placeholder.style.display = 'none';
        preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
    
    showNotification(`${type === 'selfie' ? 'Selfie' : 'Reference'} uploaded successfully`, 'success');
}

function removeFile(type, input, placeholder, preview) {
    AppState.uploadedFiles[type] = null;
    input.value = '';
    placeholder.style.display = 'flex';
    preview.style.display = 'none';
    
    showNotification('File removed', 'info');
}

// ========================================
// PRODUCT PAGE
// ========================================

function initProductPage() {
    const addToCartBtn = document.getElementById('addToCartBtn');
    const phoneModelSelect = document.getElementById('phoneModel');
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');
    
    // Phone model selection
    // SHOPIFY: This will be replaced with variant selection
    if (phoneModelSelect) {
        phoneModelSelect.addEventListener('change', (e) => {
            AppState.selectedVariant = e.target.value;
            updateAddToCartButton();
        });
    }
    
    // Quantity controls
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', () => {
            if (AppState.quantity > 1) {
                AppState.quantity--;
                quantityInput.value = AppState.quantity;
                updateAddToCartButton();
            }
        });
    }
    
    if (increaseBtn) {
        increaseBtn.addEventListener('click', () => {
            if (AppState.quantity < 10) {
                AppState.quantity++;
                quantityInput.value = AppState.quantity;
                updateAddToCartButton();
            }
        });
    }
    
    if (quantityInput) {
        quantityInput.addEventListener('change', (e) => {
            let value = parseInt(e.target.value);
            if (isNaN(value) || value < 1) value = 1;
            if (value > 10) value = 10;
            AppState.quantity = value;
            e.target.value = value;
            updateAddToCartButton();
        });
    }
    
    // Add to cart button
    /* SHOPIFY MIGRATION:
     * Replace this with Shopify Ajax Cart API
     * 
     * Example Shopify implementation:
     * 
     * fetch('/cart/add.js', {
     *   method: 'POST',
     *   headers: { 'Content-Type': 'application/json' },
     *   body: JSON.stringify({
     *     id: variantId,
     *     quantity: quantity,
     *     properties: {
     *       '_selfie_image': selfieImageUrl,
     *       '_reference_image': referenceImageUrl,
     *       '_order_notes': orderNotes
     *     }
     *   })
     * })
     * .then(response => response.json())
     * .then(data => {
     *   // Update cart UI
     *   updateCartCount();
     * });
     */
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', handleAddToCart);
    }
    
    // Product tabs
    initProductTabs();
}

function updateAddToCartButton() {
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (!addToCartBtn) return;
    
    const basePrice = 49.99;
    const totalPrice = (basePrice * AppState.quantity).toFixed(2);
    
    addToCartBtn.textContent = `Add to Cart - $${totalPrice}`;
}

function handleAddToCart() {
    const selfieInput = document.getElementById('selfieInput');
    const phoneModelSelect = document.getElementById('phoneModel');
    const orderNotes = document.getElementById('orderNotes');
    
    // Validation
    if (!AppState.uploadedFiles.selfie) {
        showNotification('Please upload your selfie image', 'error');
        selfieInput.focus();
        return;
    }
    
    if (!AppState.selectedVariant) {
        showNotification('Please select your phone model', 'error');
        phoneModelSelect.focus();
        return;
    }
    
    /* SHOPIFY MIGRATION:
     * In Shopify, you would:
     * 1. Upload images to a file storage service (or use a Shopify app)
     * 2. Get the URLs of uploaded images
     * 3. Add to cart with line item properties
     * 4. OR: Email customer instructions to send images after checkout
     * 5. OR: Use a Shopify app like "Product Customizer" or "Infinite Options"
     */
    
    // Mock cart item (standalone version)
    const cartItem = {
        id: Date.now(),
        name: 'Custom Anime-Style Phone Case',
        variant: AppState.selectedVariant,
        variantDisplay: phoneModelSelect.options[phoneModelSelect.selectedIndex].text,
        quantity: AppState.quantity,
        price: 49.99,
        selfieFile: AppState.uploadedFiles.selfie.name,
        referenceFile: AppState.uploadedFiles.reference?.name || null,
        notes: orderNotes?.value || ''
    };
    
    // Add to cart
    AppState.cart.push(cartItem);
    AppState.cartCount += AppState.quantity;
    
    // Save to localStorage (for standalone version)
    saveCartToStorage();
    
    // Update UI
    updateCartCount();
    
    // Show success message
    showNotification('Added to cart successfully! 🎉', 'success');
    
    // Show cart modal after brief delay
    setTimeout(() => {
        showCartModal();
    }, 500);
}

function initProductTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to selected
            button.classList.add('active');
            document.getElementById(targetTab)?.classList.add('active');
        });
    });
}

// ========================================
// CART MANAGEMENT
// ========================================

function initCart() {
    updateCartCount();
    
    const cartLink = document.querySelector('.cart-link');
    if (cartLink) {
        cartLink.addEventListener('click', (e) => {
            e.preventDefault();
            // SHOPIFY: This would link to {{ routes.cart_url }}
            showCartModal();
        });
    }
}

function showCartModal() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'cart-modal-overlay';
    modal.innerHTML = `
        <div class="cart-modal">
            <div class="cart-modal-header">
                <h2>Your Cart</h2>
                <button class="cart-modal-close" aria-label="Close cart">&times;</button>
            </div>
            <div class="cart-modal-body">
                ${AppState.cart.length === 0 ? 
                    '<div class="cart-empty"><p>Your cart is empty</p><a href="product.html" class="btn btn-primary">Shop Now</a></div>' :
                    `<div class="cart-items">
                        ${AppState.cart.map(item => `
                            <div class="cart-item">
                                <div class="cart-item-details">
                                    <h4>${item.name}</h4>
                                    <p class="cart-item-variant">${item.variantDisplay}</p>
                                    <p class="cart-item-files">
                                        <small>📸 ${item.selfieFile}</small>
                                        ${item.referenceFile ? `<small>🎨 ${item.referenceFile}</small>` : ''}
                                    </p>
                                    ${item.notes ? `<p class="cart-item-notes"><small>Note: ${item.notes}</small></p>` : ''}
                                </div>
                                <div class="cart-item-price">
                                    <p class="cart-item-quantity">Qty: ${item.quantity}</p>
                                    <p class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</p>
                                    <button class="cart-item-remove" data-id="${item.id}">Remove</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="cart-summary">
                        <div class="cart-total">
                            <span>Total:</span>
                            <span class="cart-total-price">$${calculateCartTotal()}</span>
                        </div>
                        <div class="cart-actions">
                            <button class="btn btn-secondary btn-full cart-continue">Continue Shopping</button>
                            <button class="btn btn-primary btn-full cart-checkout">Proceed to Checkout</button>
                        </div>
                        <p class="cart-note">Note: In Shopify, checkout will process your order and payment.</p>
                    </div>`
                }
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Add modal styles
    addCartModalStyles();
    
    // Close modal handlers
    const closeBtn = modal.querySelector('.cart-modal-close');
    const continueBtn = modal.querySelector('.cart-continue');
    
    const closeModal = () => {
        modal.remove();
        document.body.style.overflow = '';
    };
    
    closeBtn?.addEventListener('click', closeModal);
    continueBtn?.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Remove item handlers
    const removeButtons = modal.querySelectorAll('.cart-item-remove');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.dataset.id);
            removeFromCart(itemId);
            modal.remove();
            document.body.style.overflow = '';
            showCartModal(); // Refresh modal
        });
    });
    
    // Checkout handler
    const checkoutBtn = modal.querySelector('.cart-checkout');
    checkoutBtn?.addEventListener('click', () => {
        closeModal();
        showNotification('Redirecting to checkout... (Shopify integration required)', 'info');
        // SHOPIFY: window.location.href = '/checkout';
    });
}

function calculateCartTotal() {
    return AppState.cart.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0).toFixed(2);
}

function removeFromCart(itemId) {
    const itemIndex = AppState.cart.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
        const item = AppState.cart[itemIndex];
        AppState.cartCount -= item.quantity;
        AppState.cart.splice(itemIndex, 1);
        saveCartToStorage();
        updateCartCount();
        showNotification('Item removed from cart', 'info');
    }
}

function addCartModalStyles() {
    if (document.getElementById('cart-modal-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'cart-modal-styles';
    style.textContent = `
        .cart-modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(4px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            animation: fadeIn 0.2s ease-out;
        }
        
        .cart-modal {
            background: var(--color-bg-dark);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-xl);
            max-width: 600px;
            width: 100%;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            box-shadow: var(--shadow-xl);
            animation: slideUp 0.3s ease-out;
        }
        
        @keyframes slideUp {
            from {
                transform: translateY(50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        .cart-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid var(--color-border);
        }
        
        .cart-modal-header h2 {
            font-size: var(--font-2xl);
            margin: 0;
        }
        
        .cart-modal-close {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: transparent;
            border: 1px solid var(--color-border);
            color: var(--color-text-primary);
            font-size: var(--font-3xl);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: var(--transition-fast);
        }
        
        .cart-modal-close:hover {
            background: var(--color-bg-light);
            border-color: var(--color-primary);
        }
        
        .cart-modal-body {
            overflow-y: auto;
            padding: 1.5rem;
            flex: 1;
        }
        
        .cart-empty {
            text-align: center;
            padding: 3rem 1rem;
        }
        
        .cart-empty p {
            font-size: var(--font-xl);
            color: var(--color-text-secondary);
            margin-bottom: 2rem;
        }
        
        .cart-items {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        
        .cart-item {
            display: flex;
            gap: 1rem;
            padding: 1rem;
            background: var(--color-bg-card);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-lg);
        }
        
        .cart-item-details {
            flex: 1;
        }
        
        .cart-item-details h4 {
            font-size: var(--font-lg);
            margin-bottom: 0.25rem;
        }
        
        .cart-item-variant {
            color: var(--color-text-secondary);
            font-size: var(--font-sm);
            margin-bottom: 0.5rem;
        }
        
        .cart-item-files {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            margin-bottom: 0.5rem;
        }
        
        .cart-item-files small {
            color: var(--color-text-muted);
            font-size: var(--font-xs);
        }
        
        .cart-item-notes small {
            color: var(--color-text-muted);
            font-size: var(--font-xs);
            font-style: italic;
        }
        
        .cart-item-price {
            text-align: right;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-end;
        }
        
        .cart-item-quantity {
            color: var(--color-text-secondary);
            font-size: var(--font-sm);
        }
        
        .cart-item-total {
            font-size: var(--font-xl);
            font-weight: 700;
            color: var(--color-secondary);
        }
        
        .cart-item-remove {
            padding: 0.25rem 0.75rem;
            background: transparent;
            border: 1px solid var(--color-error);
            color: var(--color-error);
            border-radius: var(--radius-sm);
            font-size: var(--font-xs);
            cursor: pointer;
            transition: var(--transition-fast);
        }
        
        .cart-item-remove:hover {
            background: var(--color-error);
            color: white;
        }
        
        .cart-summary {
            border-top: 2px solid var(--color-border);
            padding-top: 1rem;
        }
        
        .cart-total {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            font-size: var(--font-xl);
            font-weight: 700;
        }
        
        .cart-total-price {
            color: var(--color-secondary);
            font-size: var(--font-2xl);
        }
        
        .cart-actions {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }
        
        .cart-note {
            margin-top: 1rem;
            text-align: center;
            font-size: var(--font-xs);
            color: var(--color-text-muted);
        }
        
        @media (max-width: 640px) {
            .cart-modal {
                max-height: 95vh;
            }
            
            .cart-item {
                flex-direction: column;
            }
            
            .cart-item-price {
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            }
        }
    `;
    document.head.appendChild(style);
}

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => {
        el.textContent = AppState.cartCount;
        
        // Show/hide badge
        if (AppState.cartCount > 0) {
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    });
}

function saveCartToStorage() {
    try {
        localStorage.setItem('animecase_cart', JSON.stringify(AppState.cart));
        localStorage.setItem('animecase_cart_count', AppState.cartCount);
    } catch (e) {
        console.error('Failed to save cart to localStorage:', e);
    }
}

function loadCartFromStorage() {
    try {
        const savedCart = localStorage.getItem('animecase_cart');
        const savedCount = localStorage.getItem('animecase_cart_count');
        
        if (savedCart) {
            AppState.cart = JSON.parse(savedCart);
        }
        
        if (savedCount) {
            AppState.cartCount = parseInt(savedCount);
            updateCartCount();
        }
    } catch (e) {
        console.error('Failed to load cart from localStorage:', e);
    }
}

// ========================================
// CONTACT FORM
// ========================================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    /* SHOPIFY MIGRATION:
     * Replace this with Shopify's native contact form
     * 
     * {% form 'contact' %}
     *   {% if form.posted_successfully? %}
     *     <p class="form-message success">Thanks for contacting us!</p>
     *   {% endif %}
     *   {% if form.errors %}
     *     <p class="form-message error">{{ form.errors | default_errors }}</p>
     *   {% endif %}
     *   
     *   <input type="text" name="contact[name]" value="{{ form.name }}">
     *   <input type="email" name="contact[email]" value="{{ form.email }}">
     *   <textarea name="contact[body]">{{ form.body }}</textarea>
     *   <button type="submit">Send</button>
     * {% endform %}
     */
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value,
            orderNumber: document.getElementById('orderNumber')?.value.trim() || '',
            message: document.getElementById('message').value.trim(),
            newsletter: document.getElementById('newsletter')?.checked || false
        };
        
        // Validation
        const errors = validateContactForm(formData);
        
        if (errors.length > 0) {
            displayFormErrors(errors);
            return;
        }
        
        // Clear previous errors
        clearFormErrors();
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (standalone version)
        // SHOPIFY: This would actually submit to Shopify's contact endpoint
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        showFormMessage('Thank you for contacting us! We\'ll get back to you within 24 hours.', 'success');
        
        // Reset form
        contactForm.reset();
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        
        // Log to console (for demo)
        console.log('Contact form submission:', formData);
    });
}

function validateContactForm(data) {
    const errors = [];
    
    if (!data.name || data.name.length < 2) {
        errors.push({ field: 'name', message: 'Please enter your name' });
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push({ field: 'email', message: 'Please enter a valid email address' });
    }
    
    if (!data.subject) {
        errors.push({ field: 'subject', message: 'Please select a subject' });
    }
    
    if (!data.message || data.message.length < 10) {
        errors.push({ field: 'message', message: 'Please enter a message (at least 10 characters)' });
    }
    
    return errors;
}

function displayFormErrors(errors) {
    errors.forEach(error => {
        const field = document.getElementById(error.field);
        const formGroup = field?.closest('.form-group');
        const errorSpan = formGroup?.querySelector('.form-error');
        
        if (formGroup && errorSpan) {
            formGroup.classList.add('error');
            errorSpan.textContent = error.message;
        }
    });
}

function clearFormErrors() {
    const formGroups = document.querySelectorAll('.form-group.error');
    formGroups.forEach(group => {
        group.classList.remove('error');
        const errorSpan = group.querySelector('.form-error');
        if (errorSpan) errorSpan.textContent = '';
    });
}

function showFormMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = `form-message ${type}`;
        messageDiv.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ========================================
// FAQ ACCORDION
// ========================================

function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            const answer = question.nextElementSibling;
            
            // Toggle current item
            question.setAttribute('aria-expanded', !isExpanded);
            answer?.classList.toggle('active');
            
            // Smooth scroll to question if opening
            if (!isExpanded) {
                setTimeout(() => {
                    question.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 300);
            }
        });
    });
}

// ========================================
// NOTIFICATIONS
// ========================================

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 10000;
        background: ${type === 'success' ? 'var(--color-success)' : 
                     type === 'error' ? 'var(--color-error)' : 
                     type === 'warning' ? 'var(--color-warning)' : 
                     'var(--color-info)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-xl);
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
        font-weight: 600;
    `;
    notification.textContent = message;
    
    // Add animation styles if not exists
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// PRODUCT SHOWCASE (HOMEPAGE)
// ========================================

function initProductShowcase() {
    const showcaseCards = document.querySelectorAll('.product-showcase-card');
    
    showcaseCards.forEach(card => {
        // Add to cart button
        const addToCartBtn = card.querySelector('.btn-add-cart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const productName = card.querySelector('.product-showcase-title').textContent;
                const priceText = card.querySelector('.product-showcase-price .current').textContent;
                const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
                
                // Add to cart with default variant
                // SHOPIFY: Will use Shopify's Ajax Cart API with product variant ID
                const cartItem = {
                    id: Date.now(),
                    name: productName,
                    price: price,
                    quantity: 1,
                    variantDisplay: 'Default Design',
                    selfieFile: 'Not provided',
                    referenceFile: null,
                    notes: 'Quick add from homepage'
                };
                
                AppState.cart.push(cartItem);
                AppState.cartCount += 1;
                updateCartCount();
                saveCartToStorage();
                
                // Visual feedback
                const originalText = addToCartBtn.innerHTML;
                addToCartBtn.innerHTML = '<svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg> Added!';
                addToCartBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                setTimeout(() => {
                    addToCartBtn.innerHTML = originalText;
                    addToCartBtn.style.background = '';
                }, 2000);
                
                // Show cart modal after short delay
                setTimeout(() => {
                    showCartModal();
                }, 1500);
            });
        }
        
        // "More like this" link
        const moreLink = card.querySelector('.product-more');
        if (moreLink) {
            moreLink.addEventListener('click', (e) => {
                e.preventDefault();
                // SHOPIFY: Will link to collection with filters
                window.location.href = 'product.html';
            });
        }
    });
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (anchor && anchor.getAttribute('href') !== '#') {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// ========================================
// LAZY LOADING IMAGES (if needed)
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%c🎨 Anime Case - Custom Phone Cases', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cTransform your photos into stunning anime art!', 'font-size: 14px; color: #06b6d4;');
console.log('%c\nSHOPIFY MIGRATION: This is a standalone frontend. Check code comments for Shopify integration notes.', 'font-size: 12px; color: #a855f7;');
