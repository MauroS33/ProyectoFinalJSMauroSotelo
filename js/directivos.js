// Cargar los datos desde el archivo JSON
async function cargarDatos() {
    try {
        const respuesta = await fetch('../db/jugadores.json');
        const jugadores = await respuesta.json();
        return jugadores;
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        return [];
    }
}

// Función de búsqueda mejorada
async function buscarJugador() {
    const jugadores = await cargarDatos();

    // Obtener los valores de los inputs
    const nombre = document.getElementById('input-nombre').value.trim().toLowerCase();
    const apellido = document.getElementById('input-apellido').value.trim().toLowerCase();
    const categoria = document.getElementById('input-categoria').value.trim().toLowerCase();
    const division = document.getElementById('input-division').value.trim().toLowerCase();
    const dorsal = document.getElementById('input-dorsal').value.trim().toLowerCase();
    const vinculo = document.getElementById('input-vinculo').value.trim().toLowerCase();

    // Filtrar los jugadores en base a los criterios ingresados
    const resultados = jugadores.filter(jugador =>
        (!nombre || jugador.nombre.toLowerCase().includes(nombre)) &&
        (!apellido || jugador.apellido.toLowerCase().includes(apellido)) &&
        (!categoria || jugador.categoria.toLowerCase().includes(categoria)) &&
        (!division || jugador.division.toLowerCase().includes(division)) &&
        (!dorsal || jugador.dorsal.toString().toLowerCase().includes(dorsal)) &&
        (!vinculo || jugador.vinculo.toLowerCase().includes(vinculo))
    );

    mostrarResultados(resultados);
}

// Mostrar resultados de búsqueda en el DOM
function mostrarResultados(resultados) {
    const contenedorResultados = document.getElementById('resultados-busqueda');
    contenedorResultados.innerHTML = ''; // Limpiar resultados anteriores

    if (resultados.length > 0) {
        resultados.forEach(jugador => {
            const jugadorInfo = document.createElement('div');
            jugadorInfo.className = 'card';
            jugadorInfo.innerHTML = `
                <h2>Nombre: ${jugador.nombre}</h2>
                <h3>Apellido: ${jugador.apellido}</h3>
                <h3>Categoría: ${jugador.categoria}</h3>
                <h3>División: ${jugador.division}</h3>
                <h3>Dorsal: ${jugador.dorsal}</h3>
                <h3>Vínculo: ${jugador.vinculo}</h3>
                <h3>Asistencias: ${jugador.partidos_jugados}</h3>
            `;
            contenedorResultados.appendChild(jugadorInfo);
        });
    } else {
        contenedorResultados.innerHTML = '<div>No se encontraron jugadores.</div>';
    }
}

// Eventos
document.getElementById('btn-buscar').addEventListener('click', buscarJugador);

// Obtener el nombre del directivo logueado del Local Storage
const nombreDirectivo = localStorage.getItem('nombreDirectivo') || 'Desconocido';
document.getElementById('nombre-directivo').textContent = `Actualmente logueado como: ${nombreDirectivo}`;

// Botón para solicitar indumentaria
document.getElementById('btn-solicitar-indumentaria').addEventListener('click', mostrarFormularioIndumentaria);


// Función para mostrar el formulario de solicitud de indumentaria
function mostrarFormularioIndumentaria() {
    // Alternar la visibilidad del formulario
    document.getElementById('form-solicitud-indumentaria').classList.toggle('hidden');
    
    // Reiniciar los campos del formulario si el formulario se está mostrando
    if (!document.getElementById('form-solicitud-indumentaria').classList.contains('hidden')) {
        // Reiniciar campos del formulario
        document.getElementById('categoria').value = 'Selecciona'; // Asumiendo que 'Selecciona' es el valor inicial del dropdown
        document.getElementById('Talle').value = 'Selecciona'; // Asumiendo que 'Selecciona' es el valor inicial del dropdown

        // Desmarcar todas las prendas seleccionadas
        document.getElementById('prenda-remera-juego').checked = false;
        document.getElementById('prenda-remera-entrenamiento').checked = false;
        document.getElementById('prenda-short').checked = false;
        document.getElementById('prenda-conjunto').checked = false;
    }
}

// Agregar prendas al carrito y almacenarlas en Local Storage
document.getElementById('btn-agregar-carrito').addEventListener('click', agregarAlCarrito);

// Precios de las prendas
const preciosPrendas = {
    'Remera de Juego': 20,
    'Remera de Entrenamiento': 15,
    'Short': 10,
    'Conjunto Deportivo': 30
};

function agregarAlCarrito() {
    let categoria = document.getElementById('categoria').value;
    let talle = document.getElementById('Talle').value; // Obtener el talle seleccionado
    let prendasSeleccionadas = [];

    // Recolectar las prendas seleccionadas con sus precios
    if (document.getElementById('prenda-remera-juego').checked) prendasSeleccionadas.push({ prenda: 'Remera de Juego', precio: preciosPrendas['Remera de Juego'] });
    if (document.getElementById('prenda-remera-entrenamiento').checked) prendasSeleccionadas.push({ prenda: 'Remera de Entrenamiento', precio: preciosPrendas['Remera de Entrenamiento'] });
    if (document.getElementById('prenda-short').checked) prendasSeleccionadas.push({ prenda: 'Short', precio: preciosPrendas['Short'] });
    if (document.getElementById('prenda-conjunto').checked) prendasSeleccionadas.push({ prenda: 'Conjunto Deportivo', precio: preciosPrendas['Conjunto Deportivo'] });

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
        title: "Éxito",
        text: "Prendas agregadas al pedido.",
        icon: "success"
    });

    document.getElementById('form-solicitud-indumentaria').classList.add('hidden');
}

// Redireccionar al carrito
document.getElementById('btn-ver-carrito').addEventListener('click', function() {
    window.location.href = '/html/carrito.html'; // Redirige al nuevo HTML para mostrar el carrito
});

