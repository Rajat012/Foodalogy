function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product col-3 col-md-5">
            <i class="fa fa-trash-o" aria-hidden="true" onclick="remove('${item.dish}');"></i>
            <img src=${item.image} class="d-none d-md-block" height="40px" width="40px" alt="">
            <span>&#160; ${item.dish}</span>
            </div>
            <div class="price col-3 col-md-2">₹${item.value}.00</div>
            <div class="quantity col-3 col-md-3">
            <i class="fa fa-caret-left" aria-hidden="true" onclick="decrement(event,'${item.dish}');"></i>
            <span>${item.quantity}</span>
            <i class="fa fa-caret-right" aria-hidden="true" onclick="increment(event,'${item.dish}');"></i>
            </div>
            <div class="total col-3 col-md-2">
            ₹<span>${item.quantity * item.value}</span>.00
            </div>
        `;
        });

        productContainer.innerHTML += `
        <div class = "basketTotalContainer">
        <button class="checkout btn btn-success" onclick="proceedForPayment()">
        <h6>
        Checkout &nbsp; ₹<span>${cartCost}</span>.00 <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
        </h6>
        </button>
        </div>
        `;
    }
}

function remove(key) {
    let cartItem = localStorage.getItem('productsInCart');
    cartItem = JSON.parse(cartItem);
    var newTotal = localStorage.getItem('totalCost') - (cartItem[key].quantity * cartItem[key].value);
    var newQuantity = localStorage.getItem('cartNumber') - cartItem[key].quantity;
    delete cartItem[key];
    cartItem = JSON.stringify(cartItem);
    localStorage.setItem('productsInCart', cartItem);
    localStorage.setItem('totalCost', newTotal);
    localStorage.setItem('cartNumber', newQuantity);
    location.reload();
}

function increment(datap, key) {
    let cartItem = localStorage.getItem('productsInCart');
    cartItem = JSON.parse(cartItem);
    cartItem[key].quantity = cartItem[key].quantity + 1;
    var newTotal = parseInt(localStorage.getItem('totalCost')) + parseInt(cartItem[key].value);
    var newQuantity = parseInt(localStorage.getItem('cartNumber')) + 1;
    datap.path[1].children[1].textContent = cartItem[key].quantity;
    datap.path[1].nextSibling.nextSibling.children[0].textContent = cartItem[key].quantity * cartItem[key].value;
    document.querySelector('.checkout h6 span').textContent = newTotal;
    cartItem = JSON.stringify(cartItem);
    localStorage.setItem('productsInCart', cartItem);
    localStorage.setItem('totalCost', newTotal);
    localStorage.setItem('cartNumber', newQuantity);
}

function decrement(datap, key) {
    let cartItem = localStorage.getItem('productsInCart');
    cartItem = JSON.parse(cartItem);
    if (cartItem[key].quantity > 1) {
        cartItem[key].quantity = cartItem[key].quantity - 1;
        var newTotal = parseInt(localStorage.getItem('totalCost')) - parseInt(cartItem[key].value);
        var newQuantity = parseInt(localStorage.getItem('cartNumber')) - 1;
        datap.path[1].children[1].textContent = cartItem[key].quantity;
        datap.path[1].nextSibling.nextSibling.children[0].textContent = cartItem[key].quantity * cartItem[key].value;
        document.querySelector('.checkout h6 span').textContent = newTotal;
        cartItem = JSON.stringify(cartItem);
        localStorage.setItem('productsInCart', cartItem);
        localStorage.setItem('totalCost', newTotal);
        localStorage.setItem('cartNumber', newQuantity);
    } else {
        remove(key);
    }

}

function proceedForPayment() {
    let user = curUser;
    if (user) {
        const amt = localStorage.getItem('totalCost');
        let items = localStorage.getItem('productsInCart');
        var message = '';
        JSON.parse(items).forEach(item => {
           message += `
           <table>
            <th>
            <tr>${item.dish}</span>
            </div>
            <div class="price col-3 col-md-2">₹${item.value}.00</div>
            <div class="quantity col-3 col-md-3">
            <span>${item.quantity}</span>
            </div>
            <div class="total col-3 col-md-2">
            ₹<span>${item.quantity * item.value}</span>.00
            </div>
            </div>
            <br>
        `
        });
        console.log(message);
        if (parseInt(amt)) {

            successNotification({ message: "Ordered Placed Successfully!" });
        } else {
            errorNotification({
                message: "Empty Cart!",
            });
        }
    } else {
        warningNotification({
            message: 'Please Login to Continue!!',
        });
    }

}

displayCart();