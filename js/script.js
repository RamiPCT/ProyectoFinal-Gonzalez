
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error en la solicitud');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return null;
    }
}


function getFormData() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const time = document.getElementById('time').value;

   
    if (!name || !email || !phone || !service || !time) {
        alert('Todos los campos son obligatorios.');
        return null;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return null;
    }

    if (!/^\d+$/.test(phone)) {
        alert('El número de teléfono solo debe contener números.');
        return null;
    }

    return { name, email, phone, service, time };
}


function saveReservation(reservation) {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(reservations));
}


function addToCart() {
    const reservation = getFormData();
    if (reservation) {
        saveReservation(reservation);
        alert('Reserva agregada al carrito');
        loadReservations(); 
    }
}


function loadReservations() {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const reservationList = document.getElementById('reservation-list');

    if (reservations.length === 0) {
        reservationList.innerHTML = '<p>No hay reservas guardadas.</p>';
        return;
    }

    reservationList.innerHTML = reservations
        .map((reservation, index) => `
            <div class="reservation-item">
                <h4>Reserva #${index + 1}</h4>
                <p><strong>Nombre:</strong> ${reservation.name}</p>
                <p><strong>Email:</strong> ${reservation.email}</p>
                <p><strong>Teléfono:</strong> ${reservation.phone}</p>
                <p><strong>Servicio:</strong> ${reservation.service}</p>
                <p><strong>Hora:</strong> ${reservation.time}</p>
            </div>
        `)
        .join('');
}


document.addEventListener('DOMContentLoaded', () => {
    loadReservations();
});


async function loadExternalData() {
    const url = 'https://jsonplaceholder.typicode.com/users'; 
    const data = await fetchData(url);
    if (data) {
        console.log('Datos obtenidos de la API:', data);
    }
}


loadExternalData();