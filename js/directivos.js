// Función para actualizar el estado del botón de Confirmar y de Vaciar Pedido
const actualizarEstadoBoton = () => {
    if (carrito.length === 0) {
        confirmarPedidoButton.disabled = true; 
        vaciarCarritoButton.disabled = true; 
        confirmarPedidoButton.classList.add('boton-deshabilitado'); 
        vaciarCarritoButton.classList.add('boton-deshabilitado'); 

    } else {
        confirmarPedidoButton.disabled = false; 
        vaciarCarritoButton.disabled = false; 
        confirmarPedidoButton.classList.remove('boton-deshabilitado'); 
        vaciarCarritoButton.classList.remove('boton-deshabilitado'); 

    }
};
// Cargar los datos desde el archivo JSON
async function cargarDatos() {
    try {
        const respuesta = await fetch('../db/jugadores.json');
        const jugadores = await respuesta.json();
        return jugadores;
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error al cargar los datos',
            text: 'Hubo un problema al intentar cargar los datos de los jugadores. Por favor, inténtalo nuevamente.',
            confirmButtonText: 'Aceptar'
        });
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
        document.getElementById('Talle').value = 'Selecciona'; // Asumiendo que 'Selecciona' es el valor inicial del dropdown

        // Desmarcar todas las prendas seleccionadas
        document.getElementById('prenda-remera-juego').checked = false;
        document.getElementById('prenda-remera-entrenamiento').checked = false;
        document.getElementById('prenda-short').checked = false;
        document.getElementById('prenda-conjunto').checked = false;
        
        // Reiniciar el valor de cantidad de prendas a 1
        document.getElementById('cantidad-prendas').value = 1;    }
}

const inputCantidad = document.getElementById('cantidad-prendas');

// Otra forma de hacer que no se pueda pedir menos de 1 prenda (para la proxima temporada)
/* inputCantidad.addEventListener('input', () => {
    if (inputCantidad.value < 1) {
        inputCantidad.value = 1; // Establece el valor en 1 si es menor
        Swal.fire('Valor inválido', 'La cantidad no puede ser cero.', 'error');
    }
}); */

// Agregar prendas al carrito y almacenarlas en Local Storage
document.getElementById('btn-agregar-carrito').addEventListener('click', agregarAlCarrito);

// Precios de las prendas
const preciosPrendas = {
    'Remera de Juego': 2500,
    'Remera de Entrenamiento': 1800,
    'Short': 750,
    'Conjunto Deportivo': 3000
};

function agregarAlCarrito() {
    let talle = document.getElementById('Talle').value; 
    let prendasSeleccionadas = [];

    // Recolectar las prendas seleccionadas con sus precios
    if (document.getElementById('prenda-remera-juego').checked) prendasSeleccionadas.push({ prenda: 'Remera de Juego', precio: preciosPrendas['Remera de Juego'] });
    if (document.getElementById('prenda-remera-entrenamiento').checked) prendasSeleccionadas.push({ prenda: 'Remera de Entrenamiento', precio: preciosPrendas['Remera de Entrenamiento'] });
    if (document.getElementById('prenda-short').checked) prendasSeleccionadas.push({ prenda: 'Short', precio: preciosPrendas['Short'] });
    if (document.getElementById('prenda-conjunto').checked) prendasSeleccionadas.push({ prenda: 'Conjunto Deportivo', precio: preciosPrendas['Conjunto Deportivo'] });

    // Validar que se haya seleccionado una categoría y un talle
    if ( talle === 'Selecciona') {
        Swal.fire({
            title: "Error",
            text: "Por favor, selecciona un talle.",
            icon: "error"
        });
        return;
    }
    // Validar que se haya seleccionado al menos una prenda
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
    let nuevaSolicitud = { talle, prendas: prendasSeleccionadas, directivo: nombreDirectivo };

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
    window.location.href = 'html/carrito.html'; // Redirige al HTML para "carrito"
});

// Funcion de buscar nuevos registros
// Función para mostrar registros de una categoría
function mostrarRegistros(categoria) {
    const registrosContainer = document.getElementById('contenedor-registros');
    registrosContainer.innerHTML = ''; // Limpiar el contenedor antes de mostrar nuevos registros

    // Obtener datos de Local Storage
    const registros = JSON.parse(localStorage.getItem(categoria)) || [];

    if (registros.length === 0) {
        registrosContainer.innerHTML = `<p>No hay registros para ${categoria}.</p>`;
        return;
    }

    // Crear una lista para mostrar los registros
    const lista = document.createElement('ul');
    registros.forEach(registro => {
        const item = document.createElement('li');
        item.textContent = JSON.stringify(registro); 
        lista.appendChild(item);
    });
    registrosContainer.appendChild(lista);
}

// Botones de eventos para mostrar registros
document.getElementById('mostrar-jugador').addEventListener('click', function() {
    mostrarRegistros('jugador'); 
});

document.getElementById('mostrar-colaborador').addEventListener('click', function() {
    mostrarRegistros('colaborador'); 
});

document.getElementById('mostrar-sponsor').addEventListener('click', function() {
    mostrarRegistros('sponsor'); 
});

// Funciones para cargar los datos desde Local Storage y mostrarlos
function cargarYMostrarRegistros(tipo) {
    const contenedor = document.getElementById("contenedor-registros");
    contenedor.innerHTML = ""; // Limpiar el contenido anterior

    // Obtener los registros del Local Storage
    const registros = JSON.parse(localStorage.getItem(tipo)) || [];

    // Crear elementos HTML para cada registro
    registros.forEach(registro => {
        const registroElemento = document.createElement("div");
        registroElemento.className = "registro";
        registroElemento.innerHTML = `
            <p>Nombre: ${registro.nombre}</p>
            <p>Categoría: ${registro.categoria}</p>
            <p>Email: ${registro.email}</p>
        `;             // Agrego más campos según sea necesario
        contenedor.appendChild(registroElemento);
    });
}

// Event listeners para los botones
document.getElementById("mostrar-jugador").addEventListener("click", () => {
    cargarYMostrarRegistros("jugador");
});

document.getElementById("mostrar-colaborador").addEventListener("click", () => {
    cargarYMostrarRegistros("colaborador");
});

document.getElementById("mostrar-sponsor").addEventListener("click", () => {
    cargarYMostrarRegistros("sponsor");
});

// Función para borrar registros del Local Storage con confirmación
function borrarRegistros(tipo) {
    Swal.fire({
        title: `¿Estás seguro de borrar todos los ${tipo}?`,
        text: "No podrás revertir esta acción.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, borrar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem(tipo); // Elimina el registro del tipo especificado del Local Storage
            Swal.fire(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} borrados`, `Todos los ${tipo} han sido eliminados.`, 'success').then(() => window.location.reload());
        }
    });
}

// Eventos para los botones de borrar
document.getElementById('btn-borrar-jugador').addEventListener('click', () => borrarRegistros('jugador'));
document.getElementById('btn-borrar-colaborador').addEventListener('click', () => borrarRegistros('colaborador'));
document.getElementById('btn-borrar-sponsor').addEventListener('click', () => borrarRegistros('sponsor'));
