
    let openShopping = document.querySelector('.shopping');
    let closeShopping = document.querySelector('.closeShopping');
    let list = document.querySelector('.list');
    let listCard = document.querySelector('.listCard');
    let body = document.querySelector('body');
    let total = document.querySelector('.total');
    let quantity = document.querySelector('.quantity');

 openShopping.addEventListener('click', () => {
        body.classList.add('active');
    });

    closeShopping.addEventListener('click', () => {
        body.classList.remove('active');
    });
var addToCartButtons = document.querySelectorAll('.add-to-cart');
let cartItems = [];

    function updateCart() {
        var cartList = document.querySelector('.listCard');
        var totalElement = document.querySelector('.total');
        var quantityElement = document.querySelector('.quantity');
        cartList.innerHTML = '';

        var total = 0;

        cartItems.forEach(function (item, index) {
            var listItem = document.createElement('li');
listItem.innerHTML = `
    <div class="cart-item">
        <div class="item-details">
            <!-- Assuming you have an 'image' property for each product -->
            <img class="cart-item img" src="${item.image}" alt="${item.name}">
            <span class="product-name">${item.name}</span>
            <span class="product-price">Total price : ${item.price}TK</span>
        </div>
        <div class="item-quantity">
            <select class="quantity-selector" data-index="${index}">
                ${generateQuantityOptions(item.quantity)}
            </select>
        </div>
    </div>
`;
            cartList.appendChild(listItem);
            total += item.price * item.quantity;
        });

        totalElement.textContent = 'Total Price: TK' + total; // Update total content
        quantityElement.textContent = cartItems.length;

        var quantitySelectors = document.querySelectorAll('.quantity-selector');

        quantitySelectors.forEach(function (selector) {
            selector.addEventListener('change', function () {
                var index = parseInt(this.dataset.index);
                var newQuantity = parseInt(this.value);
                cartItems[index].quantity = newQuantity;
                updateCart();
            });
        });
    }

function generateQuantityOptions(selectedQuantity) {
    let options = '';
    for (let i = 1; i <= 10; i++) {
        if (i === selectedQuantity) {
            options += `<option value="${i}" selected>${i}</option>`;
        } else {
            options += `<option value="${i}">${i}</option>`;
        }
    }
    return options;
}

var quantityButtons = document.querySelectorAll('.increment-quantity, .decrement-quantity');

quantityButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        var index = parseInt(this.dataset.index);
        var quantityElement = this.parentNode.querySelector('.product-quantity');
        var currentQuantity = parseInt(quantityElement.textContent);

        if (this.classList.contains('increment-quantity')) {
            quantityElement.textContent = currentQuantity + 1;
            cartItems[index].quantity++;
        } else if (this.classList.contains('decrement-quantity') && currentQuantity > 1) {
            quantityElement.textContent = currentQuantity - 1;
            cartItems[index].quantity--;
        }

        updateCart();
    });
});


addToCartButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        var productName = this.parentNode.parentNode.querySelector('h5 a').textContent;

        // Adjusted the productPrice extraction
        var productPriceElement = this.parentNode.parentNode.querySelector('span');
        var productPriceText = productPriceElement.textContent.trim();
        var productPrice = parseFloat(productPriceText.replace(/[^\d.]/g, '')); // Remove non-numeric characters

        var productImage = this.parentNode.parentNode.querySelector('img').getAttribute('src');

        var existingProductIndex = cartItems.findIndex(item => item.name === productName);

        if (existingProductIndex > -1) {
            alert('This product is already in the cart.');
        } else {
            cartItems.push({ name: productName, price: productPrice, quantity: 1, image: productImage });
            updateCart();
        }
    });
});
var reservationForm = document.getElementById('contact');

reservationForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Calculate total order amount
    var totalOrderAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    // Add the total order amount to the email confirmation
    var emailConfirmation = `
        <p>Hello {{to_name}},</p>
        <p>You got a new reservation request with the following details:</p>
        <!-- Add other reservation details here -->
        <p>Total Order Amount: $${totalOrderAmount}</p>
        <p>Best wishes,<br>EmailJS team</p>
    `;

    // Assuming you have an element to display the email confirmation
    var emailConfirmationElement = document.getElementById('emailConfirmation');
    emailConfirmationElement.innerHTML = emailConfirmation;
});


var closeShoppingButton = document.querySelector('.closeShopping');
closeShoppingButton.addEventListener('click', function() {
    var cardElement = document.querySelector('.card');
    cardElement.style.display = 'none';
});
