// Productos con categorías
const products = [
    { id: 1, name: "Drum Kit Vol.1", price: 10, image: "assets/sample1.png", category: "Drums" },
    { id: 2, name: "808 Bass Pack", price: 15, image: "assets/sample1.png", category: "Bass" },
    { id: 3, name: "Trap Melody Loops", price: 20, image: "assets/sample1.png", category: "Melodies" },
    { id: 4, name: "Lo-fi Chill Pack", price: 12, image: "assets/sample2.png", category: "Lo-fi" },
    { id: 5, name: "Jazz Drums", price: 18, image: "assets/sample2.png", category: "Drums" },
    { id: 6, name: "Vintage Bass Pack", price: 22, image: "assets/sample2.png", category: "Bass" },
    { id: 7, name: "Cinematic Melodies", price: 25, image: "assets/sample1.png", category: "Melodies" },
    { id: 8, name: "Lo-fi Sleep Kit", price: 14, image: "assets/sample2.png", category: "Lo-fi" },

    { id: 9, name: "Hard Hitting Drums", price: 13, image: "assets/sample3.png", category: "Drums" },
    { id: 10, name: "Acoustic Drum Breaks", price: 16, image: "assets/sample4.png", category: "Drums" },
    
    { id: 11, name: "Deep Sub Bass", price: 17, image: "assets/sample3.png", category: "Bass" },
    { id: 12, name: "Funky Basslines", price: 19, image: "assets/sample4.png", category: "Bass" },

    { id: 13, name: "Sad Piano Loops", price: 21, image: "assets/sample3.png", category: "Melodies" },
    { id: 14, name: "Epic String Melodies", price: 24, image: "assets/sample4.png", category: "Melodies" },

    { id: 15, name: "Lo-fi Vintage Tapes", price: 11, image: "assets/sample3.png", category: "Lo-fi" },
    { id: 16, name: "Dreamy Lo-fi Textures", price: 13, image: "assets/sample4.png", category: "Lo-fi" },
];

// Carrito
let cart = [];

// Funciones de renderizado
function renderAllProducts() {
    const productList = document.getElementById('product-list');
    if (!productList) return;
    products.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('col-md-3', 'mb-4');
        div.innerHTML = `
            <div class="card h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.name}" onclick="window.location.href='product.html?id=${product.id}'" style="cursor:pointer;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">$${product.price}</p>
                    <button class="btn btn-primary mt-auto" onclick="addToCart(${product.id}); event.stopPropagation();">
                        <i class="fa-solid fa-cart-plus"></i> Añadir
                    </button>
                </div>
            </div>
        `;
                
        productList.appendChild(div);
    });
}

function renderProductsByCategory() {
    const categoriesContainer = document.getElementById('categories');
    const homeProducts = document.getElementById('home-products');
    if (!categoriesContainer || !homeProducts) return;

    const categories = [...new Set(products.map(p => p.category))];

    categories.forEach(category => {
        // Tarjeta de Categoría
        const categoryCard = document.createElement('div');
        categoryCard.classList.add('col-md-3', 'mb-4');
        categoryCard.innerHTML = `
            <div class="card h-100 text-center">
                <div class="card-body">
                    <i class="fa-solid fa-music fa-2x mb-2"></i>
                    <h5 class="card-title">${category}</h5>
                    <a href="#${category}" class="btn btn-primary mt-3">Ver más</a>
                </div>
            </div>
        `;
        categoriesContainer.appendChild(categoryCard);

        // Productos por categoría
        const categorySection = document.createElement('section');
        categorySection.classList.add('my-5');
        categorySection.innerHTML = `<h3 id="${category}">${category}</h3><div class="row"></div>`;
        
        const row = categorySection.querySelector('.row');
        const filteredProducts = products.filter(p => p.category === category);

        filteredProducts.forEach(product => {
            const div = document.createElement('div');
            div.classList.add('col-md-3', 'mb-4');
            div.innerHTML = `
                <div class="card h-100">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}" onclick="window.location.href='product.html?id=${product.id}'" style="cursor:pointer;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">$${product.price}</p>
                        <button class="btn btn-primary mt-auto" onclick="addToCart(${product.id}); event.stopPropagation();">
                            <i class="fa-solid fa-cart-plus"></i> Añadir
                        </button>
                    </div>
                </div>
            `;
            row.appendChild(div);
        });

        homeProducts.appendChild(categorySection);
    });
}

// Carrito
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    if (!cartItems) return;

    cartItems.innerHTML = '';

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const div = document.createElement('div');
        div.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-3');
        div.innerHTML = `
            <div>
                <h6>${item.name}</h6>
                <small>$${item.price}</small>
            </div>
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(div);
    });

    cartCount.innerText = cart.length;
    cartTotal.innerText = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

document.getElementById('cart-btn').addEventListener('click', function () {
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
});

// Inicializar
if (document.getElementById('product-list')) renderAllProducts();
if (document.getElementById('categories')) renderProductsByCategory();
