let container = document.getElementById("users-container");

// Evento al presionar el botón de búsqueda
document.getElementById('btn-buscar').addEventListener('click', buscarJugador);

// Función para cargar datos desde el archivo JSON
async function cargarDatos() {
    try {
        const respuesta = await fetch('../db/jugadores.json'); // Asegúrate de que la ruta sea correcta
        const jugadores = await respuesta.json();
        return jugadores;
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        return [];
    }
}

// Función de búsqueda
async function buscarJugador() {
    const jugadores = await cargarDatos();
    const inputBusqueda = document.getElementById('input-busqueda').value.trim().toLowerCase();
    const resultados = jugadores.filter(jugador =>
        jugador.nombre.toLowerCase().includes(inputBusqueda) ||
        jugador.apellido.toLowerCase().includes(inputBusqueda)
    );

    mostrarResultados(resultados);
}

// Función para mostrar los resultados en el DOM
function mostrarResultados(resultados) {
    const contenedorResultados = document.getElementById('users-container');
    contenedorResultados.innerHTML = ''; // Limpiar resultados anteriores

    if (resultados.length > 0) {
        resultados.forEach(jugador => {
            const jugadorInfo = document.createElement('div');
            jugadorInfo.className = 'card';
            jugadorInfo.innerHTML = `
                <h2>Nombre: ${jugador.nombre}</h2>
                <h3>Apellido: ${jugador.apellido}</h3>
                <h3>Categoria: ${jugador.categoria} </h3>
                <h3>División: ${jugador.division} </h3>
                <h3>Dorsal: ${jugador.dorsal} </h3>
                <h3>Vinculo: ${jugador.vinculo} </h3>
                <h3>Asistencias: ${jugador.partidos_jugados} </h3>
            `;
            contenedorResultados.appendChild(jugadorInfo);
        });
    } else {
        contenedorResultados.innerHTML = '<div>No se encontraron jugadores.</div>';
    }
}

// Obtiene el nombre del directivo logueado del Local Storage
const nombreDirectivo = localStorage.getItem('nombreDirectivo') || 'Desconocido';

// Botón para solicitar indumentaria
document.getElementById('btn-solicitar-indumentaria').addEventListener('click', mostrarFormularioIndumentaria);

// Función para mostrar el formulario de solicitud de indumentaria
function mostrarFormularioIndumentaria() {
    document.getElementById('form-solicitud-indumentaria').classList.toggle('hidden');
}

// Agregar prendas al carrito y almacenarlas en Local Storage
document.getElementById('btn-agregar-carrito').addEventListener('click', agregarAlCarrito);

function agregarAlCarrito() {
    let categoria = document.getElementById('categoria').value;
    let talle = document.getElementById('Talle').value; // Obtener el talle seleccionado
    let prendasSeleccionadas = [];

    // Recolectar las prendas seleccionadas
    if (document.getElementById('prenda-remera-juego').checked) prendasSeleccionadas.push('Remera de Juego');
    if (document.getElementById('prenda-remera-entrenamiento').checked) prendasSeleccionadas.push('Remera de Entrenamiento');
    if (document.getElementById('prenda-short').checked) prendasSeleccionadas.push('Short');
    if (document.getElementById('prenda-conjunto').checked) prendasSeleccionadas.push('Conjunto Deportivo');

    // Validar que se haya seleccionado una categoría y un talle
    if (categoria === 'Selecciona' || talle === 'Selecciona') {
        Swal.fire({
            title: "Error",
            text: "Por favor, selecciona una categoría y un talle.",
            icon: "error"
        });
        return;
    }

    if (prendasSeleccionadas.length === 0) {
        Swal.fire({
            title: "Error",
            text: "Seleccione al menos una prenda.",
            icon: "error"
        });
        return;
    }

    // Crear el carrito de compras
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let nuevaSolicitud = { categoria, talle, prendas: prendasSeleccionadas, directivo: nombreDirectivo };

    carrito.push(nuevaSolicitud);
    localStorage.setItem('carrito', JSON.stringify(carrito));

    Swal.fire({
        title: "Exito",
        text: "Prendas agregadas al pedido.",
        icon: "success"
    });
    document.getElementById('form-solicitud-indumentaria').classList.add('hidden');
}

// Redireccionar al carrito
document.getElementById('btn-ver-carrito').addEventListener('click', function() {
    window.location.href = '/html/carrito.html'; // Redirige al nuevo HTML para mostrar el carrito
});

// Mostrar el nombre del directivo logueado en la página
if (nombreDirectivo) {
    document.getElementById('nombre-directivo').textContent = `Actualmente logueado como: ${nombreDirectivo}`;
} else {
    document.getElementById('nombre-directivo').textContent = 'No se encontró el nombre del directivo';
}
