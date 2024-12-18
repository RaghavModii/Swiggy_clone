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
    
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
        addToCartButtons.forEach(button => {
            button.addEventListener('click', addToCart);
        });
    
        function addToCart(event) {
            event.preventDefault();
            const itemBox = event.target.closest('.box');
            const itemId = itemBox.getAttribute('data-id');
            const itemName = itemBox.querySelector('h3').innerText;
            const itemPrice = itemBox.querySelector('.price').innerText;
            const itemImage = itemBox.querySelector('img').src;
    
            const cartItem = {
                id: itemId,
                name: itemName,
                price: itemPrice,
                image: itemImage,
                quantity: 1
            };
    
            let cart = localStorage.getItem('cart');
            cart = cart ? JSON.parse(cart) : [];
    
            const existingItem = cart.find(item => item.id === itemId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push(cartItem);
            }
    
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${itemName} has been added to your cart.`);
        }
    });