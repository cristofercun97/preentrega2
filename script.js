class Producto {
    constructor(id, nombre, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}

class Carrito {
    constructor() {
        this.items = [];
    }

    agregarItem(producto) {
        if (producto.stock > 0) {
            this.items.push(producto);
            producto.stock--;
        } else {
            alert('¡Producto sin stock disponible!');
        }
        mostrarCarrito(this);
        mostrarProductos(productos, this);
    }

    calcularTotal() {
        return this.items.reduce((total, item) => total + item.precio, 0);
    }

    vaciarCarrito() {
        this.items.forEach(item => {
            const productoOriginal = productos.find(p => p.id === item.id);
            if (productoOriginal) {
                productoOriginal.stock++;
            }
        });

        this.items = [];
        mostrarCarrito(this);
        mostrarProductos(productos, this);
    }
}

function mostrarProductos(productos, carrito) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    productos.forEach(producto => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="./images/articulo${producto.id}.png" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <p>Stock: ${producto.stock} unidades</p>
            <button class="add-to-cart-btn" data-product-id="${producto.id}">Agregar al Carrito</button>
        `;
        productsContainer.appendChild(productElement);
    });

    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-product-id'));
            carrito.agregarItem(productos.find(p => p.id === productId));
        });
    });
}

function mostrarCarrito(carrito) {
    const cartContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    cartContainer.innerHTML = '';

    carrito.items.forEach(item => {
        const cartItemElement = document.createElement('li');
        cartItemElement.className = 'cart-item';
        cartItemElement.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;
        cartContainer.appendChild(cartItemElement);
    });

    cartTotalElement.textContent = `$${carrito.calcularTotal().toFixed(2)}`;
}

function procesarPago(carrito) {
    if (carrito.items.length === 0) {
        alert('El carrito está vacío. Agrega productos antes de proceder al pago.');
    } else {
        alert('Compra realizada con éxito. Gracias por tu compra!');
        carrito.vaciarCarrito();
    }
}

const productos = [
    new Producto(1, 'Camiseta 🛒', 20.00, 10),
    new Producto(2, 'Hoodie 🛒', 30.00, 15),
    new Producto(3, 'Gorra 🛒', 15.00, 8),
    new Producto(4, 'Souvenir 🛒', 5.00, 12),
];

const carrito = new Carrito();

document.addEventListener('DOMContentLoaded',() =>{
    mostrarProductos(productos, carrito);
    mostrarCarrito(carrito);

    const procesarPagoBtn = document.getElementById('procesar-pago-btn');
    if (procesarPagoBtn){
        procesarPagoBtn.addEventListener('click', () => procesarPago(carrito));
    }
});