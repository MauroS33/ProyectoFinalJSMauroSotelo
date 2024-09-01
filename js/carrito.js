// Recuperar datos del carrito y del usuario
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const nombreDirectivo = localStorage.getItem('nombreDirectivo') || 'Desconocido';

    const carritoContainer = document.getElementById('carrito-container');

    // Mostrar los elementos del carrito
    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        carrito.forEach((pedido, index) => {
            const pedidoElement = document.createElement('div');
            pedidoElement.className = 'pedido';
            pedidoElement.innerHTML = `
                <h3>Pedido ${index + 1}</h3>
                <p><strong>Categoría:</strong> ${pedido.categoria}</p>
                <p><strong>Talle:</strong> ${pedido.talle}</p>
                <p><strong>Prendas:</strong></p>
                <ul>
                    ${pedido.prendas.map(prenda => `<li>${prenda}</li>`).join('')}
                </ul>
                <p><strong>Directivo que realizó el pedido:</strong> ${nombreDirectivo}</p>
                <button class="btn-editar" data-index="${index}">Editar</button>
                <button class="btn-eliminar" data-index="${index}">Eliminar</button>
            `;
            carritoContainer.appendChild(pedidoElement);
        });

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
        Swal.fire({
            title: 'Editar Pedido',
            html: `
                <input id="categoria" class="swal2-input" placeholder="Categoría" value="${pedido.categoria}">
                <input id="talle" class="swal2-input" placeholder="Talle" value="${pedido.talle}">
                <textarea id="prendas" class="swal2-textarea" placeholder="Prendas (separadas por coma)">${pedido.prendas.join(', ')}</textarea>
            `,
            confirmButtonText: 'Guardar',
            preConfirm: () => {
                const categoria = Swal.getPopup().querySelector('#categoria').value;
                const talle = Swal.getPopup().querySelector('#talle').value;
                const prendas = Swal.getPopup().querySelector('#prendas').value.split(',').map(p => p.trim());
                carrito[index] = { categoria, talle, prendas };
                localStorage.setItem('carrito', JSON.stringify(carrito));
                location.reload();
            }
        });
    }

    // Función para eliminar un pedido
    function eliminarPedido(index) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás recuperar este pedido",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                carrito.splice(index, 1);
                localStorage.setItem('carrito', JSON.stringify(carrito));
                location.reload();
            }
        });
    }
    document.getElementById('btn-volver').addEventListener('click', function() {
        window.location.href = '/html/directivos.html';
    });

// Mostrar el nombre del directivo logueado en la página
if (nombreDirectivo) {
    document.getElementById('nombre-directivo').textContent = `Actualmente logueado como: ${nombreDirectivo}`;
} else {
    document.getElementById('nombre-directivo').textContent = 'No se encontró el nombre del directivo';
}
