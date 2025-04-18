document.addEventListener('DOMContentLoaded', function() {
    // Product data
    const products = [
        { id: 1, name: "Vanilla Dream", description: "Classic vanilla bean with Madagascar vanilla extract", price: 4.99, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
        { id: 2, name: "Chocolate Heaven", description: "Rich Belgian chocolate with cocoa nibs", price: 5.49, image: "https://images.unsplash.com/photo-1516559828984-fb3b99548b21?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
        { id: 3, name: "Strawberry Bliss", description: "Fresh strawberries with a hint of lemon", price: 5.29, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
        { id: 4, name: "Mint Chocolate Chip", description: "Cool mint with dark chocolate chunks", price: 5.49, image: "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
        { id: 5, name: "Cookies & Cream", description: "Vanilla ice cream with Oreo cookie pieces", price: 5.29, image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
        { id: 6, name: "Rocky Road", description: "Chocolate ice cream with marshmallows and nuts", price: 5.99, image: "https://images.unsplash.com/photo-1530089711124-9ca31fb9f5d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" }
    ];

    // Shopping cart
    let cart = [];

    // DOM elements
    const productGrid = document.getElementById('product-grid');
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const closeCart = document.querySelector('.close-cart');
    const cartCount = document.querySelector('.cart-count');

    // Display products
    function displayProducts() {
        productGrid.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image" style="background-image: url('${product.image}')"></div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            productGrid.appendChild(productCard);
        });

        // Add event listeners to "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    // Add to cart function
    function addToCart(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);
        
        // Check if product is already in cart
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCart();

        // Prepare message for WhatsApp
        const message = `
            أنا مهتم بالمنتج التالي:
            اسم المنتج: ${product.name}
            الوصف: ${product.description}
            الثمن: $${product.price.toFixed(2)}
            عدد القطع: 1
        `;
        
        // WhatsApp link
        const phoneNumber = "0669973483"; // Replace with your phone number
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        // Open WhatsApp with message
        window.open(whatsappLink, "_blank");

        showCartNotification();
    }

    // Update cart UI
    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
                <div class="remove-item" data-id="${item.id}">&times;</div>
            `;
            cartItems.appendChild(cartItem);
            
            total += item.price * item.quantity;
        });
        
        cartTotal.textContent = `$${total.toFixed(2)}`;
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    // Show cart notification
    function showCartNotification() {
        cartIcon.classList.add('shake');
        setTimeout(() => {
            cartIcon.classList.remove('shake');
        }, 500);
    }

    // Cart modal toggle
    cartIcon.addEventListener('click', function() {
        cartModal.style.display = 'flex';
    });

    closeCart.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Initialize the page
    displayProducts();
});
