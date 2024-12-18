var storedName = localStorage.getItem("user_name");

    
var profileName = document.getElementById("profileLink");
if (profileName && storedName) {
    profileName.textContent = storedName;
}


document.addEventListener('DOMContentLoaded', () => {
    var storedName = localStorage.getItem("user_name");
        var profileLink = document.getElementById("profileLink");
    
        if (profileLink) {
            if (storedName) {
                profileLink.textContent = storedName;
                profileLink.href = "profile.html";
            } else {
                profileLink.textContent = "Sign In";
                profileLink.href = "signin.html"; // Update with the actual sign-in page URL
            }
        }
    
    const cartContainer = document.querySelector('.cart-container');
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];

    function renderCart() {
        cartContainer.innerHTML = '';
        if (cart.length > 0) {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <div class="cart-image"><img src="${item.image}" alt="${item.name}"></div>
                    <div class="cart-details">
                        <h3>${item.name}</h3>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: 
                            <button class="decrement-btn" data-id="${item.id}">-</button>
                            ${item.quantity}
                            <button class="increment-btn" data-id="${item.id}">+</button>
                        </p>
                        <button class="remove-btn" data-id="${item.id}">Remove</button>
                    </div>
                `;
                cartContainer.appendChild(cartItem);
            });

            document.querySelectorAll('.remove-btn').forEach(button => {
                button.addEventListener('click', removeFromCart);
            });

            document.querySelectorAll('.increment-btn').forEach(button => {
                button.addEventListener('click', incrementQuantity);
            });

            document.querySelectorAll('.decrement-btn').forEach(button => {
                button.addEventListener('click', decrementQuantity);
            });
        } else {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        }
    }

    function removeFromCart(event) {
        const itemId = event.target.getAttribute('data-id');
        cart = cart.filter(item => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    function incrementQuantity(event) {
        const itemId = event.target.getAttribute('data-id');
        const item = cart.find(item => item.id === itemId);
        if (item) {
            item.quantity += 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    }

    function decrementQuantity(event) {
        const itemId = event.target.getAttribute('data-id');
        const item = cart.find(item => item.id === itemId);
        if (item && item.quantity > 1) {
            item.quantity -= 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    }

    function placeOrder() {
        if (cart.length > 0) {
            alert('Order placed successfully!');
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        } else {
            alert('Your cart is empty.');
        }
    }

    placeOrderBtn.addEventListener('click', placeOrder);

    renderCart();
});
