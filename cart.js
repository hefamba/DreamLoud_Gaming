let carts = document.querySelectorAll('.shop-items');

let products = [
    {
        name: 'Advance Hoodie blue',
        tag: 'hoodie_blue',
        price: 74.99,
        inCart: 0

    },
    {
        name: 'Advance Hoodie grey',
        tag: 'hoodie_grey',
        price: 74.99,
        inCart: 0

    },
    {
        name: 'Advance Hoodie maroon',
        tag: 'hoodie_maroon',
        price: 74.99,
        inCart: 0

    },
    {
        name: 'Advance Hoodie red',
        tag: 'hoodie_red',
        price: 74.99,
        inCart: 0

    },
    {
        name: 'Classic Logo Tee skyblue',
        tag: 'tee_blue',
        price: 54.99,
        inCart: 0

    },
    {
        name: 'Classic Logo Tee darkgrey',
        tag: 'tee_darkGrey',
        price: 54.99,
        inCart: 0

    },
    {
        name: 'Classic Logo Tee green',
        tag: 'tee_green',
        price: 54.99,
        inCart: 0

    },
    {
        name: 'Classic Logo Tee pink',
        tag: 'tee_pink',
        price: 54.99,
        inCart: 0

    },
    {
        name: 'Classic Logo Tee purple',
        tag: 'tee_purple',
        price: 54.99,
        inCart: 0

    },
    {
        name: 'Classic Logo Tee red',
        tag: 'tee_red',
        price: 54.99,
        inCart: 0

    },
    {
        name: 'Classic Logo Tee white',
        tag: 'tee_white',
        price: 54.99,
        inCart: 0

    },
    {
        name: 'Classic Logo Tee yellow',
        tag: 'tee_yellow',
        price: 54.99,
        inCart: 0

    }
];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);

    });
}

function onLoadCartNumbers() {
    let productNumber = localStorage.getItem('cartNumbers');

    if (productNumber) {
        document.querySelector('.cart span').textContent = productNumber;
    }
}

function cartNumbers(products) {

    let productNumber = localStorage.getItem('cartNumbers');


    productNumber = parseInt(productNumber);
    if (productNumber) {
        localStorage.setItem('cartNumbers', productNumber + 1);
        document.querySelector('.cart span').textContent = productNumber + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(products);
}

function setItems(products) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
        if (cartItems[products.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [products.tag]: products
            };
        }
        cartItems[products.tag].inCart += 1;
    }
    else {
        products.inCart = 1;
        cartItems = {
            [products.tag]: products
        };
    }
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(products) {
    // console.log('the product price is', products.price);
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartCost, 'my cart cost');

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + products.price);
    } else {
        localStorage.setItem('totalCost', products.price);
    }

}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.products');
    let cartCost = localStorage.getItem('totalCost');
    if (cartItems && productContainer) {
        console.log('running');
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <a class="nav-link fa fa-trash fa-2x text-primary" aria-hidden="true" href=""></a>
                <img src="pics/${item.tag}.jpg" class="card-img-top" alt="...">
                <span>${item.name}</span>
            </div>
            <div class="price-single">
                ${item.price}
            </div>
            <div class="quantity-single">
                <a class="nav-link fa fa-arrow-circle-left fa-2x text-primary" aria-hidden="true" href=""></a>
                <span>${item.inCart}</span>
                <a class="nav-link fa fa-arrow-circle-right fa-2x text-primary" aria-hidden="true" href=""></a>
            </div>
            <div class="total-single">
                ${item.inCart * item.price}
            </div>
            `;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    ${cartCost}
                </h4>   
            </div>
        `;
    }
}

onLoadCartNumbers();
displayCart();