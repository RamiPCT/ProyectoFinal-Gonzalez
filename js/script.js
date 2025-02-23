let cart = [];

// Cargar turnos desde el localStorage y JSON al cargar la página
window.onload = function() {
    loadCart();
    loadTurnosFromJSON();
    displayCart();
};

// Cargar carrito desde el localStorage
function loadCart() {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
}

// Agregar una reserva al carrito
function addToCart() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const service = document.getElementById("service").value;
    const time = document.getElementById("time").value;

    if (name && email && phone && service && time) {
        const reservation = { name, email, phone, service, time };

        cart.push(reservation);
        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Reservaste tu turno, gracias por confiar en nosotros...");
        document.getElementById("reservation-form").reset();
        displayCart();
    } else {
        alert("Por favor, completa todos los campos.");
    }
}

// Mostrar turnos en la lista
function displayCart() {
    const cartList = document.getElementById("cart-list");
    if (!cartList) return; // Evita errores si no existe en la página

    cartList.innerHTML = '';

    if (cart.length === 0) {
        cartList.innerHTML = '<li class="list-group-item">No hay turnos reservados.</li>';
    } else {
        cart.forEach((reservation, index) => {
            const li = document.createElement("li");
            li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

            li.innerHTML = `
                <div>
                    <strong>Nombre:</strong> ${reservation.name}<br>
                    <strong>Servicio:</strong> ${reservation.service}<br>
                    <strong>Hora:</strong> ${reservation.time}
                </div>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Cancelar</button>
            `;
            cartList.appendChild(li);
        });
    }

    document.getElementById("cart-count").innerText = cart.length;
}

// Eliminar un turno
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Cargar turnos desde JSON si el carrito está vacío
function loadTurnosFromJSON() {
    fetch('../turnos.json') // Ajusta la ruta según la ubicación de tu JSON
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            if (cart.length === 0) {
                cart = data;
                localStorage.setItem("cart", JSON.stringify(cart));
            }
            displayCart(); // Mostrar turnos después de cargarlos
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
}