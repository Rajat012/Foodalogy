function addTocart(datax) {
    var img = datax.path[3].children[0].style.backgroundImage.toString().split('(');
    var img_url = img[1].split(')')[0];
    var item = datax.path[2].children[0].children[0].innerHTML;
    var price = datax.path[2].children[0].children[1].children[0].innerHTML;
    var list = { image: img_url, dish: item, value: price, quantity: 0 };
    cartNumber(list);
    totalCost(list)
}

function onLoadCartNumber() {
    let productNumber = localStorage.getItem('cartNumber');
    if (productNumber) {
        document.getElementById('lblCartCount').textContent = productNumber;
    } else {
        console.log("Empty cart!")
    }
}

function cartNumber(data) {
    let productNumber = localStorage.getItem('cartNumber');
    productNumber = parseInt(productNumber);
    if (productNumber) {
        localStorage.setItem('cartNumber', productNumber + 1);
        document.getElementById('lblCartCount').textContent = productNumber + 1;
    } else {
        localStorage.setItem('cartNumber', 1);
        document.getElementById('lblCartCount').textContent = 1;
    }

    setItems(data);
}

function setItems(data) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
        if (cartItems[data.dish] == undefined) {
            cartItems = {
                ...cartItems,
                [data.dish]: data
            }
        }
        cartItems[data.dish].quantity += 1;
    } else {
        data.quantity = 1;
        cartItems = {
            [data.dish]: data
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(item) {
    let cartCost = localStorage.getItem('totalCost');
    if (cartCost != null) {
        localStorage.setItem('totalCost', parseInt(cartCost) + parseInt(item.value))
    } else {
        localStorage.setItem("totalCost", item.value);
    }

}

onLoadCartNumber();