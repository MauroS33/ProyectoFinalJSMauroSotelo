// Recuperar datos del carrito y del usuario
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const nombreDirectivo = localStorage.getItem('nombreDirectivo') || 'Desconocido';
const carritoContainer = document.getElementById('carrito-container');

// Mostrar los elementos del carrito
if (carrito.length === 0) {
    carritoContainer.innerHTML = '<p>El carrito está vacío.</p>';
} else {
    let total = 0; // Inicializa el total
    carrito.forEach((pedido, index) => {
        const pedidoElement = document.createElement('div');
        pedidoElement.className = 'pedido';

        // Calcula el subtotal de cada pedido
        let subtotal = pedido.prendas.reduce((acc, item) => acc + item.precio, 0);
        total += subtotal; // Suma al total

        pedidoElement.innerHTML = `
            <h3>Pedido ${index + 1}</h3>
            <p><strong>Categoría:</strong> ${pedido.categoria}</p>
            <p><strong>Talle:</strong> ${pedido.talle}</p>
            <p><strong>Prendas:</strong></p>
            <ul>
                ${pedido.prendas.map(item => `<li>${item.prenda} - Precio: $${item.precio}</li>`).join('')}
            </ul>
            <p><strong>Subtotal:</strong> $${subtotal}</p>
            <p><strong>Directivo que realizó el pedido:</strong> ${nombreDirectivo}</p>
            <button class="btn-editar" data-index="${index}">Editar</button>
            <button class="btn-eliminar" data-index="${index}">Eliminar</button>
        `;
        carritoContainer.appendChild(pedidoElement);
    });

    // Muestra el total general
    const totalElement = document.createElement('div');
    totalElement.innerHTML = `<h3>Total General: $${total}</h3>`;
    carritoContainer.appendChild(totalElement);

    // Manejar clics en los botones de editar y eliminar
    carritoContainer.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        if (e.target.classList.contains('btn-editar')) {
            editarPedido(index);
        } else if (e.target.classList.contains('btn-eliminar')) {
            eliminarPedido(index);
        }
    });
}


// Función para editar un pedido
function editarPedido(index) {
    const pedido = carrito[index];
    const precioPorPrenda = {
        'Remera de Juego': 25,
        'Remera de Entrenamiento': 20,
        'Short': 15,
        'Conjunto Deportivo': 40
    };

    Swal.fire({
        title: 'Editar Pedido',
        html: `
            <select id="categoria" class="swal2-select">
                <option value="Jugador" ${pedido.categoria === 'Jugador' ? 'selected' : ''}>Jugador</option>
                <option value="Colaborador" ${pedido.categoria === 'Colaborador' ? 'selected' : ''}>Colaborador</option>
                <option value="Socio" ${pedido.categoria === 'Socio' ? 'selected' : ''}>Socio</option>
                <option value="Sponsor" ${pedido.categoria === 'Sponsor' ? 'selected' : ''}>Sponsor</option>
            </select>
            <select id="talle" class="swal2-select">
                <option value="S" ${pedido.talle === 'S' ? 'selected' : ''}>S</option>
                <option value="M" ${pedido.talle === 'M' ? 'selected' : ''}>M</option>
                <option value="L" ${pedido.talle === 'L' ? 'selected' : ''}>L</option>
                <option value="XL" ${pedido.talle === 'XL' ? 'selected' : ''}>XL</option>
            </select>
            <div>
                <label><input type="checkbox" class="swal2-checkbox" value="Remera de Juego" ${pedido.prendas.some(p => p.prenda === 'Remera de Juego') ? 'checked' : ''}> Remera de Juego - $25</label><br>
                <label><input type="checkbox" class="swal2-checkbox" value="Remera de Entrenamiento" ${pedido.prendas.some(p => p.prenda === 'Remera de Entrenamiento') ? 'checked' : ''}> Remera de Entrenamiento - $20</label><br>
                <label><input type="checkbox" class="swal2-checkbox" value="Short" ${pedido.prendas.some(p => p.prenda === 'Short') ? 'checked' : ''}> Short - $15</label><br>
                <label><input type="checkbox" class="swal2-checkbox" value="Conjunto Deportivo" ${pedido.prendas.some(p => p.prenda === 'Conjunto Deportivo') ? 'checked' : ''}> Conjunto Deportivo - $40</label>
            </div>
        `,
        confirmButtonText: 'Guardar',
        preConfirm: () => {
            const categoria = Swal.getPopup().querySelector('#categoria').value;
            const talle = Swal.getPopup().querySelector('#talle').value;
            const checkboxes = Swal.getPopup().querySelectorAll('.swal2-checkbox');

            const prendasSeleccionadas = Array.from(checkboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => ({
                    prenda: checkbox.value,
                    precio: precioPorPrenda[checkbox.value]
                }));

            // Calcular el precio total en función de las prendas seleccionadas
            const precioTotal = prendasSeleccionadas.reduce((total, item) => total + item.precio, 0);

            carrito[index] = { categoria, talle, prendas: prendasSeleccionadas, precio: precioTotal };
            localStorage.setItem('carrito', JSON.stringify(carrito));
            location.reload();
        }
    });
}


// Función para eliminar un pedido
function eliminarPedido(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    Swal.fire('Eliminado', 'El pedido ha sido eliminado.', 'success').then(() => window.location.reload());
}

// Vaciar el carrito completamente
document.getElementById('btn-vaciar-carrito').addEventListener('click', () => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esta acción.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('carrito'); // Elimina el carrito del Local Storage
            Swal.fire('Carrito Vacío', 'Todos los pedidos han sido eliminados.', 'success').then(() => window.location.reload());
        }
    });
});

// Botón de Volver
document.getElementById('btn-volver').addEventListener('click', function() {
    window.location.href = '/html/directivos.html'; // Cambia la ruta a la página de destino
});


// Confirmar pedido y guardar en un nuevo array
confirmarPedidoButton.addEventListener('click', () => {
    const pedidosConfirmados = JSON.parse(localStorage.getItem('pedidosConfirmados')) || [];
    pedidosConfirmados.push(...carrito);
    localStorage.setItem('pedidosConfirmados', JSON.stringify(pedidosConfirmados));
    Swal.fire('Pedido Confirmado', 'Tu pedido ha sido confirmado.', 'success').then(() => {
        localStorage.removeItem('carrito'); // Limpiar el carrito después de confirmar
        window.location.reload(); // Recargar la página
    });
});

// Mostrar el nombre del directivo logueado en la página
if (nombreDirectivo) {
    document.getElementById('nombre-directivo').textContent = `Actualmente logueado como: ${nombreDirectivo}`;
} else {
    document.getElementById('nombre-directivo').textContent = 'No se encontró el nombre del directivo';
}
